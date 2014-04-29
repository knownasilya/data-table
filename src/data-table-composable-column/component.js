var NameView = require('./name');
var ColumnComponent = require('../data-table-column/component');
Ember.TEMPLATES['components/data-table-composable-column'] = require('./template.hbs');

var DataTableComposableColumnComponent = ColumnComponent.extend({
  classNames: ['btn-group'],
  NameViewClass: NameView,

  focusOut: function (event) {
    var $name = Ember.$(event.target);
    if ($name.hasClass('name')) {
      this.set('content.name', $name.text()); 
      $name.attr('contenteditable', false);
    }
    event.preventDefault();
  },

  dragStart: function (event) {
    var data = {
      id: this.get('elementId'),
      name: this.get('content.name'),
      attributes: this.get('content.attributes')
    };

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/json', JSON.stringify(data));
  },

  drop: function (event) {
    var rawData = event.dataTransfer.getData('application/json');

    if (rawData) {
      var data = JSON.parse(rawData);
      var attributes = this.get('content.attributes');

      this.set('content.attributes', attributes.concat(data.attributes).uniq());
    }
  },

  actions: {
    editName: function () {
      this.get('nameView').send('makeEditable');
    }
  }
});

module.exports = DataTableComposableColumnComponent;
