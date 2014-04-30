Ember.TEMPLATES['components/data-table-column'] = require('./template.hbs');

var DataTableColumnComponent = Ember.Component.extend({
  classNames: ['dt-type'],
  attributeBindings: ['draggable'],
  classNameBindings: ['dataType'],
  draggable: 'true',
  dataType: Ember.computed.alias('content.attribute.type'),

  dragStart: function (event) {
    var data = {
      id: this.get('content.id')
    };

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/json', JSON.stringify(data));
  }
});

module.exports = DataTableColumnComponent;
