var DataTableComponent = Ember.Component.extend({
  tagName: 'table',
  classNames: ['table', 'table-responsive', 'table-hover', 'table-condensed'],
  columns: [
    { name: 'Name', attributes: ['name'] },
    { name: 'State', attributes: ['us_state', 'state'] }
  ],
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
        return self.columnAttributeMap(columns, item);
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
