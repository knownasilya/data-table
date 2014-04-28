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

    if (!columns.findBy('name', data.name) && headerColumns.without(headerColumns.findBy('name', data.name)).compact().length >= 1) {
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
    var selectable = this.get('selectable');
    var defaultColumns = this.get('defaultColumns');
    var availableColumns = this.get('availableColumns');
    var filtered = availableColumns.filter(function (item) {
      return defaultColumns.contains(item.get('name'));
    });

    if (selectable) {
      filtered.unshift(null);
    }

    this.set('columns', filtered);
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
      header, prop, attr;

    for (; col < columns.length; col++) {
      header = columns.objectAt(col);

      if (!header) {
        continue;
      }
      
      header.get('attributes').forEach(function (attr) {
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
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n  ");
  data.buffer.push(escapeExpression((helper = helpers['data-table-column'] || (depth0 && depth0['data-table-column']),options={hash:{
    'content': ("view.content")
  },hashTypes:{'content': "ID"},hashContexts:{'content': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "data-table-column", options))));
  data.buffer.push("\n");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "view.content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

},{}],7:[function(require,module,exports){
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
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n      <tr>\n        ");
  stack1 = helpers['if'].call(depth0, "selectable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        ");
  stack1 = helpers.each.call(depth0, "row", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </tr>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n          <td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox")
  },hashTypes:{'type': "STRING"},hashContexts:{'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n        ");
  return buffer;
  }

function program4(depth0,data) {
  
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
  stack1 = helpers.each.call(depth0, "row", "in", "data", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
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
    container.register('component:data-table', DataTableComponent, {singleton: false });
    container.register('component:data-table-bin', DataTableBinComponent, {singleton: false });
    container.register('component:data-table-column', DataTableColumnComponent, {singleton: false });
  }
});

},{"./data-table-bin/component":1,"./data-table-column/component":3,"./data-table/component":5}]},{},[11])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1iaW4vY29tcG9uZW50LmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWJpbi90ZW1wbGF0ZS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUtY29sdW1uL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1jb2x1bW4vdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvY29sbGVjdGlvbi1pdGVtLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvY29sbGVjdGlvbi1pdGVtLmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL2hlYWRlci9pbmRleC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL3RlbXBsYXRlLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvaW5pdGlhbGl6ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJFbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZS1iaW4nXSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUuaGJzJyk7XG5cbnZhciBEYXRhVGFibGVCaW5Db21wb25lbnQgPSBFbWJlci5Db21wb25lbnQuZXh0ZW5kKHtcbiAgY2xhc3NOYW1lczogWydoZWFkZXItaXRlbS1iaW4nXSxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnb3ZlciddLFxuXG4gIGRyYWdPdmVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIHRydWUpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG5cbiAgZHJvcDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJykpO1xuICAgIHZhciBjb2x1bW5zID0gdGhpcy5nZXQoJ2NvbHVtbnMnKTtcbiAgICB2YXIgaGVhZGVyQ29sdW1ucyA9IHRoaXMuZ2V0KCdwYXJlbnRWaWV3LmNvbHVtbnMnKTtcbiAgICB2YXIgZGVmYXVsdENvbHVtbnMgPSB0aGlzLmdldCgncGFyZW50Vmlldy5kZWZhdWx0Q29sdW1ucycpO1xuICAgIHZhciBjb2x1bW47XG5cbiAgICBpZiAoIWNvbHVtbnMuZmluZEJ5KCduYW1lJywgZGF0YS5uYW1lKSAmJiBoZWFkZXJDb2x1bW5zLndpdGhvdXQoaGVhZGVyQ29sdW1ucy5maW5kQnkoJ25hbWUnLCBkYXRhLm5hbWUpKS5jb21wYWN0KCkubGVuZ3RoID49IDEpIHtcbiAgICAgIGNvbHVtbiA9IHRoaXMuZ2V0KCdwYXJlbnRWaWV3LmF2YWlsYWJsZUNvbHVtbnMnKS5maW5kQnkoJ25hbWUnLCBkYXRhLm5hbWUpO1xuICAgICAgdGhpcy5nZXQoJ2NvbHVtbnMnKS5wdXNoT2JqZWN0KGNvbHVtbik7XG5cbiAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgdGhpcy5zZXQoJ3BhcmVudFZpZXcuY29sdW1ucycsIGhlYWRlckNvbHVtbnMud2l0aG91dChjb2x1bW4pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfSxcblxuICBkcmFnRW50ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIHRydWUpO1xuICB9LFxuXG4gIGRyYWdMZWF2ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0KCdvdmVyJywgZmFsc2UpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVCaW5Db21wb25lbnQ7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIHNlbGY9dGhpcztcblxuZnVuY3Rpb24gcHJvZ3JhbTEoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgaGVscGVyLCBvcHRpb25zO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgIDxsaT5cIik7XG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVyc1snZGF0YS10YWJsZS1jb2x1bW4nXSB8fCAoZGVwdGgwICYmIGRlcHRoMFsnZGF0YS10YWJsZS1jb2x1bW4nXSksb3B0aW9ucz17aGFzaDp7XG4gICAgJ2NvbnRlbnQnOiAoXCJcIilcbiAgfSxoYXNoVHlwZXM6eydjb250ZW50JzogXCJJRFwifSxoYXNoQ29udGV4dHM6eydjb250ZW50JzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImRhdGEtdGFibGUtY29sdW1uXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPC9saT5cXG4gIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG5mdW5jdGlvbiBwcm9ncmFtMyhkZXB0aDAsZGF0YSkge1xuICBcbiAgXG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgPGxpPjxzcGFuIGNsYXNzPVxcXCJ0ZXh0LW11dGVkXFxcIj5ObyBhdHRyaWJ1dGVzIGF2YWlsYWJsZS48L3NwYW4+PC9saT5cXG4gIFwiKTtcbiAgfVxuXG4gIGRhdGEuYnVmZmVyLnB1c2goXCI8dWwgY2xhc3M9XFxcIndlbGwgd2VsbC1zbSBsaXN0LXVuc3R5bGVkIGxpc3QtaW5saW5lXFxcIj5cXG4gIFwiKTtcbiAgc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwLCBcImNvbHVtbnNcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYucHJvZ3JhbSgzLCBwcm9ncmFtMywgZGF0YSksZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbjwvdWw+XFxuXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICBcbn0pO1xuIiwiRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUtY29sdW1uJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgRGF0YVRhYmxlQ29sdW1uQ29tcG9uZW50ID0gRW1iZXIuQ29tcG9uZW50LmV4dGVuZCh7XG4gIGNsYXNzTmFtZXM6IFsnbGFiZWwnLCAnbGFiZWwtZGVmYXVsdCddLFxuICBjbGFzc05hbWVCaW5kaW5nczogWydkYXRhVHlwZSddLFxuICBhdHRyaWJ1dGVCaW5kaW5nczogWydkcmFnZ2FibGUnXSxcbiAgZHJhZ2dhYmxlOiAndHJ1ZScsXG5cbiAgZGF0YVR5cGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJ3R5cGUtJyArIHRoaXMuZ2V0KCdjb250ZW50LmRhdGFUeXBlJykgfHwgJ2RlZmF1bHQnO1xuICB9LnByb3BlcnR5KCdjb250ZW50LmRhdGFUeXBlJyksXG5cbiAgZHJhZ1N0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIGlkOiB0aGlzLmdldCgnZWxlbWVudElkJyksXG4gICAgICBuYW1lOiB0aGlzLmdldCgnY29udGVudC5uYW1lJylcbiAgICB9O1xuXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ2FwcGxpY2F0aW9uL2pzb24nLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFUYWJsZUNvbHVtbkNvbXBvbmVudDtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBjb21waWxlciA9IEVtYmVyLkhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIGFub255bW91cyhIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbnRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBFbWJlci5IYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazE7XG5cblxuICBzdGFjazEgPSBoZWxwZXJzLl90cmlhZ2VNdXN0YWNoZS5jYWxsKGRlcHRoMCwgXCJjb250ZW50Lm5hbWVcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsInZhciBEYXRhVGFibGVIZWFkZXJWaWV3ID0gcmVxdWlyZSgnLi9oZWFkZXInKTtcbkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgRGF0YVRhYmxlQ29tcG9uZW50ID0gRW1iZXIuQ29tcG9uZW50LmV4dGVuZCh7XG4gIGNvbHVtbnM6IEVtYmVyLkEoKSxcbiAgbGltaXQ6IG51bGwsXG4gIGRhdGFUYWJsZUhlYWRlcjogRGF0YVRhYmxlSGVhZGVyVmlldyxcblxuICBzZWxlY3RhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZ2V0KCdhY3Rpb24nKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBmYWxzZTtcbiAgfS5wcm9wZXJ0eSgpLFxuXG4gIHR5cGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCdkYXRhc2V0JykucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgY3VycmVudCkge1xuICAgICAgaWYgKCFwcmV2aW91cy5maW5kQnkoJ3R5cGUnLCBjdXJyZW50LmNvbnN0cnVjdG9yLnR5cGVLZXkpKSB7XG4gICAgICAgIHByZXZpb3VzLnB1c2hPYmplY3QoRW1iZXIuT2JqZWN0LmNyZWF0ZSh7XG4gICAgICAgICAgdHlwZTogY3VycmVudC5jb25zdHJ1Y3Rvci50eXBlS2V5LFxuICAgICAgICAgIGtleXM6IEVtYmVyLmtleXMoY3VycmVudC50b0pTT04oKSlcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgfSwgW10pO1xuICB9LnByb3BlcnR5KCdkYXRhc2V0JyksXG5cbiAgYXZhaWxhYmxlQ29sdW1uczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBkYXRhc2V0ID0gdGhpcy5nZXQoJ2RhdGFzZXQnKTtcbiAgICB2YXIgYWxpYXNlcyA9IHRoaXMuZ2V0KCdjb2x1bW5BbGlhc2VzJyk7XG4gICAgcmV0dXJuIGFsaWFzZXMgJiYgIUVtYmVyLmlzRW1wdHkoYWxpYXNlcykgPyBhbGlhc2VzIDogdGhpcy5nZW5lcmF0ZUNvbHVtbnMoZGF0YXNldCk7XG4gIH0ucHJvcGVydHkoKSxcblxuICBjb2x1bW5zTm90SW5IZWFkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXZhaWxhYmxlID0gdGhpcy5nZXQoJ2F2YWlsYWJsZUNvbHVtbnMnKTtcbiAgICB2YXIgZGlzcGxheWVkID0gdGhpcy5nZXQoJ2NvbHVtbnMnKTtcblxuICAgIHJldHVybiBhdmFpbGFibGUucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgaXRlbSkge1xuICAgICAgaWYgKCFkaXNwbGF5ZWQuZmluZEJ5KCduYW1lJywgaXRlbS5uYW1lKSkge1xuICAgICAgICBwcmV2aW91cy5wdXNoT2JqZWN0KGl0ZW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgfSwgW10pO1xuICB9LnByb3BlcnR5KCdhdmFpbGFibGVDb2x1bW5zJywgJ2NvbHVtbnMnKSxcblxuICBwcmVQb3B1bGF0ZUNvbHVtbnM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZWN0YWJsZSA9IHRoaXMuZ2V0KCdzZWxlY3RhYmxlJyk7XG4gICAgdmFyIGRlZmF1bHRDb2x1bW5zID0gdGhpcy5nZXQoJ2RlZmF1bHRDb2x1bW5zJyk7XG4gICAgdmFyIGF2YWlsYWJsZUNvbHVtbnMgPSB0aGlzLmdldCgnYXZhaWxhYmxlQ29sdW1ucycpO1xuICAgIHZhciBmaWx0ZXJlZCA9IGF2YWlsYWJsZUNvbHVtbnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdENvbHVtbnMuY29udGFpbnMoaXRlbS5nZXQoJ25hbWUnKSk7XG4gICAgfSk7XG5cbiAgICBpZiAoc2VsZWN0YWJsZSkge1xuICAgICAgZmlsdGVyZWQudW5zaGlmdChudWxsKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldCgnY29sdW1ucycsIGZpbHRlcmVkKTtcbiAgfS5vbignaW5pdCcpLFxuXG4gIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGF0YXNldCA9IHRoaXMuZ2V0KCdkYXRhc2V0Jyk7XG4gICAgdmFyIGNvbHVtbnMgPSB0aGlzLmdldCgnY29sdW1ucycpO1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGRhdGFzZXQgPSBFbWJlci5pc0FycmF5KGRhdGFzZXQpID8gZGF0YXNldCA6IGRhdGFzZXQuZ2V0KCdjb250ZW50Jyk7XG5cbiAgICBpZiAoIUVtYmVyLmlzQXJyYXkoZGF0YXNldCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YXNldCBpbnB1dCBtdXN0IGJlIGFuIGFycmF5LicpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhc2V0Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIHR5cGUgPSBpdGVtLmNvbnN0cnVjdG9yLnR5cGVLZXk7XG5cbiAgICAgIGlmIChjb2x1bW5zKSB7XG4gICAgICAgIHJldHVybiBzZWxmLmNvbHVtbkF0dHJpYnV0ZU1hcChjb2x1bW5zLCBpdGVtLCB0eXBlKTtcbiAgICAgIH1cblxuICAgIH0pLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgLy8gUmVtb3ZlIGlmXG4gICAgICB2YXIgYWxsRW1wdHkgPSBpdGVtLmV2ZXJ5KGZ1bmN0aW9uIChjb2wpIHtcbiAgICAgICAgcmV0dXJuIEVtYmVyLmlzRW1wdHkoY29sKVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChhbGxFbXB0eSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICFpdGVtLmlzQW55KCdAdGhpcycsICcnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfS5wcm9wZXJ0eSgnZGF0YXNldCcsICdjb2x1bW5zLmxlbmd0aCcpLFxuXG4gIGNvbHVtbkF0dHJpYnV0ZU1hcDogZnVuY3Rpb24gKGNvbHVtbnMsIHJvdywgdHlwZSkge1xuICAgIGlmICghcm93KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IFtdLFxuICAgICAgcm93SnNvbiA9IHJvdy50b0pTT04oKSxcbiAgICAgIHJvd0tleXMgPSBFbWJlci5rZXlzKHJvd0pzb24pLFxuICAgICAgY29sID0gMCxcbiAgICAgIGNvbHVtbnNBZGRlZCA9IFtdLFxuICAgICAgaGVhZGVyLCBwcm9wLCBhdHRyO1xuXG4gICAgZm9yICg7IGNvbCA8IGNvbHVtbnMubGVuZ3RoOyBjb2wrKykge1xuICAgICAgaGVhZGVyID0gY29sdW1ucy5vYmplY3RBdChjb2wpO1xuXG4gICAgICBpZiAoIWhlYWRlcikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaGVhZGVyLmdldCgnYXR0cmlidXRlcycpLmZvckVhY2goZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYXR0ci5zcGxpdCgnOicpO1xuICAgICAgICBwcm9wID0gc3BsaXRbMV07XG4gICAgICAgIGlmIChyb3dKc29uLmhhc093blByb3BlcnR5KHByb3ApICYmICFjb2x1bW5zQWRkZWQuY29udGFpbnMocHJvcCkpIHtcbiAgICAgICAgICBjb2x1bW5zQWRkZWQucHVzaChwcm9wKTtcbiAgICAgICAgICByZXN1bHQuc3BsaWNlKGNvbCwgMCwgcm93SnNvbltwcm9wXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWNvbHVtbnNBZGRlZC5jb250YWlucyhwcm9wKSkge1xuICAgICAgICAgIHJlc3VsdC5zcGxpY2UoY29sLCAwLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgZ2VuZXJhdGVDb2x1bW5zOiBmdW5jdGlvbiAoZGF0YXNldCkge1xuICAgIHZhciB0eXBlcyA9IHRoaXMuZ2V0KCd0eXBlcycpO1xuXG4gICAgaWYgKHR5cGVzKSB7XG4gICAgICByZXR1cm4gdHlwZXMucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgY3VycmVudCwgaW5kZXgsIGFycikge1xuICAgICAgICB2YXIgdHlwZSA9IGN1cnJlbnQuZ2V0KCd0eXBlJyk7XG5cbiAgICAgICAgY3VycmVudC5nZXQoJ2tleXMnKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgdmFyIG5hbWUgPSBpdGVtLmNhcGl0YWxpemUoKTtcbiAgICAgICAgICB2YXIgY29sdW1uID0gcHJldmlvdXMuZmluZEJ5KCduYW1lJywgbmFtZSk7XG4gICAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IHR5cGUgKyAnOicgKyBpdGVtO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgICAgIGNvbHVtbi5nZXQoJ2F0dHJpYnV0ZXMnKS5wdXNoT2JqZWN0KGF0dHJpYnV0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHJldmlvdXMucHVzaE9iamVjdChFbWJlci5PYmplY3QuY3JlYXRlKHtcbiAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW2F0dHJpYnV0ZV0sXG4gICAgICAgICAgICAgIGRhdGFUeXBlOiB0eXBlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVDb21wb25lbnQ7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIHNlbGY9dGhpcztcblxuZnVuY3Rpb24gcHJvZ3JhbTEoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgaGVscGVyLCBvcHRpb25zO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICBcIik7XG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVyc1snZGF0YS10YWJsZS1jb2x1bW4nXSB8fCAoZGVwdGgwICYmIGRlcHRoMFsnZGF0YS10YWJsZS1jb2x1bW4nXSksb3B0aW9ucz17aGFzaDp7XG4gICAgJ2NvbnRlbnQnOiAoXCJ2aWV3LmNvbnRlbnRcIilcbiAgfSxoYXNoVHlwZXM6eydjb250ZW50JzogXCJJRFwifSxoYXNoQ29udGV4dHM6eydjb250ZW50JzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImRhdGEtdGFibGUtY29sdW1uXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgXCJ2aWV3LmNvbnRlbnRcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oMSwgcHJvZ3JhbTEsIGRhdGEpLGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICBcbn0pO1xuIiwiRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUvY29sbGVjdGlvbi1pdGVtJ10gPSByZXF1aXJlKCcuL2NvbGxlY3Rpb24taXRlbS5oYnMnKTtcblxudmFyIENvbGxlY3Rpb25JdGVtVmlldyA9IEVtYmVyLlZpZXcuZXh0ZW5kKHtcbiAgZWxlbWVudElkOiBFbWJlci5jb21wdXRlZC5hbGlhcygnbmFtZScpLFxuICB0ZW1wbGF0ZU5hbWU6ICdjb21wb25lbnRzL2RhdGEtdGFibGUvY29sbGVjdGlvbi1pdGVtJyxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnZHJvcFNpZGUnLCAnY29sdW1uVHlwZSddLFxuICB0YWdOYW1lOiAndGgnLFxuICBkcm9wU2lkZTogbnVsbCxcbiAgdGFyZ2V0OiBFbWJlci5jb21wdXRlZC5hbGlhcygncGFyZW50VmlldycpLFxuXG4gIGNvbHVtblR5cGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGVudCA9IHRoaXMuZ2V0KCdjb250ZW50Lm5hbWUnKTtcbiAgICB2YXIgcG9zdGZpeCA9ICctY29sdW1uJztcbiAgICByZXR1cm4gY29udGVudCA/IChjb250ZW50ICsgcG9zdGZpeCkudG9Mb3dlckNhc2UoKSA6ICdzZWxlY3RhYmxlJyArIHBvc3RmaXg7XG4gIH0ucHJvcGVydHkoJ2NvbnRlbnQnKSxcblxuICBkcmFnT3ZlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmdldCgnY29udGVudCcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgRW1iZXIucnVuLnRocm90dGxlKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChldmVudC5vcmlnaW5hbEV2ZW50Lm9mZnNldFggPiAodGhpcy4kKCkud2lkdGgoKSAvIDIpKSB7XG4gICAgICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsICdyaWdodCcpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsICdsZWZ0Jyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0KCdwYXJlbnRWaWV3Lm92ZXInLCB0cnVlKTtcbiAgICB9LCAzMDApO1xuICB9LFxuXG4gIGRyYWdMZWF2ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsIG51bGwpO1xuICAgIHRoaXMuc2V0KCdwYXJlbnRWaWV3Lm92ZXInLCBmYWxzZSk7XG4gIH0sXG5cbiAgZHJvcDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5nZXQoJ2NvbnRlbnQnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzaWRlRHJvcHBlZCA9IHRoaXMuZ2V0KCdkcm9wU2lkZScpO1xuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnYXBwbGljYXRpb24vanNvbicpKTtcbiAgICB2YXIgY29sdW1uID0gdGhpcy5nZXQoJ3BhcmVudFZpZXcucGFyZW50Vmlldy5hdmFpbGFibGVDb2x1bW5zJykuZmluZEJ5KCduYW1lJywgZGF0YS5uYW1lKTtcblxuICAgIGlmIChzaWRlRHJvcHBlZCA9PT0gJ2xlZnQnKSB7XG4gICAgICB0aGlzLnNlbmQoJ2luc2VydEJlZm9yZScsIHRoaXMuZ2V0KCdjb250ZW50JyksIGNvbHVtbik7ICAgXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZW5kKCdpbnNlcnRBZnRlcicsIHRoaXMuZ2V0KCdjb250ZW50JyksIGNvbHVtbik7ICAgXG4gICAgfVxuXG4gICAgdGhpcy5zZXQoJ2Ryb3BTaWRlJywgbnVsbCk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25JdGVtVmlldztcbiIsInZhciBDb2xsZWN0aW9uSXRlbVZpZXcgPSByZXF1aXJlKCcuL2NvbGxlY3Rpb24taXRlbScpO1xuRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUvaGVhZGVyJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgRGF0YVRhYmxlSGVhZGVyQ29sbGVjdGlvbiA9IEVtYmVyLkNvbGxlY3Rpb25WaWV3LmV4dGVuZCh7XG4gIHRhZ05hbWU6ICd0cicsXG4gIHRlbXBsYXRlTmFtZTogJ2NvbXBvbmVudHMvZGF0YS10YWJsZS9oZWFkZXInLFxuICBjb250ZW50OiBFbWJlci5jb21wdXRlZC5hbGlhcygncGFyZW50Vmlldy5jb2x1bW5zJyksXG4gIGxpbWl0OiBFbWJlci5jb21wdXRlZC5hbGlhcygncGFyZW50Vmlldy5saW1pdCcpLFxuICBjbGFzc05hbWVCaW5kaW5nczogWydvdmVyJ10sXG4gIGNvbHVtbnNOb3RJbkhlYWRlcjogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ3BhcmVudFZpZXcuYmluQ29tcG9uZW50LmNvbHVtbnMnKSxcbiAgaXRlbVZpZXdDbGFzczogQ29sbGVjdGlvbkl0ZW1WaWV3LFxuXG4gIGRyYWdPdmVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGRyYWdFbnRlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgfSxcblxuICBkcmFnTGVhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfSxcblxuICBkcm9wOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCBmYWxzZSk7XG4gIH0sXG5cbiAgaW5zZXJ0QXQ6IGZ1bmN0aW9uIChleGlzdGluZywgZHJvcHBlZCwgYWRkKSB7XG4gICAgdmFyIGNvbHVtbnMgPSB0aGlzLmdldCgnY29udGVudCcpO1xuICAgIHZhciBjb2x1bW5zTm90SW5IZWFkZXIgPSB0aGlzLmdldCgnY29sdW1uc05vdEluSGVhZGVyJyk7XG4gICAgdmFyIGV4aXN0aW5nSW5kZXggPSBjb2x1bW5zLmluZGV4T2YoZXhpc3RpbmcpO1xuICAgIHZhciBkdXBsaWNhdGUgPSBjb2x1bW5zLmZpbmRCeSgnbmFtZScsIGRyb3BwZWQuZ2V0KCduYW1lJykpO1xuICAgIHZhciB0b3RhbCA9IHRoaXMuZ2V0KCdjb250ZW50Lmxlbmd0aCcpO1xuICAgIHZhciBsaW1pdCA9IHRoaXMuZ2V0KCdsaW1pdCcpO1xuICAgIHZhciBtb2RpZmVkSW5kZXg7XG4gICAgdmFyIGR1cEluZGV4O1xuXG4gICAgaWYgKGV4aXN0aW5nLmdldCgnbmFtZScpID09PSBkcm9wcGVkLmdldCgnbmFtZScpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbW9kaWZpZWRJbmRleCA9IGV4aXN0aW5nSW5kZXggKyBhZGQ7XG4gICAgfVxuXG4gICAgaWYgKGNvbHVtbnMpIHtcbiAgICAgIC8vIG1vdmUgY29sdW1uIHRvIG5ldyBpbmRleFxuICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICBkdXBJbmRleCA9IGNvbHVtbnMuaW5kZXhPZihkdXBsaWNhdGUpO1xuICAgICAgICBpZiAodHlwZW9mIGR1cEluZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGNvbHVtbnMuYXJyYXlDb250ZW50V2lsbENoYW5nZShkdXBJbmRleCwgMSwgMCk7XG4gICAgICAgICAgY29sdW1ucy5zcGxpY2UoZHVwSW5kZXgsIDEpO1xuICAgICAgICAgIHRoaXMuc2V0KCdjb250ZW50JywgY29sdW1ucyk7XG4gICAgICAgICAgY29sdW1ucy5hcnJheUNvbnRlbnREaWRDaGFuZ2UoZHVwSW5kZXgsIDEsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChsaW1pdCAmJiB0b3RhbCA9PT0gbGltaXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBBZGQgdG8gZW5kLCBpbnN0ZWFkIG9mIHNwbGljaW5nXG4gICAgICBpZiAobW9kaWZpZWRJbmRleCA+IGNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbHVtbnMucHVzaE9iamVjdChkcm9wcGVkKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb2x1bW5zLmFycmF5Q29udGVudFdpbGxDaGFuZ2UobW9kaWZpZWRJbmRleCwgMCwgMSk7XG4gICAgICAgIGNvbHVtbnMuc3BsaWNlKG1vZGlmaWVkSW5kZXgsIDAsIGRyb3BwZWQpO1xuICAgICAgICB0aGlzLnNldCgnY29udGVudCcsIGNvbHVtbnMpO1xuICAgICAgICBjb2x1bW5zLmFycmF5Q29udGVudERpZENoYW5nZShtb2RpZmllZEluZGV4LCAwLCAxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRyb3BwZWQpIHtcbiAgICAgICAgdGhpcy5zZXQoJ2NvbHVtbnNOb3RJbkhlYWRlcicsIGNvbHVtbnNOb3RJbkhlYWRlci53aXRob3V0KGRyb3BwZWQpKTtcbiAgICAgIH1cbiAgICB9IFxuICB9LFxuXG4gIGFjdGlvbnM6IHtcbiAgICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIChleGlzdGluZywgZHJvcHBlZCkge1xuICAgICAgdGhpcy5pbnNlcnRBdChleGlzdGluZywgZHJvcHBlZCwgMCk7ICBcbiAgICB9LFxuXG4gICAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uIChleGlzdGluZywgZHJvcHBlZCkge1xuICAgICAgdGhpcy5pbnNlcnRBdChleGlzdGluZywgZHJvcHBlZCwgMSk7ICBcbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFUYWJsZUhlYWRlckNvbGxlY3Rpb247XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJztcblxuXG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxLCBoZWxwZXIsIG9wdGlvbnMsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbiwgc2VsZj10aGlzO1xuXG5mdW5jdGlvbiBwcm9ncmFtMShkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazE7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICA8dHI+XFxuICAgICAgICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnNbJ2lmJ10uY2FsbChkZXB0aDAsIFwic2VsZWN0YWJsZVwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5ub29wLGZuOnNlbGYucHJvZ3JhbSgyLCBwcm9ncmFtMiwgZGF0YSksY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG5cXG4gICAgICAgIFwiKTtcbiAgc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwLCBcInJvd1wiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5ub29wLGZuOnNlbGYucHJvZ3JhbSg0LCBwcm9ncmFtNCwgZGF0YSksY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICA8L3RyPlxcbiAgICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cbmZ1bmN0aW9uIHByb2dyYW0yKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICAgICAgICA8dGQ+XCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnMuaW5wdXQgfHwgKGRlcHRoMCAmJiBkZXB0aDAuaW5wdXQpLG9wdGlvbnM9e2hhc2g6e1xuICAgICd0eXBlJzogKFwiY2hlY2tib3hcIilcbiAgfSxoYXNoVHlwZXM6eyd0eXBlJzogXCJTVFJJTkdcIn0saGFzaENvbnRleHRzOnsndHlwZSc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJpbnB1dFwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIjwvdGQ+XFxuICAgICAgICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cblxuZnVuY3Rpb24gcHJvZ3JhbTQoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgICAgICAgIDx0ZD5cIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuX3RyaWFnZU11c3RhY2hlLmNhbGwoZGVwdGgwLCBcIlwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPC90ZD5cXG4gICAgICAgIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVyc1snZGF0YS10YWJsZS1iaW4nXSB8fCAoZGVwdGgwICYmIGRlcHRoMFsnZGF0YS10YWJsZS1iaW4nXSksb3B0aW9ucz17aGFzaDp7XG4gICAgJ2NvbHVtbnMnOiAoXCJjb2x1bW5zTm90SW5IZWFkZXJcIiksXG4gICAgJ3ZpZXdOYW1lJzogKFwiYmluQ29tcG9uZW50XCIpXG4gIH0saGFzaFR5cGVzOnsnY29sdW1ucyc6IFwiSURcIiwndmlld05hbWUnOiBcIlNUUklOR1wifSxoYXNoQ29udGV4dHM6eydjb2x1bW5zJzogZGVwdGgwLCd2aWV3TmFtZSc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJkYXRhLXRhYmxlLWJpblwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbjx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtcmVzcG9uc2l2ZSB0YWJsZS1ob3ZlciB0YWJsZS1jb25kZW5zZWRcXFwiPlxcbiAgPHRoZWFkPlxcbiAgICBcIik7XG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbihoZWxwZXJzLnZpZXcuY2FsbChkZXB0aDAsIFwiZGF0YVRhYmxlSGVhZGVyXCIsIHtoYXNoOntcbiAgICAndmlld05hbWUnOiAoXCJjb2x1bW5Db2xsZWN0aW9uXCIpXG4gIH0saGFzaFR5cGVzOnsndmlld05hbWUnOiBcIlNUUklOR1wifSxoYXNoQ29udGV4dHM6eyd2aWV3TmFtZSc6IGRlcHRoMH0sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgPC90aGVhZD5cXG4gIDx0Ym9keT5cXG4gICAgXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAsIFwicm93XCIsIFwiaW5cIiwgXCJkYXRhXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwLGRlcHRoMCxkZXB0aDBdLHR5cGVzOltcIklEXCIsXCJJRFwiLFwiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gIDwvdGJvZHk+XFxuPC90YWJsZT5cXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJ2YXIgRGF0YVRhYmxlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9kYXRhLXRhYmxlL2NvbXBvbmVudCcpO1xudmFyIERhdGFUYWJsZUJpbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vZGF0YS10YWJsZS1iaW4vY29tcG9uZW50Jyk7XG52YXIgRGF0YVRhYmxlQ29sdW1uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9kYXRhLXRhYmxlLWNvbHVtbi9jb21wb25lbnQnKTtcblxuRW1iZXIuQXBwbGljYXRpb24uaW5pdGlhbGl6ZXIoe1xuICBuYW1lOiAnZGF0YS10YWJsZScsXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oY29udGFpbmVyLCBhcHBsaWNhdGlvbikge1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcignY29tcG9uZW50OmRhdGEtdGFibGUnLCBEYXRhVGFibGVDb21wb25lbnQsIHtzaW5nbGV0b246IGZhbHNlIH0pO1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcignY29tcG9uZW50OmRhdGEtdGFibGUtYmluJywgRGF0YVRhYmxlQmluQ29tcG9uZW50LCB7c2luZ2xldG9uOiBmYWxzZSB9KTtcbiAgICBjb250YWluZXIucmVnaXN0ZXIoJ2NvbXBvbmVudDpkYXRhLXRhYmxlLWNvbHVtbicsIERhdGFUYWJsZUNvbHVtbkNvbXBvbmVudCwge3NpbmdsZXRvbjogZmFsc2UgfSk7XG4gIH1cbn0pO1xuIl19
