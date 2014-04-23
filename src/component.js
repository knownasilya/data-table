var DataTableHeaderBinComponent = Ember.Component.extend({
  classNameBindings: ['over'],

  dragOver: function (event) {
    event.preventDefault();
  },

  drop: function (event) {
    var name = event.dataTransfer.getData('text/data');
    var column = this.get('columns').findBy('name', name);
    this.get('columns').pushObject(column);
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
    event.dataTransfer.setData('text/data', this.get('content.name'));
  },

  dragEnd: function (event) {
    if (event.dataTransfer.dropEffect === 'copy') {
      this.destroy();

      if (this.get('parentView.tagName') === 'th') {
        this.get('parentView').destroy();
      }
    }
  }
});

var DataTableHeaderCollection = Ember.CollectionView.extend({
  tagName: 'tr',
  classNameBindings: ['over'],
  itemViewClass: Ember.View.extend({
    tagName: 'th',
    templateName: 'components/data-table-header-collection-item'
  }),

  defaultHeaderItemChanged: function () {
    var content = this.get('content') || [];
    var defaultHeaderItem = this.get('parentView.defaultHeaderItem');

    content.pushObject(defaultHeaderItem);
    this.set('content', content);
  }.observes('parentView.defaultHeaderItem').on('init'),

  dragOver: function (event) {
    event.preventDefault();
  },

  dragEnter: function () {
    this.set('over', true);
  },

  dragLeave: function () {
    this.set('over', false);
  },

  drop: function (event) {
    var name = event.dataTransfer.getData('text/data');
    var column = this.get('parentView.columns').findBy('name', name);
    var content = this.get('content');

    if (!content.contains(column)) {
      this.get('content').pushObject(column);
    }

    this.set('over', false);
  }
});

var DataTableComponent = Ember.Component.extend({
  tagName: 'table',
  classNames: ['table', 'table-responsive', 'table-hover', 'table-condensed'],
  defaultHeaderItem: { name: 'Name', attributes: ['name'] },
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
  }.property('datasets'),

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
