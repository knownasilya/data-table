Ember.TEMPLATES['components/data-table/collection-item'] = require('./collection-item.hbs');

var CollectionItemView = Ember.View.extend({
  elementId: Ember.computed.alias('name'),
  templateName: 'components/data-table/collection-item',
  classNameBindings: ['dropSide', 'columnType'],
  tagName: 'th',
  dropSide: null,
  target: Ember.computed.alias('parentView'),

  columnType: function () {
    var content = this.get('content.name');
    var postfix = '-column';
    return content ? (content + postfix).toLowerCase() : 'selectable' + postfix;
  }.property('content'),

  dragOver: function (event) {
    if (!this.get('content')) {
      return;
    }

    Ember.run.throttle(this, function () {
      if (event.originalEvent.offsetX > (this.$().width() / 2)) {
        this.set('dropSide', 'right');
      }
      else {
        this.set('dropSide', 'left');
      }

      this.set('parentView.over', true);
    }, 300);
  },

  dragLeave: function () {
    this.set('dropSide', null);
    this.set('parentView.over', false);
  },

  drop: function () {
    if (!this.get('content')) {
      return;
    }

    var sideDropped = this.get('dropSide');
    var data = JSON.parse(event.dataTransfer.getData('application/json'));
    var column = this.get('parentView.parentView.availableColumns').findBy('name', data.name);

    if (sideDropped === 'left') {
      this.send('insertBefore', this.get('content'), column);   
    }
    else {
      this.send('insertAfter', this.get('content'), column);   
    }

    this.set('dropSide', null);
  }
});

module.exports = CollectionItemView;
