var DataTableHeaderView = require('./header');
Ember.TEMPLATES['components/data-table'] = require('./template.hbs');

var DataTableComponent = Ember.Component.extend({
  columns: Ember.A(),
  dataset: Ember.A(),
  limit: null,
  dataTableHeader: DataTableHeaderView,

  selectedRows: function () {
    var data = this.get('data');

    return data.filter(function (item) {
      return item.get('selected') ? true : false;
    });
  }.property('data.@each.selected'),

  selectedChanged: function () {
    var selected = this.get('selectedRows');

    this.sendAction('action', selected);
  }.observes('selectedRows.@each.model.selected'),

  selectable: function () {
    if (this.get('action')) {
      return true;
    }
    
    return false;
  }.property(),

  types: function () {
    return this.get('dataset').reduce(function (previous, current) {
      if (!previous.findBy('type', current.constructor.typeKey)) {
        previous.pushObject(Ember.Object.create({
          type: current.constructor.typeKey,
          keys: Ember.keys(current.toJSON())
        }));
      }

      return previous;
    }, []);
  }.property('dataset'),

  availableColumns: function () {
    var dataset = this.get('dataset');
    var aliases = this.get('columnAliases');
    return aliases && !Ember.isEmpty(aliases) ? aliases : this.generateColumns(dataset);
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
    var selectable = this.get('selectable');
    var defaultColumns = this.get('defaultColumns');
    var availableColumns = this.get('availableColumns');
    var filtered = availableColumns.filter(function (item) {
      return defaultColumns.contains(item.get('name'));
    });

    if (selectable) {
      filtered.unshift(null);
    }

    this.set('columns', filtered);
  }.on('init'),

  data: function () {
    var dataset = this.get('dataset');
    var columns = this.get('columns');
    var self = this;

    dataset = Ember.isArray(dataset) ? dataset : dataset.get('content');

    if (!Ember.isArray(dataset)) {
      throw new Error('Dataset input must be an array.');
    }

    return dataset.map(function (item) {
      var type = item.constructor.typeKey;

      if (columns) {
        return Ember.Object.create({
          row: self.columnAttributeMap(columns, item, type),
          model: item,
          selected: false
        });
      }

    }).filter(function (item) {
      // Remove if
      var row = item.get('row');
      var allEmpty = row.every(function (col) {
        return Ember.isEmpty(col)
      });

      if (allEmpty) {
        return false;
      }
      else {
        return !row.isAny('@this', '');
      }
    });
  }.property('dataset', 'columns.length'),

  columnAttributeMap: function (columns, row, type) {
    if (!row) {
      return;
    }

    var result = [],
      rowJson = row.toJSON(),
      rowKeys = Ember.keys(rowJson),
      col = 0,
      columnsAdded = [],
      header, prop, attr;

    for (; col < columns.length; col++) {
      header = columns.objectAt(col);

      if (!header) {
        continue;
      }
      
      header.get('attributes').forEach(function (attr) {
        var split = attr.split(':');
        prop = split[1];
        if (rowJson.hasOwnProperty(prop) && !columnsAdded.contains(prop)) {
          columnsAdded.push(prop);
          result.splice(col, 0, rowJson[prop]);
        }
        else if (!columnsAdded.contains(prop)) {
          result.splice(col, 0, '');
        }
      });
    }

    return result;
  },

  generateColumns: function (dataset) {
    var types = this.get('types');

    if (types) {
      return types.reduce(function (previous, current, index, arr) {
        var type = current.get('type');

        current.get('keys').forEach(function (item) {
          var name = item.capitalize();
          var column = previous.findBy('name', name);
          var attribute = type + ':' + item;
          
          if (column) {
            column.get('attributes').pushObject(attribute);
          }
          else {
            previous.pushObject(Ember.Object.create({
              name: name,
              attributes: [attribute],
              dataType: type
            }));
          }
        });

        return previous;
      }, []);
    }
  },

  actions: {
    clearSelected: function () {
      throw 'Not Yet Implemented';
    }
  }
});

module.exports = DataTableComponent;
