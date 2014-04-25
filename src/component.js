var DataTableHeaderBinComponent = Ember.Component.extend({
  classNameBindings: ['over'],

  dragOver: function (event) {
    event.preventDefault();
  },

  drop: function (event) {
    var data = JSON.parse(event.dataTransfer.getData('application/json'));
    var columns = this.get('columns');
    var headerColumns = this.get('parentView.columns');
    var requiredColumn = this.get('parentView.requiredHeaderItem');
    var column;

    if (!columns.findBy('name', data.name) && requiredColumn.name !== data.name) {
      column = this.get('parentView.availableColumns').findBy('name', data.name);
      this.get('columns').pushObject(column);

      if (column) {
        this.set('parentView.columns', headerColumns.without(column));
      }
    }
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
  attributeBindings: ['draggable'],
  draggable: 'true',

  dragStart: function (event) {
    var data = {
      id: this.get('elementId'),
      name: this.get('content.name')
    };

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
    templateName: 'components/data-table-header-collection-item',
    tagName: 'td'
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
      console.log('duplicate.. delete me!');      
    }

    this.set('over', false);
  }
});

var DataTableComponent = Ember.Component.extend({
  columns: [],
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
    var required = this.get('requiredHeaderItem');

    this.get('columns').pushObject(required);
  }.on('init'),

  data: function () {
    var datasets = this.get('datasets');
    var columns = this.get('columns');
    var self = this;

    if (!Ember.isArray(datasets)) {
      throw new Error('Datasets input must be an array.');
    }

    return datasets.reduce(function (previous, current) {
      if (!Ember.isArray(current)) {
        throw new Error('Dataset must be an array.');
      }

      var mapped = current.map(function (item) {
        if (columns) {
          return self.columnAttributeMap(columns, item);
        }
        else {
          return [item];
        }
      });

      return previous.concat(mapped);
    }, []);
  }.property('datasets', 'columns.length'),

  columnAttributeMap: function (columns, row) {
    if (!row) {
      return;
    }

    var result = [],
      col = 0,
      prop, columnIndex;

    for (prop in row) {
      if (row.hasOwnProperty(prop)) {
        for(; col < columns.length; col++) {
          if (columns[col].attributes.contains(prop)) {
            result.splice(col, 0, row[prop]);
          }
        }
        col = 0;
      }
    }

    return result;
  }
});
