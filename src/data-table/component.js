var DataTableHeaderView = require('./header');
Ember.TEMPLATES['components/data-table'] = require('./template.hbs');

var DataTableComponent = Ember.Component.extend({
  limit: null,
  autoCompose: true,
  columns: Ember.A(),
  dataset: Ember.A(),
  columnsComposable: false,
  dataTableHeader: DataTableHeaderView,
  selectedRows: Ember.computed.filterBy('data', 'selected', true), 

  selectedChanged: function () {
    var selected = this.get('selectedRows');
    
    if (selected && selected.get('length')) {
      this.sendAction('action', selected);
    }
  }.observes('selectedRows'),

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
    var aliases = this.get('columnAliases');

    if (aliases && !Ember.isEmpty(aliases)) {
      return aliases;
    }
    else {
      var dataset = this.get('dataset');
      var generated = this.generateColumns(dataset);
      return generated;
    }
  }.property(),

  columnsNotInHeader: function () {
    var available = this.get('availableColumns');
    var displayed = this.get('columns');

    return available.reduce(function (previous, item) {
      if (!displayed.findBy('id', item.get('id'))) {
        previous.pushObject(item);
      }

      return previous;
    }, []);
  }.property('availableColumns', 'columns'),

  initialColumns: function () {
    var defaultColumns = this.get('defaultColumns');
    var availableColumns = this.get('availableColumns');
    var counter = 0;
    var limit = this.get('limit');
    var hasDefaults = (defaultColumns && defaultColumns.length);

    var filtered = availableColumns.filter(function (item) {
      var id = item.get('id');
      var result;

      if (hasDefaults) {
        result = defaultColumns.contains(id);
      }
      else {
        result = (!limit || counter < limit ? true : false);
        counter++;
      }

      return result;
    });

    return filtered;
  }.property('availableColumns'),

  prePopulateColumns: function () {
    var selectable = this.get('selectable');
    var filtered = this.get('initialColumns');

    if (selectable && filtered) {
      filtered.unshift(null);
    }

    this.set('columns', filtered);
  }.on('init'),

  data: function () {
    var dataset = this.get('dataset');
    var columns = this.get('columns');
    var self = this;
    var result;

    dataset = Ember.isArray(dataset) ? dataset : dataset.get('content');

    if (!Ember.isArray(dataset)) {
      throw new Error('Dataset input must be an array.');
    }

    result = dataset.map(function (item) {
      var type = item.constructor.typeKey;

      if (columns) {
        return Ember.Object.create({
          row: self.columnAttributeMap(columns, item, type),
          model: item,
          selected: false
        });
      }
    }).filter(function (item) {
      var row = item.get('row');

      if (row) {
        var allEmpty = row.every(function (col) {
          return Ember.isEmpty(col)
        });

        if (allEmpty) {
          return false;
        }
        else {
          return !row.isAny('@this', '');
        }
      }
    });

    return result;
  }.property('dataset', 'columns.length'),

  columnAttributeMap: function (columns, row, dataType) {
    if (!row) {
      return;
    }

    var result = [],
      //columnsByType = columns.filterBy('attribute.type', dataType),
      rowJson = row.toJSON(),
      rowKeys = Ember.keys(rowJson),
      col = 0,
      dataAdded = 0,
      columnsAdded = [],
      key, attr,
      header, prop, attr;

    for (; col < columns.length; col++) {
      header = columns.objectAt(col);

      if (!header) {
        continue;
      }
      dataAdded = result.get('length');

      if (header.get('isComposed')) {
        header.get('attributes').forEach(function (item) {
          key = item.get('type') + ':' + item.get('attribute');
          prop = item.get('attribute');

          if (rowJson.hasOwnProperty(prop) && !columnsAdded.contains(key) && dataType === item.get('type')) {
            columnsAdded.push(key);
            result.splice(col, 0, rowJson[prop]);
          }
        });

        if (result.get('length') === dataAdded) {
          result.splice(col, 0, '');
        }
      }
      else {
        key = header.get('id');
        attr = header.get('attribute');
        prop = header.get('attribute.attribute');

        if (rowJson.hasOwnProperty(prop) && !columnsAdded.contains(key) && dataType === attr.get('type')) {
          columnsAdded.push(key);
          result.splice(col, 0, rowJson[prop]);
        }
        else {
          result.splice(col, 0, '');
        }
      }
    }

    return result;
  },

  generateColumns: function (dataset) {
    var types = this.get('types');
    var autoCompose = this.get('autoCompose');

    if (types) {
      return types.reduce(function (previous, current, index, arr) {
        var type = current.get('type');

        current.get('keys').forEach(function (item) {
          var id = type + ':' + item;
          var name = item.capitalize();
          var column = previous.findBy('name', name);
          var attribute = Ember.Object.create({
            type: type,
            attribute: item
          });
          
          if (autoCompose && column) {
            column.set('isComposed', true);
            if (column.get('attributes').contains(column.get('attribute'))) {
              column.get('attributes').pushObject(column.get('attribute'));
            }
            column.get('attributes').pushObject(attribute);
          }
          else {
            previous.pushObject(Ember.Object.create({
              id: id,
              name: name,
              attributes: [attribute],
              attribute: attribute
            }));
          }
        });

        return previous;
      }, []);
    }
  },

  actions: {
    clearSelected: function () {
      this.get('data').forEach(function (item) {
        item.set('selected', false);
      });
    }
  }
});

module.exports = DataTableComponent;
