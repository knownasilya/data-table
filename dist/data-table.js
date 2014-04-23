(function (Ember) {
var ItemController = Ember.ObjectController.extend({
});

var DataTableComponent = Ember.Component.extend({
});

Ember.Application.initializer({
  name: 'data-table',

  initialize: function(container, application) {
    container.register('component:data-table', DataTableComponent);
  }
});

}(window.Ember));