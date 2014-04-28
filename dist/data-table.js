(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Ember.TEMPLATES['components/data-table-bin'] = require('./template.hbs');

var DataTableBinComponent = Ember.Component.extend({
  classNames: ['header-item-bin'],
  classNameBindings: ['over'],

  dragOver: function (event) {
    this.set('over', true);
    event.preventDefault();
  },

  drop: function (event) {
    var data = JSON.parse(event.dataTransfer.getData('application/json'));
    var columns = this.get('columns');
    var headerColumns = this.get('parentView.columns');
    var defaultColumns = this.get('parentView.defaultColumns');
    var column;

    if (!columns.findBy('name', data.name) && headerColumns.length > 1) {
      column = this.get('parentView.availableColumns').findBy('name', data.name);
      this.get('columns').pushObject(column);

      if (column) {
        this.set('parentView.columns', headerColumns.without(column));
      }
    }

    this.set('over', false);
  },

  dragEnter: function () {
    this.set('over', true);
  },

  dragLeave: function () {
    this.set('over', false);
  }
});

module.exports = DataTableBinComponent;

},{"./template.hbs":2}],2:[function(require,module,exports){
// hbsfy compiled Handlebars template
var compiler = Ember.Handlebars;
module.exports = compiler.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    <li>");
  data.buffer.push(escapeExpression((helper = helpers['data-table-column'] || (depth0 && depth0['data-table-column']),options={hash:{
    'content': ("")
  },hashTypes:{'content': "ID"},hashContexts:{'content': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "data-table-column", options))));
  data.buffer.push("</li>\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\n    <li><span class=\"text-muted\">No attributes available.</span></li>\n  ");
  }

  data.buffer.push("<ul class=\"well well-sm list-unstyled list-inline\">\n  ");
  stack1 = helpers.each.call(depth0, "columns", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});

},{}],3:[function(require,module,exports){
Ember.TEMPLATES['components/data-table-column'] = require('./template.hbs');

var DataTableColumnComponent = Ember.Component.extend({
  classNames: ['label', 'label-default'],
  classNameBindings: ['dataType'],
  attributeBindings: ['draggable'],
  draggable: 'true',

  dataType: function () {
    return 'type-' + this.get('content.dataType') || 'default';
  }.property('content.dataType'),

  dragStart: function (event) {
    var data = {
      id: this.get('elementId'),
      name: this.get('content.name')
    };

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/json', JSON.stringify(data));
  }
});

module.exports = DataTableColumnComponent;

},{"./template.hbs":4}],4:[function(require,module,exports){
// hbsfy compiled Handlebars template
var compiler = Ember.Handlebars;
module.exports = compiler.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "content.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

},{}],5:[function(require,module,exports){
var DataTableHeaderView = require('./header');
Ember.TEMPLATES['components/data-table'] = require('./template.hbs');

var DataTableComponent = Ember.Component.extend({
  columns: Ember.A(),
  limit: null,
  dataTableHeader: DataTableHeaderView,

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
    var defaultColumns = this.get('defaultColumns');
    var availableColumns = this.get('availableColumns');
    var filtered = availableColumns.filter(function (item) {
      return defaultColumns.contains(item.get('name'));
    });

    this.get('columns').pushObjects(filtered);
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
        return self.columnAttributeMap(columns, item, type);
      }

    }).filter(function (item) {
      // Remove if
      var allEmpty = item.every(function (col) {
        return Ember.isEmpty(col)
      });

      if (allEmpty) {
        return false;
      }
      else {
        return !item.isAny('@this', '');
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
      prop, attr;

    for (; col < columns.length; col++) {
      columns.objectAt(col).get('attributes').forEach(function (attr) {
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
  }
});

module.exports = DataTableComponent;

},{"./header":8,"./template.hbs":10}],6:[function(require,module,exports){
// hbsfy compiled Handlebars template
var compiler = Ember.Handlebars;
module.exports = compiler.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers['data-table-column'] || (depth0 && depth0['data-table-column']),options={hash:{
    'content': ("view.content")
  },hashTypes:{'content': "ID"},hashContexts:{'content': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "data-table-column", options))));
  data.buffer.push("\n");
  return buffer;
  
});

},{}],7:[function(require,module,exports){
Ember.TEMPLATES['components/data-table/collection-item'] = require('./collection-item.hbs');

var CollectionItemView = Ember.View.extend({
  elementId: Ember.computed.alias('name'),
  templateName: 'components/data-table/collection-item',
  classNameBindings: ['dropSide'],
  tagName: 'th',
  dropSide: null,
  target: Ember.computed.alias('parentView'),

  dragOver: function (event) {
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

},{"./collection-item.hbs":6}],8:[function(require,module,exports){
var CollectionItemView = require('./collection-item');
Ember.TEMPLATES['components/data-table/header'] = require('./template.hbs');

var DataTableHeaderCollection = Ember.CollectionView.extend({
  tagName: 'tr',
  templateName: 'components/data-table/header',
  content: Ember.computed.alias('parentView.columns'),
  limit: Ember.computed.alias('parentView.limit'),
  classNameBindings: ['over'],
  columnsNotInHeader: Ember.computed.alias('parentView.binComponent.columns'),
  itemViewClass: CollectionItemView,

  dragOver: function (event) {
    event.preventDefault();
  },

  dragEnter: function (event) {
    this.set('over', true);
  },

  dragLeave: function () {
    this.set('over', false);
  },

  drop: function () {
    this.set('over', false);
  },

  insertAt: function (existing, dropped, add) {
    var columns = this.get('content');
    var columnsNotInHeader = this.get('columnsNotInHeader');
    var existingIndex = columns.indexOf(existing);
    var duplicate = columns.findBy('name', dropped.get('name'));
    var total = this.get('content.length');
    var limit = this.get('limit');
    var modifedIndex;
    var dupIndex;

    if (existing.get('name') === dropped.get('name')) {
      return;
    }
    else {
      modifiedIndex = existingIndex + add;
    }

    if (columns) {
      // move column to new index
      if (duplicate) {
        dupIndex = columns.indexOf(duplicate);
        if (typeof dupIndex === 'number') {
          columns.arrayContentWillChange(dupIndex, 1, 0);
          columns.splice(dupIndex, 1);
          this.set('content', columns);
          columns.arrayContentDidChange(dupIndex, 1, 0);
        }
      }
      else if (limit && total === limit) {
        return;
      }
      
      // Add to end, instead of splicing
      if (modifiedIndex > columns.length) {
        columns.pushObject(dropped);
      }
      else {
        columns.arrayContentWillChange(modifiedIndex, 0, 1);
        columns.splice(modifiedIndex, 0, dropped);
        this.set('content', columns);
        columns.arrayContentDidChange(modifiedIndex, 0, 1);
      }

      if (dropped) {
        this.set('columnsNotInHeader', columnsNotInHeader.without(dropped));
      }
    } 
  },

  actions: {
    insertBefore: function (existing, dropped) {
      this.insertAt(existing, dropped, 0);  
    },

    insertAfter: function (existing, dropped) {
      this.insertAt(existing, dropped, 1);  
    }
  }
});

module.exports = DataTableHeaderCollection;

},{"./collection-item":7,"./template.hbs":9}],9:[function(require,module,exports){
// hbsfy compiled Handlebars template
var compiler = Ember.Handlebars;
module.exports = compiler.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

},{}],10:[function(require,module,exports){
// hbsfy compiled Handlebars template
var compiler = Ember.Handlebars;
module.exports = compiler.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n      <tr>\n        ");
  stack1 = helpers.each.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </tr>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n          <td>");
  stack1 = helpers._triageMustache.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        ");
  return buffer;
  }

  data.buffer.push(escapeExpression((helper = helpers['data-table-bin'] || (depth0 && depth0['data-table-bin']),options={hash:{
    'columns': ("columnsNotInHeader"),
    'viewName': ("binComponent")
  },hashTypes:{'columns': "ID",'viewName': "STRING"},hashContexts:{'columns': depth0,'viewName': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "data-table-bin", options))));
  data.buffer.push("\n<table class=\"table table-responsive table-hover table-condensed\">\n  <thead>\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "dataTableHeader", {hash:{
    'viewName': ("columnCollection")
  },hashTypes:{'viewName': "STRING"},hashContexts:{'viewName': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n  </thead>\n  <tbody>\n    ");
  stack1 = helpers.each.call(depth0, "data", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </tbody>\n</table>\n");
  return buffer;
  
});

},{}],11:[function(require,module,exports){
var DataTableComponent = require('./data-table/component');
var DataTableBinComponent = require('./data-table-bin/component');
var DataTableColumnComponent = require('./data-table-column/component');

Ember.Application.initializer({
  name: 'data-table',

  initialize: function(container, application) {
    container.register('component:data-table', DataTableComponent);
    container.register('component:data-table-bin', DataTableBinComponent);
    container.register('component:data-table-column', DataTableColumnComponent);
  }
});

},{"./data-table-bin/component":1,"./data-table-column/component":3,"./data-table/component":5}]},{},[11])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1iaW4vY29tcG9uZW50LmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWJpbi90ZW1wbGF0ZS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUtY29sdW1uL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1jb2x1bW4vdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvY29sbGVjdGlvbi1pdGVtLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvY29sbGVjdGlvbi1pdGVtLmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL2hlYWRlci9pbmRleC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL3RlbXBsYXRlLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvaW5pdGlhbGl6ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUtYmluJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgRGF0YVRhYmxlQmluQ29tcG9uZW50ID0gRW1iZXIuQ29tcG9uZW50LmV4dGVuZCh7XG4gIGNsYXNzTmFtZXM6IFsnaGVhZGVyLWl0ZW0tYmluJ10sXG4gIGNsYXNzTmFtZUJpbmRpbmdzOiBbJ292ZXInXSxcblxuICBkcmFnT3ZlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGRyb3A6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnYXBwbGljYXRpb24vanNvbicpKTtcbiAgICB2YXIgY29sdW1ucyA9IHRoaXMuZ2V0KCdjb2x1bW5zJyk7XG4gICAgdmFyIGhlYWRlckNvbHVtbnMgPSB0aGlzLmdldCgncGFyZW50Vmlldy5jb2x1bW5zJyk7XG4gICAgdmFyIGRlZmF1bHRDb2x1bW5zID0gdGhpcy5nZXQoJ3BhcmVudFZpZXcuZGVmYXVsdENvbHVtbnMnKTtcbiAgICB2YXIgY29sdW1uO1xuXG4gICAgaWYgKCFjb2x1bW5zLmZpbmRCeSgnbmFtZScsIGRhdGEubmFtZSkgJiYgaGVhZGVyQ29sdW1ucy5sZW5ndGggPiAxKSB7XG4gICAgICBjb2x1bW4gPSB0aGlzLmdldCgncGFyZW50Vmlldy5hdmFpbGFibGVDb2x1bW5zJykuZmluZEJ5KCduYW1lJywgZGF0YS5uYW1lKTtcbiAgICAgIHRoaXMuZ2V0KCdjb2x1bW5zJykucHVzaE9iamVjdChjb2x1bW4pO1xuXG4gICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgIHRoaXMuc2V0KCdwYXJlbnRWaWV3LmNvbHVtbnMnLCBoZWFkZXJDb2x1bW5zLndpdGhvdXQoY29sdW1uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXQoJ292ZXInLCBmYWxzZSk7XG4gIH0sXG5cbiAgZHJhZ0VudGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgfSxcblxuICBkcmFnTGVhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVRhYmxlQmluQ29tcG9uZW50O1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMSwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBzZWxmPXRoaXM7XG5cbmZ1bmN0aW9uIHByb2dyYW0xKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICA8bGk+XCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnNbJ2RhdGEtdGFibGUtY29sdW1uJ10gfHwgKGRlcHRoMCAmJiBkZXB0aDBbJ2RhdGEtdGFibGUtY29sdW1uJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb250ZW50JzogKFwiXCIpXG4gIH0saGFzaFR5cGVzOnsnY29udGVudCc6IFwiSURcIn0saGFzaENvbnRleHRzOnsnY29udGVudCc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJkYXRhLXRhYmxlLWNvbHVtblwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIjwvbGk+XFxuICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cblxuZnVuY3Rpb24gcHJvZ3JhbTMoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIFxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgIDxsaT48c3BhbiBjbGFzcz1cXFwidGV4dC1tdXRlZFxcXCI+Tm8gYXR0cmlidXRlcyBhdmFpbGFibGUuPC9zcGFuPjwvbGk+XFxuICBcIik7XG4gIH1cblxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPHVsIGNsYXNzPVxcXCJ3ZWxsIHdlbGwtc20gbGlzdC11bnN0eWxlZCBsaXN0LWlubGluZVxcXCI+XFxuICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgXCJjb2x1bW5zXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLnByb2dyYW0oMywgcHJvZ3JhbTMsIGRhdGEpLGZuOnNlbGYucHJvZ3JhbSgxLCBwcm9ncmFtMSwgZGF0YSksY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG48L3VsPlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsIkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlLWNvbHVtbiddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUNvbHVtbkNvbXBvbmVudCA9IEVtYmVyLkNvbXBvbmVudC5leHRlbmQoe1xuICBjbGFzc05hbWVzOiBbJ2xhYmVsJywgJ2xhYmVsLWRlZmF1bHQnXSxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnZGF0YVR5cGUnXSxcbiAgYXR0cmlidXRlQmluZGluZ3M6IFsnZHJhZ2dhYmxlJ10sXG4gIGRyYWdnYWJsZTogJ3RydWUnLFxuXG4gIGRhdGFUeXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICd0eXBlLScgKyB0aGlzLmdldCgnY29udGVudC5kYXRhVHlwZScpIHx8ICdkZWZhdWx0JztcbiAgfS5wcm9wZXJ0eSgnY29udGVudC5kYXRhVHlwZScpLFxuXG4gIGRyYWdTdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBpZDogdGhpcy5nZXQoJ2VsZW1lbnRJZCcpLFxuICAgICAgbmFtZTogdGhpcy5nZXQoJ2NvbnRlbnQubmFtZScpXG4gICAgfTtcblxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVDb2x1bW5Db21wb25lbnQ7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuXG5cbiAgc3RhY2sxID0gaGVscGVycy5fdHJpYWdlTXVzdGFjaGUuY2FsbChkZXB0aDAsIFwiY29udGVudC5uYW1lXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJ2YXIgRGF0YVRhYmxlSGVhZGVyVmlldyA9IHJlcXVpcmUoJy4vaGVhZGVyJyk7XG5FbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZSddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUNvbXBvbmVudCA9IEVtYmVyLkNvbXBvbmVudC5leHRlbmQoe1xuICBjb2x1bW5zOiBFbWJlci5BKCksXG4gIGxpbWl0OiBudWxsLFxuICBkYXRhVGFibGVIZWFkZXI6IERhdGFUYWJsZUhlYWRlclZpZXcsXG5cbiAgdHlwZXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ2RhdGFzZXQnKS5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzLCBjdXJyZW50KSB7XG4gICAgICBpZiAoIXByZXZpb3VzLmZpbmRCeSgndHlwZScsIGN1cnJlbnQuY29uc3RydWN0b3IudHlwZUtleSkpIHtcbiAgICAgICAgcHJldmlvdXMucHVzaE9iamVjdChFbWJlci5PYmplY3QuY3JlYXRlKHtcbiAgICAgICAgICB0eXBlOiBjdXJyZW50LmNvbnN0cnVjdG9yLnR5cGVLZXksXG4gICAgICAgICAga2V5czogRW1iZXIua2V5cyhjdXJyZW50LnRvSlNPTigpKVxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICB9LCBbXSk7XG4gIH0ucHJvcGVydHkoJ2RhdGFzZXQnKSxcblxuICBhdmFpbGFibGVDb2x1bW5zOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRhdGFzZXQgPSB0aGlzLmdldCgnZGF0YXNldCcpO1xuICAgIHZhciBhbGlhc2VzID0gdGhpcy5nZXQoJ2NvbHVtbkFsaWFzZXMnKTtcbiAgICByZXR1cm4gYWxpYXNlcyAmJiAhRW1iZXIuaXNFbXB0eShhbGlhc2VzKSA/IGFsaWFzZXMgOiB0aGlzLmdlbmVyYXRlQ29sdW1ucyhkYXRhc2V0KTtcbiAgfS5wcm9wZXJ0eSgpLFxuXG4gIGNvbHVtbnNOb3RJbkhlYWRlcjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhdmFpbGFibGUgPSB0aGlzLmdldCgnYXZhaWxhYmxlQ29sdW1ucycpO1xuICAgIHZhciBkaXNwbGF5ZWQgPSB0aGlzLmdldCgnY29sdW1ucycpO1xuXG4gICAgcmV0dXJuIGF2YWlsYWJsZS5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzLCBpdGVtKSB7XG4gICAgICBpZiAoIWRpc3BsYXllZC5maW5kQnkoJ25hbWUnLCBpdGVtLm5hbWUpKSB7XG4gICAgICAgIHByZXZpb3VzLnB1c2hPYmplY3QoaXRlbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICB9LCBbXSk7XG4gIH0ucHJvcGVydHkoJ2F2YWlsYWJsZUNvbHVtbnMnLCAnY29sdW1ucycpLFxuXG4gIHByZVBvcHVsYXRlQ29sdW1uczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBkZWZhdWx0Q29sdW1ucyA9IHRoaXMuZ2V0KCdkZWZhdWx0Q29sdW1ucycpO1xuICAgIHZhciBhdmFpbGFibGVDb2x1bW5zID0gdGhpcy5nZXQoJ2F2YWlsYWJsZUNvbHVtbnMnKTtcbiAgICB2YXIgZmlsdGVyZWQgPSBhdmFpbGFibGVDb2x1bW5zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRDb2x1bW5zLmNvbnRhaW5zKGl0ZW0uZ2V0KCduYW1lJykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5nZXQoJ2NvbHVtbnMnKS5wdXNoT2JqZWN0cyhmaWx0ZXJlZCk7XG4gIH0ub24oJ2luaXQnKSxcblxuICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRhdGFzZXQgPSB0aGlzLmdldCgnZGF0YXNldCcpO1xuICAgIHZhciBjb2x1bW5zID0gdGhpcy5nZXQoJ2NvbHVtbnMnKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBkYXRhc2V0ID0gRW1iZXIuaXNBcnJheShkYXRhc2V0KSA/IGRhdGFzZXQgOiBkYXRhc2V0LmdldCgnY29udGVudCcpO1xuXG4gICAgaWYgKCFFbWJlci5pc0FycmF5KGRhdGFzZXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGFzZXQgaW5wdXQgbXVzdCBiZSBhbiBhcnJheS4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YXNldC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciB0eXBlID0gaXRlbS5jb25zdHJ1Y3Rvci50eXBlS2V5O1xuXG4gICAgICBpZiAoY29sdW1ucykge1xuICAgICAgICByZXR1cm4gc2VsZi5jb2x1bW5BdHRyaWJ1dGVNYXAoY29sdW1ucywgaXRlbSwgdHlwZSk7XG4gICAgICB9XG5cbiAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIC8vIFJlbW92ZSBpZlxuICAgICAgdmFyIGFsbEVtcHR5ID0gaXRlbS5ldmVyeShmdW5jdGlvbiAoY29sKSB7XG4gICAgICAgIHJldHVybiBFbWJlci5pc0VtcHR5KGNvbClcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoYWxsRW1wdHkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAhaXRlbS5pc0FueSgnQHRoaXMnLCAnJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0ucHJvcGVydHkoJ2RhdGFzZXQnLCAnY29sdW1ucy5sZW5ndGgnKSxcblxuICBjb2x1bW5BdHRyaWJ1dGVNYXA6IGZ1bmN0aW9uIChjb2x1bW5zLCByb3csIHR5cGUpIHtcbiAgICBpZiAoIXJvdykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBbXSxcbiAgICAgIHJvd0pzb24gPSByb3cudG9KU09OKCksXG4gICAgICByb3dLZXlzID0gRW1iZXIua2V5cyhyb3dKc29uKSxcbiAgICAgIGNvbCA9IDAsXG4gICAgICBjb2x1bW5zQWRkZWQgPSBbXSxcbiAgICAgIHByb3AsIGF0dHI7XG5cbiAgICBmb3IgKDsgY29sIDwgY29sdW1ucy5sZW5ndGg7IGNvbCsrKSB7XG4gICAgICBjb2x1bW5zLm9iamVjdEF0KGNvbCkuZ2V0KCdhdHRyaWJ1dGVzJykuZm9yRWFjaChmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICB2YXIgc3BsaXQgPSBhdHRyLnNwbGl0KCc6Jyk7XG4gICAgICAgIHByb3AgPSBzcGxpdFsxXTtcbiAgICAgICAgaWYgKHJvd0pzb24uaGFzT3duUHJvcGVydHkocHJvcCkgJiYgIWNvbHVtbnNBZGRlZC5jb250YWlucyhwcm9wKSkge1xuICAgICAgICAgIGNvbHVtbnNBZGRlZC5wdXNoKHByb3ApO1xuICAgICAgICAgIHJlc3VsdC5zcGxpY2UoY29sLCAwLCByb3dKc29uW3Byb3BdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghY29sdW1uc0FkZGVkLmNvbnRhaW5zKHByb3ApKSB7XG4gICAgICAgICAgcmVzdWx0LnNwbGljZShjb2wsIDAsICcnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBnZW5lcmF0ZUNvbHVtbnM6IGZ1bmN0aW9uIChkYXRhc2V0KSB7XG4gICAgdmFyIHR5cGVzID0gdGhpcy5nZXQoJ3R5cGVzJyk7XG5cbiAgICBpZiAodHlwZXMpIHtcbiAgICAgIHJldHVybiB0eXBlcy5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzLCBjdXJyZW50LCBpbmRleCwgYXJyKSB7XG4gICAgICAgIHZhciB0eXBlID0gY3VycmVudC5nZXQoJ3R5cGUnKTtcblxuICAgICAgICBjdXJyZW50LmdldCgna2V5cycpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IGl0ZW0uY2FwaXRhbGl6ZSgpO1xuICAgICAgICAgIHZhciBjb2x1bW4gPSBwcmV2aW91cy5maW5kQnkoJ25hbWUnLCBuYW1lKTtcbiAgICAgICAgICB2YXIgYXR0cmlidXRlID0gdHlwZSArICc6JyArIGl0ZW07XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgICAgY29sdW1uLmdldCgnYXR0cmlidXRlcycpLnB1c2hPYmplY3QoYXR0cmlidXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcmV2aW91cy5wdXNoT2JqZWN0KEVtYmVyLk9iamVjdC5jcmVhdGUoe1xuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbYXR0cmlidXRlXSxcbiAgICAgICAgICAgICAgZGF0YVR5cGU6IHR5cGVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICAgIH0sIFtdKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFUYWJsZUNvbXBvbmVudDtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBjb21waWxlciA9IEVtYmVyLkhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIGFub255bW91cyhIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbnRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBFbWJlci5IYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9ICcnLCBoZWxwZXIsIG9wdGlvbnMsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbjtcblxuXG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVyc1snZGF0YS10YWJsZS1jb2x1bW4nXSB8fCAoZGVwdGgwICYmIGRlcHRoMFsnZGF0YS10YWJsZS1jb2x1bW4nXSksb3B0aW9ucz17aGFzaDp7XG4gICAgJ2NvbnRlbnQnOiAoXCJ2aWV3LmNvbnRlbnRcIilcbiAgfSxoYXNoVHlwZXM6eydjb250ZW50JzogXCJJRFwifSxoYXNoQ29udGV4dHM6eydjb250ZW50JzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImRhdGEtdGFibGUtY29sdW1uXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICBcbn0pO1xuIiwiRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUvY29sbGVjdGlvbi1pdGVtJ10gPSByZXF1aXJlKCcuL2NvbGxlY3Rpb24taXRlbS5oYnMnKTtcblxudmFyIENvbGxlY3Rpb25JdGVtVmlldyA9IEVtYmVyLlZpZXcuZXh0ZW5kKHtcbiAgZWxlbWVudElkOiBFbWJlci5jb21wdXRlZC5hbGlhcygnbmFtZScpLFxuICB0ZW1wbGF0ZU5hbWU6ICdjb21wb25lbnRzL2RhdGEtdGFibGUvY29sbGVjdGlvbi1pdGVtJyxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnZHJvcFNpZGUnXSxcbiAgdGFnTmFtZTogJ3RoJyxcbiAgZHJvcFNpZGU6IG51bGwsXG4gIHRhcmdldDogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ3BhcmVudFZpZXcnKSxcblxuICBkcmFnT3ZlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgRW1iZXIucnVuLnRocm90dGxlKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChldmVudC5vcmlnaW5hbEV2ZW50Lm9mZnNldFggPiAodGhpcy4kKCkud2lkdGgoKSAvIDIpKSB7XG4gICAgICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsICdyaWdodCcpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsICdsZWZ0Jyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0KCdwYXJlbnRWaWV3Lm92ZXInLCB0cnVlKTtcbiAgICB9LCAzMDApO1xuICB9LFxuXG4gIGRyYWdMZWF2ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsIG51bGwpO1xuICAgIHRoaXMuc2V0KCdwYXJlbnRWaWV3Lm92ZXInLCBmYWxzZSk7XG4gIH0sXG5cbiAgZHJvcDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzaWRlRHJvcHBlZCA9IHRoaXMuZ2V0KCdkcm9wU2lkZScpO1xuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnYXBwbGljYXRpb24vanNvbicpKTtcbiAgICB2YXIgY29sdW1uID0gdGhpcy5nZXQoJ3BhcmVudFZpZXcucGFyZW50Vmlldy5hdmFpbGFibGVDb2x1bW5zJykuZmluZEJ5KCduYW1lJywgZGF0YS5uYW1lKTtcblxuICAgIGlmIChzaWRlRHJvcHBlZCA9PT0gJ2xlZnQnKSB7XG4gICAgICB0aGlzLnNlbmQoJ2luc2VydEJlZm9yZScsIHRoaXMuZ2V0KCdjb250ZW50JyksIGNvbHVtbik7ICAgXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZW5kKCdpbnNlcnRBZnRlcicsIHRoaXMuZ2V0KCdjb250ZW50JyksIGNvbHVtbik7ICAgXG4gICAgfVxuXG4gICAgdGhpcy5zZXQoJ2Ryb3BTaWRlJywgbnVsbCk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25JdGVtVmlldztcbiIsInZhciBDb2xsZWN0aW9uSXRlbVZpZXcgPSByZXF1aXJlKCcuL2NvbGxlY3Rpb24taXRlbScpO1xuRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUvaGVhZGVyJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgRGF0YVRhYmxlSGVhZGVyQ29sbGVjdGlvbiA9IEVtYmVyLkNvbGxlY3Rpb25WaWV3LmV4dGVuZCh7XG4gIHRhZ05hbWU6ICd0cicsXG4gIHRlbXBsYXRlTmFtZTogJ2NvbXBvbmVudHMvZGF0YS10YWJsZS9oZWFkZXInLFxuICBjb250ZW50OiBFbWJlci5jb21wdXRlZC5hbGlhcygncGFyZW50Vmlldy5jb2x1bW5zJyksXG4gIGxpbWl0OiBFbWJlci5jb21wdXRlZC5hbGlhcygncGFyZW50Vmlldy5saW1pdCcpLFxuICBjbGFzc05hbWVCaW5kaW5nczogWydvdmVyJ10sXG4gIGNvbHVtbnNOb3RJbkhlYWRlcjogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ3BhcmVudFZpZXcuYmluQ29tcG9uZW50LmNvbHVtbnMnKSxcbiAgaXRlbVZpZXdDbGFzczogQ29sbGVjdGlvbkl0ZW1WaWV3LFxuXG4gIGRyYWdPdmVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGRyYWdFbnRlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgfSxcblxuICBkcmFnTGVhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfSxcblxuICBkcm9wOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCBmYWxzZSk7XG4gIH0sXG5cbiAgaW5zZXJ0QXQ6IGZ1bmN0aW9uIChleGlzdGluZywgZHJvcHBlZCwgYWRkKSB7XG4gICAgdmFyIGNvbHVtbnMgPSB0aGlzLmdldCgnY29udGVudCcpO1xuICAgIHZhciBjb2x1bW5zTm90SW5IZWFkZXIgPSB0aGlzLmdldCgnY29sdW1uc05vdEluSGVhZGVyJyk7XG4gICAgdmFyIGV4aXN0aW5nSW5kZXggPSBjb2x1bW5zLmluZGV4T2YoZXhpc3RpbmcpO1xuICAgIHZhciBkdXBsaWNhdGUgPSBjb2x1bW5zLmZpbmRCeSgnbmFtZScsIGRyb3BwZWQuZ2V0KCduYW1lJykpO1xuICAgIHZhciB0b3RhbCA9IHRoaXMuZ2V0KCdjb250ZW50Lmxlbmd0aCcpO1xuICAgIHZhciBsaW1pdCA9IHRoaXMuZ2V0KCdsaW1pdCcpO1xuICAgIHZhciBtb2RpZmVkSW5kZXg7XG4gICAgdmFyIGR1cEluZGV4O1xuXG4gICAgaWYgKGV4aXN0aW5nLmdldCgnbmFtZScpID09PSBkcm9wcGVkLmdldCgnbmFtZScpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbW9kaWZpZWRJbmRleCA9IGV4aXN0aW5nSW5kZXggKyBhZGQ7XG4gICAgfVxuXG4gICAgaWYgKGNvbHVtbnMpIHtcbiAgICAgIC8vIG1vdmUgY29sdW1uIHRvIG5ldyBpbmRleFxuICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICBkdXBJbmRleCA9IGNvbHVtbnMuaW5kZXhPZihkdXBsaWNhdGUpO1xuICAgICAgICBpZiAodHlwZW9mIGR1cEluZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGNvbHVtbnMuYXJyYXlDb250ZW50V2lsbENoYW5nZShkdXBJbmRleCwgMSwgMCk7XG4gICAgICAgICAgY29sdW1ucy5zcGxpY2UoZHVwSW5kZXgsIDEpO1xuICAgICAgICAgIHRoaXMuc2V0KCdjb250ZW50JywgY29sdW1ucyk7XG4gICAgICAgICAgY29sdW1ucy5hcnJheUNvbnRlbnREaWRDaGFuZ2UoZHVwSW5kZXgsIDEsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChsaW1pdCAmJiB0b3RhbCA9PT0gbGltaXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBBZGQgdG8gZW5kLCBpbnN0ZWFkIG9mIHNwbGljaW5nXG4gICAgICBpZiAobW9kaWZpZWRJbmRleCA+IGNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbHVtbnMucHVzaE9iamVjdChkcm9wcGVkKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb2x1bW5zLmFycmF5Q29udGVudFdpbGxDaGFuZ2UobW9kaWZpZWRJbmRleCwgMCwgMSk7XG4gICAgICAgIGNvbHVtbnMuc3BsaWNlKG1vZGlmaWVkSW5kZXgsIDAsIGRyb3BwZWQpO1xuICAgICAgICB0aGlzLnNldCgnY29udGVudCcsIGNvbHVtbnMpO1xuICAgICAgICBjb2x1bW5zLmFycmF5Q29udGVudERpZENoYW5nZShtb2RpZmllZEluZGV4LCAwLCAxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRyb3BwZWQpIHtcbiAgICAgICAgdGhpcy5zZXQoJ2NvbHVtbnNOb3RJbkhlYWRlcicsIGNvbHVtbnNOb3RJbkhlYWRlci53aXRob3V0KGRyb3BwZWQpKTtcbiAgICAgIH1cbiAgICB9IFxuICB9LFxuXG4gIGFjdGlvbnM6IHtcbiAgICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIChleGlzdGluZywgZHJvcHBlZCkge1xuICAgICAgdGhpcy5pbnNlcnRBdChleGlzdGluZywgZHJvcHBlZCwgMCk7ICBcbiAgICB9LFxuXG4gICAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uIChleGlzdGluZywgZHJvcHBlZCkge1xuICAgICAgdGhpcy5pbnNlcnRBdChleGlzdGluZywgZHJvcHBlZCwgMSk7ICBcbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFUYWJsZUhlYWRlckNvbGxlY3Rpb247XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJztcblxuXG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxLCBoZWxwZXIsIG9wdGlvbnMsIHNlbGY9dGhpcywgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uO1xuXG5mdW5jdGlvbiBwcm9ncmFtMShkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazE7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICA8dHI+XFxuICAgICAgICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgXCJcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oMiwgcHJvZ3JhbTIsIGRhdGEpLGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgICAgPC90cj5cXG4gICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5mdW5jdGlvbiBwcm9ncmFtMihkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazE7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICAgICAgPHRkPlwiKTtcbiAgc3RhY2sxID0gaGVscGVycy5fdHJpYWdlTXVzdGFjaGUuY2FsbChkZXB0aDAsIFwiXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCI8L3RkPlxcbiAgICAgICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzWydkYXRhLXRhYmxlLWJpbiddIHx8IChkZXB0aDAgJiYgZGVwdGgwWydkYXRhLXRhYmxlLWJpbiddKSxvcHRpb25zPXtoYXNoOntcbiAgICAnY29sdW1ucyc6IChcImNvbHVtbnNOb3RJbkhlYWRlclwiKSxcbiAgICAndmlld05hbWUnOiAoXCJiaW5Db21wb25lbnRcIilcbiAgfSxoYXNoVHlwZXM6eydjb2x1bW5zJzogXCJJRFwiLCd2aWV3TmFtZSc6IFwiU1RSSU5HXCJ9LGhhc2hDb250ZXh0czp7J2NvbHVtbnMnOiBkZXB0aDAsJ3ZpZXdOYW1lJzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImRhdGEtdGFibGUtYmluXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuPHRhYmxlIGNsYXNzPVxcXCJ0YWJsZSB0YWJsZS1yZXNwb25zaXZlIHRhYmxlLWhvdmVyIHRhYmxlLWNvbmRlbnNlZFxcXCI+XFxuICA8dGhlYWQ+XFxuICAgIFwiKTtcbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKGhlbHBlcnMudmlldy5jYWxsKGRlcHRoMCwgXCJkYXRhVGFibGVIZWFkZXJcIiwge2hhc2g6e1xuICAgICd2aWV3TmFtZSc6IChcImNvbHVtbkNvbGxlY3Rpb25cIilcbiAgfSxoYXNoVHlwZXM6eyd2aWV3TmFtZSc6IFwiU1RSSU5HXCJ9LGhhc2hDb250ZXh0czp7J3ZpZXdOYW1lJzogZGVwdGgwfSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICA8L3RoZWFkPlxcbiAgPHRib2R5PlxcbiAgICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgXCJkYXRhXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgPC90Ym9keT5cXG48L3RhYmxlPlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsInZhciBEYXRhVGFibGVDb21wb25lbnQgPSByZXF1aXJlKCcuL2RhdGEtdGFibGUvY29tcG9uZW50Jyk7XG52YXIgRGF0YVRhYmxlQmluQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9kYXRhLXRhYmxlLWJpbi9jb21wb25lbnQnKTtcbnZhciBEYXRhVGFibGVDb2x1bW5Db21wb25lbnQgPSByZXF1aXJlKCcuL2RhdGEtdGFibGUtY29sdW1uL2NvbXBvbmVudCcpO1xuXG5FbWJlci5BcHBsaWNhdGlvbi5pbml0aWFsaXplcih7XG4gIG5hbWU6ICdkYXRhLXRhYmxlJyxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbihjb250YWluZXIsIGFwcGxpY2F0aW9uKSB7XG4gICAgY29udGFpbmVyLnJlZ2lzdGVyKCdjb21wb25lbnQ6ZGF0YS10YWJsZScsIERhdGFUYWJsZUNvbXBvbmVudCk7XG4gICAgY29udGFpbmVyLnJlZ2lzdGVyKCdjb21wb25lbnQ6ZGF0YS10YWJsZS1iaW4nLCBEYXRhVGFibGVCaW5Db21wb25lbnQpO1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcignY29tcG9uZW50OmRhdGEtdGFibGUtY29sdW1uJywgRGF0YVRhYmxlQ29sdW1uQ29tcG9uZW50KTtcbiAgfVxufSk7XG4iXX0=
