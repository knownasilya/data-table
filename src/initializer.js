var DataTableComponent = require('./data-table/component');
var DataTableBinComponent = require('./data-table-bin/component');
var DataTableColumnComponent = require('./data-table-column/component');
var DataTableComposableColumnComponent = require('./data-table-composable-column/component');

Ember.Application.initializer({
  name: 'data-table',

  initialize: function(container, application) {
    container.register('component:data-table', DataTableComponent, { singleton: false });
    container.register('component:data-table-bin', DataTableBinComponent, { singleton: false });
    container.register('component:data-table-column', DataTableColumnComponent, { singleton: false });
    container.register('component:data-table-composable-column', DataTableComposableColumnComponent, { singleton: false });
  }
});
