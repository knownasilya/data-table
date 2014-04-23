Ember.Application.initializer({
  name: 'data-table',

  initialize: function(container, application) {
    container.register('component:data-table', DataTableComponent);
    container.register('view:data-table-header', DataTableHeaderCollection);
    container.register('component:data-table-header-bin', DataTableHeaderBinComponent);
    container.register('component:data-table-header-item', DataTableHeaderItemComponent);
  }
});
