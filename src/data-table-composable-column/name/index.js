Ember.TEMPLATES['components/data-table-composable-column/name'] = require('./template.hbs');

var NameView = Ember.View.extend({
  templateName: 'components/data-table-composable-column/name',
  tagName: 'span',
  classNames: ['btn', 'btn-xs', 'btn-default', 'name'],
  attributeBindings: ['contenteditable'],
  contenteditable: 'false',
  name: null,

  keyDown: function (event) {
    // On Enter/Return
    if (event.keyCode === 13) {
      var newName = this.$().text();
      this.setName(newName);
    }
  },

  madeEditable: function () {
    var editable = this.get('contenteditable');

    if (editable) {
      Ember.run.schedule('afterRender', this, function () {
        this.$().focus();
        selectText(this.$());
      });
    }
  }.observes('contenteditable'),

  focusOut: function () {
    var newName = this.$().text();
    this.setName(newName);
  },

  setName: function (newName) {
    if (!Ember.isEmpty(newName)) {
      this.setProperties({
        name: newName,
        contenteditable: 'false'
      });
    }
    else {
      this.$().text(this.get('name'));
      this.set('contenteditable', 'false');
    }
  },

  actions: {
    makeEditable: function () {
      this.set('contenteditable', 'true');
    }
  } 
});

function selectText(element) {
  var doc = document,
    node = element.get(0),
    range, selection;
  
  if (doc.body.createTextRange) { //ms
    range = doc.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  } else if (window.getSelection) { //all others
    selection = window.getSelection();        
    range = doc.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

module.exports = NameView;
