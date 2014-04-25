var DataTableHeaderBinComponent = Ember.Component.extend({
  classNames: ['header-item-bin'],
  classNameBindings: ['over'],

  dragOver: function (event) {
    this.set('over', true);
    event.preventDefault();
  },

  drop: function (event) {
    var data = JSON.parse(event.dataTransfer.getData('application/json'));
    var columns = this.get('columns');
    var headerColumns = this.get('parentView.columns');
    var defaultColumns = this.get('parentView.defaultColumns');
    var column;

    if (!columns.findBy('name', data.name) && headerColumns.length > 1) {
      column = this.get('parentView.availableColumns').findBy('name', data.name);
      this.get('columns').pushObject(column);

      if (column) {
        this.set('parentView.columns', headerColumns.without(column));
      }
    }

    this.set('over', false);
  },

  dragEnter: function () {
    this.set('over', true);
  },

  dragLeave: function () {
    this.set('over', false);
  }
});

var DataTableHeaderItemComponent = Ember.Component.extend({
  classNames: ['label', 'label-default'],
  classNameBindings: ['dataType'],
  attributeBindings: ['draggable'],
  draggable: 'true',

  dataType: function () {
    return 'type-' + this.get('content.dataType') || 'default';
  }.property('content.dataType'),

  dragStart: function (event) {
    var data = {
      id: this.get('elementId'),
      name: this.get('content.name')
    };

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/json', JSON.stringify(data));
  },

  dragEnd: function (event) {
  }
});

var DataTableHeaderCollection = Ember.CollectionView.extend({
  tagName: 'tr',
  content: Ember.computed.alias('parentView.columns'),
  classNameBindings: ['over'],
  columnsNotInHeader: Ember.computed.alias('parentView.binComponent.columns'),
  itemViewClass: Ember.View.extend({
    elementId: Ember.computed.alias('name'),
    templateName: 'components/data-table-header-collection-item',
    classNameBindings: ['dropSide'],
    tagName: 'th',
    dropSide: null,
    target: Ember.computed.alias('parentView'),

    dragOver: function (event) {
      Ember.run.throttle(this, function () {
        if (event.originalEvent.offsetX > (this.$().width() / 2)) {
          this.set('dropSide', 'right');
        }
        else {
          this.set('dropSide', 'left');
        }

        this.set('parentView.over', true);
      }, 300);
    },

    dragLeave: function () {
      this.set('dropSide', null);
      this.set('parentView.over', false);
    },

    drop: function () {
      var sideDropped = this.get('dropSide');
      var data = JSON.parse(event.dataTransfer.getData('application/json'));
      var column = this.get('parentView.parentView.availableColumns').findBy('name', data.name);

      if (sideDropped === 'left') {
        this.send('insertBefore', this.get('content'), column);   
      }
      else {
        this.send('insertAfter', this.get('content'), column);   
      }

      this.set('dropSide', null);
    }
  }),

  dragOver: function (event) {
    event.preventDefault();
  },

  dragEnter: function (event) {
    this.set('over', true);
  },

  dragLeave: function () {
    this.set('over', false);
  },

  drop: function (event) {
    var data = JSON.parse(event.dataTransfer.getData('application/json'));
    var column = this.get('parentView.availableColumns').findBy('name', data.name);
    var content = this.get('content');
    var columnsNotInHeader = this.get('columnsNotInHeader');

    if (!content.findBy('name', column.name)) {
      this.get('content').pushObject(column);

      droppedItem = columnsNotInHeader.findBy('name', data.name);
      if (droppedItem) {
        this.set('columnsNotInHeader', columnsNotInHeader.without(droppedItem));
      }
    }
    else {
      if (column) {
        this.set('columnsNotInHeader', columnsNotInHeader.without(column));
      }
    }

    this.set('over', false);
  },

  insertAt: function (existing, dropped, add) {
    var columns = this.get('content');
    var existingIndex = columns.indexOf(existing);
    var duplicate = columns.findBy('name', dropped.get('name'));
    var modifedIndex;
    var dupIndex;

    if (existing.get('name') === dropped.get('name')) {
      return;
    }
    else {
      modifiedIndex = existingIndex + add;
    }

    if (columns) {
      if (duplicate) {
        dupIndex = columns.indexOf(duplicate);
        if (typeof dupIndex === 'number') {
          columns.arrayContentWillChange(dupIndex, 1, 0);
          columns.splice(dupIndex, 1);
          this.set('content', columns);
          columns.arrayContentDidChange(dupIndex, 1, 0);
        }
      }
      
      if (modifiedIndex > columns.length) {
        columns.pushObject(dropped);
      }
      else {
        columns.arrayContentWillChange(modifiedIndex, 0, 1);
        columns.splice(modifiedIndex, 0, dropped);
        this.set('content', columns);
        columns.arrayContentDidChange(modifiedIndex, 0, 1);
      }
    } 
  },

  actions: {
    insertBefore: function (existing, dropped) {
      this.insertAt(existing, dropped, 0);  
    },

    insertAfter: function (existing, dropped) {
      this.insertAt(existing, dropped, 1);  
    }
  }
});

var DataTableComponent = Ember.Component.extend({
  columns: [],
  availableColumns: function () {
    var firstObject = this.get('dataset.content.firstObject');
    return this.generateColumns(Ember.keys(firstObject.toJSON()), firstObject.constructor.typeKey);
  }.property(),

  columnsNotInHeader: function () {
    var available = this.get('availableColumns');
    var displayed = this.get('columns');

    return available.reduce(function (previous, item) {
      if (!displayed.findBy('name', item.name)) {
        previous.pushObject(item);
      }

      return previous;
    }, []);
  }.property('availableColumns', 'columns'),

  prePopulateColumns: function () {
    var defaultColumns = this.get('defaultColumns');
    var availableColumns = this.get('availableColumns');
    var filtered = availableColumns.filter(function (item) {
      return defaultColumns.contains(item.get('name'));
    });

    this.get('columns').pushObjects(filtered);
  }.on('init'),

  data: function () {
    var dataset = this.get('dataset');
    var columns = this.get('columns');
    var self = this;

    if (!Ember.isArray(dataset)) {
      throw new Error('Dataset input must be an array.');
    }

    return dataset.map(function (item) {
      if (columns) {
        return self.columnAttributeMap(columns, item);
      }
      else {
        return [item];
      }
    });
  }.property('dataset', 'columns.length'),

  columnAttributeMap: function (columns, row) {
    if (!row) {
      return;
    }

    var result = [],
      rowJson = row.toJSON(),
      col = 0,
      prop, columnIndex;

    for (prop in rowJson) {
      if (rowJson.hasOwnProperty(prop)) {
        for(; col < columns.length; col++) {
          if (columns[col].attributes.contains(prop)) {
            result.splice(col, 0, rowJson[prop]);
          }
        }
        col = 0;
      }
    }

    return result;
  },

  generateColumns: function (keys, type) {
    var result = [];
    
    return keys.map(function (item) {
      return Ember.Object.create({
        name: item.capitalize(),
        attributes: [item],
        dataType: type
      });
    });
  }
});
