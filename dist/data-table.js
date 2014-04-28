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
  dataset: Ember.A(),
  limit: null,
  dataTableHeader: DataTableHeaderView,
  selectedRows: Ember.computed.filterBy('data', 'selected', true), 

  blah: function () {
    this.get('selectedRows');
  }.on('init'),

  selectedChanged: function () {
    var selected = this.get('selectedRows');
    
    if (selected && selected.get('length')) {
      this.sendAction('action', selected);
    }
  }.observes('selectedRows'),

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
    var result;

    dataset = Ember.isArray(dataset) ? dataset : dataset.get('content');

    if (!Ember.isArray(dataset)) {
      throw new Error('Dataset input must be an array.');
    }

    result = dataset.map(function (item) {
      var type = item.constructor.typeKey;

      if (columns) {
        return Ember.Object.create({
          row: self.columnAttributeMap(columns, item, type),
          model: item,
          selected: false
        });
      }
    }).filter(function (item) {
      var row = item.get('row');

      if (row) {
        var allEmpty = row.every(function (col) {
          return Ember.isEmpty(col)
        });

        if (allEmpty) {
          return false;
        }
        else {
          return !row.isAny('@this', '');
        }
      }
    });

    return result;
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
  },

  actions: {
    clearSelected: function () {
      this.get('data').forEach(function (item) {
        item.set('selected', false);
      });
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
  stack1 = helpers.each.call(depth0, "item.row", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n      </tr>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n          <td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("item.selected")
  },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
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
  stack1 = helpers.each.call(depth0, "item", "in", "data", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1iaW4vY29tcG9uZW50LmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWJpbi90ZW1wbGF0ZS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUtY29sdW1uL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1jb2x1bW4vdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvY29sbGVjdGlvbi1pdGVtLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvY29sbGVjdGlvbi1pdGVtLmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL2hlYWRlci9pbmRleC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL3RlbXBsYXRlLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvaW5pdGlhbGl6ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDak1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUtYmluJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgRGF0YVRhYmxlQmluQ29tcG9uZW50ID0gRW1iZXIuQ29tcG9uZW50LmV4dGVuZCh7XG4gIGNsYXNzTmFtZXM6IFsnaGVhZGVyLWl0ZW0tYmluJ10sXG4gIGNsYXNzTmFtZUJpbmRpbmdzOiBbJ292ZXInXSxcblxuICBkcmFnT3ZlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGRyb3A6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnYXBwbGljYXRpb24vanNvbicpKTtcbiAgICB2YXIgY29sdW1ucyA9IHRoaXMuZ2V0KCdjb2x1bW5zJyk7XG4gICAgdmFyIGhlYWRlckNvbHVtbnMgPSB0aGlzLmdldCgncGFyZW50Vmlldy5jb2x1bW5zJyk7XG4gICAgdmFyIGRlZmF1bHRDb2x1bW5zID0gdGhpcy5nZXQoJ3BhcmVudFZpZXcuZGVmYXVsdENvbHVtbnMnKTtcbiAgICB2YXIgY29sdW1uO1xuXG4gICAgaWYgKCFjb2x1bW5zLmZpbmRCeSgnbmFtZScsIGRhdGEubmFtZSkgJiYgaGVhZGVyQ29sdW1ucy53aXRob3V0KGhlYWRlckNvbHVtbnMuZmluZEJ5KCduYW1lJywgZGF0YS5uYW1lKSkuY29tcGFjdCgpLmxlbmd0aCA+PSAxKSB7XG4gICAgICBjb2x1bW4gPSB0aGlzLmdldCgncGFyZW50Vmlldy5hdmFpbGFibGVDb2x1bW5zJykuZmluZEJ5KCduYW1lJywgZGF0YS5uYW1lKTtcbiAgICAgIHRoaXMuZ2V0KCdjb2x1bW5zJykucHVzaE9iamVjdChjb2x1bW4pO1xuXG4gICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgIHRoaXMuc2V0KCdwYXJlbnRWaWV3LmNvbHVtbnMnLCBoZWFkZXJDb2x1bW5zLndpdGhvdXQoY29sdW1uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXQoJ292ZXInLCBmYWxzZSk7XG4gIH0sXG5cbiAgZHJhZ0VudGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgfSxcblxuICBkcmFnTGVhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVRhYmxlQmluQ29tcG9uZW50O1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMSwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBzZWxmPXRoaXM7XG5cbmZ1bmN0aW9uIHByb2dyYW0xKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICA8bGk+XCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnNbJ2RhdGEtdGFibGUtY29sdW1uJ10gfHwgKGRlcHRoMCAmJiBkZXB0aDBbJ2RhdGEtdGFibGUtY29sdW1uJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb250ZW50JzogKFwiXCIpXG4gIH0saGFzaFR5cGVzOnsnY29udGVudCc6IFwiSURcIn0saGFzaENvbnRleHRzOnsnY29udGVudCc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJkYXRhLXRhYmxlLWNvbHVtblwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIjwvbGk+XFxuICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cblxuZnVuY3Rpb24gcHJvZ3JhbTMoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIFxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgIDxsaT48c3BhbiBjbGFzcz1cXFwidGV4dC1tdXRlZFxcXCI+Tm8gYXR0cmlidXRlcyBhdmFpbGFibGUuPC9zcGFuPjwvbGk+XFxuICBcIik7XG4gIH1cblxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPHVsIGNsYXNzPVxcXCJ3ZWxsIHdlbGwtc20gbGlzdC11bnN0eWxlZCBsaXN0LWlubGluZVxcXCI+XFxuICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgXCJjb2x1bW5zXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLnByb2dyYW0oMywgcHJvZ3JhbTMsIGRhdGEpLGZuOnNlbGYucHJvZ3JhbSgxLCBwcm9ncmFtMSwgZGF0YSksY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG48L3VsPlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsIkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlLWNvbHVtbiddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUNvbHVtbkNvbXBvbmVudCA9IEVtYmVyLkNvbXBvbmVudC5leHRlbmQoe1xuICBjbGFzc05hbWVzOiBbJ2xhYmVsJywgJ2xhYmVsLWRlZmF1bHQnXSxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnZGF0YVR5cGUnXSxcbiAgYXR0cmlidXRlQmluZGluZ3M6IFsnZHJhZ2dhYmxlJ10sXG4gIGRyYWdnYWJsZTogJ3RydWUnLFxuXG4gIGRhdGFUeXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICd0eXBlLScgKyB0aGlzLmdldCgnY29udGVudC5kYXRhVHlwZScpIHx8ICdkZWZhdWx0JztcbiAgfS5wcm9wZXJ0eSgnY29udGVudC5kYXRhVHlwZScpLFxuXG4gIGRyYWdTdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBpZDogdGhpcy5nZXQoJ2VsZW1lbnRJZCcpLFxuICAgICAgbmFtZTogdGhpcy5nZXQoJ2NvbnRlbnQubmFtZScpXG4gICAgfTtcblxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVDb2x1bW5Db21wb25lbnQ7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuXG5cbiAgc3RhY2sxID0gaGVscGVycy5fdHJpYWdlTXVzdGFjaGUuY2FsbChkZXB0aDAsIFwiY29udGVudC5uYW1lXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJ2YXIgRGF0YVRhYmxlSGVhZGVyVmlldyA9IHJlcXVpcmUoJy4vaGVhZGVyJyk7XG5FbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZSddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUNvbXBvbmVudCA9IEVtYmVyLkNvbXBvbmVudC5leHRlbmQoe1xuICBjb2x1bW5zOiBFbWJlci5BKCksXG4gIGRhdGFzZXQ6IEVtYmVyLkEoKSxcbiAgbGltaXQ6IG51bGwsXG4gIGRhdGFUYWJsZUhlYWRlcjogRGF0YVRhYmxlSGVhZGVyVmlldyxcbiAgc2VsZWN0ZWRSb3dzOiBFbWJlci5jb21wdXRlZC5maWx0ZXJCeSgnZGF0YScsICdzZWxlY3RlZCcsIHRydWUpLCBcblxuICBibGFoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5nZXQoJ3NlbGVjdGVkUm93cycpO1xuICB9Lm9uKCdpbml0JyksXG5cbiAgc2VsZWN0ZWRDaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGVjdGVkID0gdGhpcy5nZXQoJ3NlbGVjdGVkUm93cycpO1xuICAgIFxuICAgIGlmIChzZWxlY3RlZCAmJiBzZWxlY3RlZC5nZXQoJ2xlbmd0aCcpKSB7XG4gICAgICB0aGlzLnNlbmRBY3Rpb24oJ2FjdGlvbicsIHNlbGVjdGVkKTtcbiAgICB9XG4gIH0ub2JzZXJ2ZXMoJ3NlbGVjdGVkUm93cycpLFxuXG4gIHNlbGVjdGFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5nZXQoJ2FjdGlvbicpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LnByb3BlcnR5KCksXG5cbiAgdHlwZXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ2RhdGFzZXQnKS5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzLCBjdXJyZW50KSB7XG4gICAgICBpZiAoIXByZXZpb3VzLmZpbmRCeSgndHlwZScsIGN1cnJlbnQuY29uc3RydWN0b3IudHlwZUtleSkpIHtcbiAgICAgICAgcHJldmlvdXMucHVzaE9iamVjdChFbWJlci5PYmplY3QuY3JlYXRlKHtcbiAgICAgICAgICB0eXBlOiBjdXJyZW50LmNvbnN0cnVjdG9yLnR5cGVLZXksXG4gICAgICAgICAga2V5czogRW1iZXIua2V5cyhjdXJyZW50LnRvSlNPTigpKVxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICB9LCBbXSk7XG4gIH0ucHJvcGVydHkoJ2RhdGFzZXQnKSxcblxuICBhdmFpbGFibGVDb2x1bW5zOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRhdGFzZXQgPSB0aGlzLmdldCgnZGF0YXNldCcpO1xuICAgIHZhciBhbGlhc2VzID0gdGhpcy5nZXQoJ2NvbHVtbkFsaWFzZXMnKTtcbiAgICByZXR1cm4gYWxpYXNlcyAmJiAhRW1iZXIuaXNFbXB0eShhbGlhc2VzKSA/IGFsaWFzZXMgOiB0aGlzLmdlbmVyYXRlQ29sdW1ucyhkYXRhc2V0KTtcbiAgfS5wcm9wZXJ0eSgpLFxuXG4gIGNvbHVtbnNOb3RJbkhlYWRlcjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhdmFpbGFibGUgPSB0aGlzLmdldCgnYXZhaWxhYmxlQ29sdW1ucycpO1xuICAgIHZhciBkaXNwbGF5ZWQgPSB0aGlzLmdldCgnY29sdW1ucycpO1xuXG4gICAgcmV0dXJuIGF2YWlsYWJsZS5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzLCBpdGVtKSB7XG4gICAgICBpZiAoIWRpc3BsYXllZC5maW5kQnkoJ25hbWUnLCBpdGVtLm5hbWUpKSB7XG4gICAgICAgIHByZXZpb3VzLnB1c2hPYmplY3QoaXRlbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICB9LCBbXSk7XG4gIH0ucHJvcGVydHkoJ2F2YWlsYWJsZUNvbHVtbnMnLCAnY29sdW1ucycpLFxuXG4gIHByZVBvcHVsYXRlQ29sdW1uczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxlY3RhYmxlID0gdGhpcy5nZXQoJ3NlbGVjdGFibGUnKTtcbiAgICB2YXIgZGVmYXVsdENvbHVtbnMgPSB0aGlzLmdldCgnZGVmYXVsdENvbHVtbnMnKTtcbiAgICB2YXIgYXZhaWxhYmxlQ29sdW1ucyA9IHRoaXMuZ2V0KCdhdmFpbGFibGVDb2x1bW5zJyk7XG4gICAgdmFyIGZpbHRlcmVkID0gYXZhaWxhYmxlQ29sdW1ucy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBkZWZhdWx0Q29sdW1ucy5jb250YWlucyhpdGVtLmdldCgnbmFtZScpKTtcbiAgICB9KTtcblxuICAgIGlmIChzZWxlY3RhYmxlKSB7XG4gICAgICBmaWx0ZXJlZC51bnNoaWZ0KG51bGwpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0KCdjb2x1bW5zJywgZmlsdGVyZWQpO1xuICB9Lm9uKCdpbml0JyksXG5cbiAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBkYXRhc2V0ID0gdGhpcy5nZXQoJ2RhdGFzZXQnKTtcbiAgICB2YXIgY29sdW1ucyA9IHRoaXMuZ2V0KCdjb2x1bW5zJyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciByZXN1bHQ7XG5cbiAgICBkYXRhc2V0ID0gRW1iZXIuaXNBcnJheShkYXRhc2V0KSA/IGRhdGFzZXQgOiBkYXRhc2V0LmdldCgnY29udGVudCcpO1xuXG4gICAgaWYgKCFFbWJlci5pc0FycmF5KGRhdGFzZXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGFzZXQgaW5wdXQgbXVzdCBiZSBhbiBhcnJheS4nKTtcbiAgICB9XG5cbiAgICByZXN1bHQgPSBkYXRhc2V0Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIHR5cGUgPSBpdGVtLmNvbnN0cnVjdG9yLnR5cGVLZXk7XG5cbiAgICAgIGlmIChjb2x1bW5zKSB7XG4gICAgICAgIHJldHVybiBFbWJlci5PYmplY3QuY3JlYXRlKHtcbiAgICAgICAgICByb3c6IHNlbGYuY29sdW1uQXR0cmlidXRlTWFwKGNvbHVtbnMsIGl0ZW0sIHR5cGUpLFxuICAgICAgICAgIG1vZGVsOiBpdGVtLFxuICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciByb3cgPSBpdGVtLmdldCgncm93Jyk7XG5cbiAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgdmFyIGFsbEVtcHR5ID0gcm93LmV2ZXJ5KGZ1bmN0aW9uIChjb2wpIHtcbiAgICAgICAgICByZXR1cm4gRW1iZXIuaXNFbXB0eShjb2wpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChhbGxFbXB0eSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gIXJvdy5pc0FueSgnQHRoaXMnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0ucHJvcGVydHkoJ2RhdGFzZXQnLCAnY29sdW1ucy5sZW5ndGgnKSxcblxuICBjb2x1bW5BdHRyaWJ1dGVNYXA6IGZ1bmN0aW9uIChjb2x1bW5zLCByb3csIHR5cGUpIHtcbiAgICBpZiAoIXJvdykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBbXSxcbiAgICAgIHJvd0pzb24gPSByb3cudG9KU09OKCksXG4gICAgICByb3dLZXlzID0gRW1iZXIua2V5cyhyb3dKc29uKSxcbiAgICAgIGNvbCA9IDAsXG4gICAgICBjb2x1bW5zQWRkZWQgPSBbXSxcbiAgICAgIGhlYWRlciwgcHJvcCwgYXR0cjtcblxuICAgIGZvciAoOyBjb2wgPCBjb2x1bW5zLmxlbmd0aDsgY29sKyspIHtcbiAgICAgIGhlYWRlciA9IGNvbHVtbnMub2JqZWN0QXQoY29sKTtcblxuICAgICAgaWYgKCFoZWFkZXIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGhlYWRlci5nZXQoJ2F0dHJpYnV0ZXMnKS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGF0dHIuc3BsaXQoJzonKTtcbiAgICAgICAgcHJvcCA9IHNwbGl0WzFdO1xuICAgICAgICBpZiAocm93SnNvbi5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiAhY29sdW1uc0FkZGVkLmNvbnRhaW5zKHByb3ApKSB7XG4gICAgICAgICAgY29sdW1uc0FkZGVkLnB1c2gocHJvcCk7XG4gICAgICAgICAgcmVzdWx0LnNwbGljZShjb2wsIDAsIHJvd0pzb25bcHJvcF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFjb2x1bW5zQWRkZWQuY29udGFpbnMocHJvcCkpIHtcbiAgICAgICAgICByZXN1bHQuc3BsaWNlKGNvbCwgMCwgJycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIGdlbmVyYXRlQ29sdW1uczogZnVuY3Rpb24gKGRhdGFzZXQpIHtcbiAgICB2YXIgdHlwZXMgPSB0aGlzLmdldCgndHlwZXMnKTtcblxuICAgIGlmICh0eXBlcykge1xuICAgICAgcmV0dXJuIHR5cGVzLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXMsIGN1cnJlbnQsIGluZGV4LCBhcnIpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBjdXJyZW50LmdldCgndHlwZScpO1xuXG4gICAgICAgIGN1cnJlbnQuZ2V0KCdrZXlzJykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIHZhciBuYW1lID0gaXRlbS5jYXBpdGFsaXplKCk7XG4gICAgICAgICAgdmFyIGNvbHVtbiA9IHByZXZpb3VzLmZpbmRCeSgnbmFtZScsIG5hbWUpO1xuICAgICAgICAgIHZhciBhdHRyaWJ1dGUgPSB0eXBlICsgJzonICsgaXRlbTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgICAgICBjb2x1bW4uZ2V0KCdhdHRyaWJ1dGVzJykucHVzaE9iamVjdChhdHRyaWJ1dGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByZXZpb3VzLnB1c2hPYmplY3QoRW1iZXIuT2JqZWN0LmNyZWF0ZSh7XG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFthdHRyaWJ1dGVdLFxuICAgICAgICAgICAgICBkYXRhVHlwZTogdHlwZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgICAgfSwgW10pO1xuICAgIH1cbiAgfSxcblxuICBhY3Rpb25zOiB7XG4gICAgY2xlYXJTZWxlY3RlZDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5nZXQoJ2RhdGEnKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uc2V0KCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVRhYmxlQ29tcG9uZW50O1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMSwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBzZWxmPXRoaXM7XG5cbmZ1bmN0aW9uIHByb2dyYW0xKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgXCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnNbJ2RhdGEtdGFibGUtY29sdW1uJ10gfHwgKGRlcHRoMCAmJiBkZXB0aDBbJ2RhdGEtdGFibGUtY29sdW1uJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb250ZW50JzogKFwidmlldy5jb250ZW50XCIpXG4gIH0saGFzaFR5cGVzOnsnY29udGVudCc6IFwiSURcIn0saGFzaENvbnRleHRzOnsnY29udGVudCc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJkYXRhLXRhYmxlLWNvbHVtblwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG4gIHN0YWNrMSA9IGhlbHBlcnNbJ2lmJ10uY2FsbChkZXB0aDAsIFwidmlldy5jb250ZW50XCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsIkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlL2NvbGxlY3Rpb24taXRlbSddID0gcmVxdWlyZSgnLi9jb2xsZWN0aW9uLWl0ZW0uaGJzJyk7XG5cbnZhciBDb2xsZWN0aW9uSXRlbVZpZXcgPSBFbWJlci5WaWV3LmV4dGVuZCh7XG4gIGVsZW1lbnRJZDogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ25hbWUnKSxcbiAgdGVtcGxhdGVOYW1lOiAnY29tcG9uZW50cy9kYXRhLXRhYmxlL2NvbGxlY3Rpb24taXRlbScsXG4gIGNsYXNzTmFtZUJpbmRpbmdzOiBbJ2Ryb3BTaWRlJywgJ2NvbHVtblR5cGUnXSxcbiAgdGFnTmFtZTogJ3RoJyxcbiAgZHJvcFNpZGU6IG51bGwsXG4gIHRhcmdldDogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ3BhcmVudFZpZXcnKSxcblxuICBjb2x1bW5UeXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbnRlbnQgPSB0aGlzLmdldCgnY29udGVudC5uYW1lJyk7XG4gICAgdmFyIHBvc3RmaXggPSAnLWNvbHVtbic7XG4gICAgcmV0dXJuIGNvbnRlbnQgPyAoY29udGVudCArIHBvc3RmaXgpLnRvTG93ZXJDYXNlKCkgOiAnc2VsZWN0YWJsZScgKyBwb3N0Zml4O1xuICB9LnByb3BlcnR5KCdjb250ZW50JyksXG5cbiAgZHJhZ092ZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICghdGhpcy5nZXQoJ2NvbnRlbnQnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIEVtYmVyLnJ1bi50aHJvdHRsZSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudC5vZmZzZXRYID4gKHRoaXMuJCgpLndpZHRoKCkgLyAyKSkge1xuICAgICAgICB0aGlzLnNldCgnZHJvcFNpZGUnLCAncmlnaHQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnNldCgnZHJvcFNpZGUnLCAnbGVmdCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldCgncGFyZW50Vmlldy5vdmVyJywgdHJ1ZSk7XG4gICAgfSwgMzAwKTtcbiAgfSxcblxuICBkcmFnTGVhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnZHJvcFNpZGUnLCBudWxsKTtcbiAgICB0aGlzLnNldCgncGFyZW50Vmlldy5vdmVyJywgZmFsc2UpO1xuICB9LFxuXG4gIGRyb3A6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuZ2V0KCdjb250ZW50JykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2lkZURyb3BwZWQgPSB0aGlzLmdldCgnZHJvcFNpZGUnKTtcbiAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2FwcGxpY2F0aW9uL2pzb24nKSk7XG4gICAgdmFyIGNvbHVtbiA9IHRoaXMuZ2V0KCdwYXJlbnRWaWV3LnBhcmVudFZpZXcuYXZhaWxhYmxlQ29sdW1ucycpLmZpbmRCeSgnbmFtZScsIGRhdGEubmFtZSk7XG5cbiAgICBpZiAoc2lkZURyb3BwZWQgPT09ICdsZWZ0Jykge1xuICAgICAgdGhpcy5zZW5kKCdpbnNlcnRCZWZvcmUnLCB0aGlzLmdldCgnY29udGVudCcpLCBjb2x1bW4pOyAgIFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZCgnaW5zZXJ0QWZ0ZXInLCB0aGlzLmdldCgnY29udGVudCcpLCBjb2x1bW4pOyAgIFxuICAgIH1cblxuICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsIG51bGwpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0aW9uSXRlbVZpZXc7XG4iLCJ2YXIgQ29sbGVjdGlvbkl0ZW1WaWV3ID0gcmVxdWlyZSgnLi9jb2xsZWN0aW9uLWl0ZW0nKTtcbkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlL2hlYWRlciddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUhlYWRlckNvbGxlY3Rpb24gPSBFbWJlci5Db2xsZWN0aW9uVmlldy5leHRlbmQoe1xuICB0YWdOYW1lOiAndHInLFxuICB0ZW1wbGF0ZU5hbWU6ICdjb21wb25lbnRzL2RhdGEtdGFibGUvaGVhZGVyJyxcbiAgY29udGVudDogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ3BhcmVudFZpZXcuY29sdW1ucycpLFxuICBsaW1pdDogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ3BhcmVudFZpZXcubGltaXQnKSxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnb3ZlciddLFxuICBjb2x1bW5zTm90SW5IZWFkZXI6IEVtYmVyLmNvbXB1dGVkLmFsaWFzKCdwYXJlbnRWaWV3LmJpbkNvbXBvbmVudC5jb2x1bW5zJyksXG4gIGl0ZW1WaWV3Q2xhc3M6IENvbGxlY3Rpb25JdGVtVmlldyxcblxuICBkcmFnT3ZlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSxcblxuICBkcmFnRW50ZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHRoaXMuc2V0KCdvdmVyJywgdHJ1ZSk7XG4gIH0sXG5cbiAgZHJhZ0xlYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCBmYWxzZSk7XG4gIH0sXG5cbiAgZHJvcDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0KCdvdmVyJywgZmFsc2UpO1xuICB9LFxuXG4gIGluc2VydEF0OiBmdW5jdGlvbiAoZXhpc3RpbmcsIGRyb3BwZWQsIGFkZCkge1xuICAgIHZhciBjb2x1bW5zID0gdGhpcy5nZXQoJ2NvbnRlbnQnKTtcbiAgICB2YXIgY29sdW1uc05vdEluSGVhZGVyID0gdGhpcy5nZXQoJ2NvbHVtbnNOb3RJbkhlYWRlcicpO1xuICAgIHZhciBleGlzdGluZ0luZGV4ID0gY29sdW1ucy5pbmRleE9mKGV4aXN0aW5nKTtcbiAgICB2YXIgZHVwbGljYXRlID0gY29sdW1ucy5maW5kQnkoJ25hbWUnLCBkcm9wcGVkLmdldCgnbmFtZScpKTtcbiAgICB2YXIgdG90YWwgPSB0aGlzLmdldCgnY29udGVudC5sZW5ndGgnKTtcbiAgICB2YXIgbGltaXQgPSB0aGlzLmdldCgnbGltaXQnKTtcbiAgICB2YXIgbW9kaWZlZEluZGV4O1xuICAgIHZhciBkdXBJbmRleDtcblxuICAgIGlmIChleGlzdGluZy5nZXQoJ25hbWUnKSA9PT0gZHJvcHBlZC5nZXQoJ25hbWUnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG1vZGlmaWVkSW5kZXggPSBleGlzdGluZ0luZGV4ICsgYWRkO1xuICAgIH1cblxuICAgIGlmIChjb2x1bW5zKSB7XG4gICAgICAvLyBtb3ZlIGNvbHVtbiB0byBuZXcgaW5kZXhcbiAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgZHVwSW5kZXggPSBjb2x1bW5zLmluZGV4T2YoZHVwbGljYXRlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBkdXBJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBjb2x1bW5zLmFycmF5Q29udGVudFdpbGxDaGFuZ2UoZHVwSW5kZXgsIDEsIDApO1xuICAgICAgICAgIGNvbHVtbnMuc3BsaWNlKGR1cEluZGV4LCAxKTtcbiAgICAgICAgICB0aGlzLnNldCgnY29udGVudCcsIGNvbHVtbnMpO1xuICAgICAgICAgIGNvbHVtbnMuYXJyYXlDb250ZW50RGlkQ2hhbmdlKGR1cEluZGV4LCAxLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAobGltaXQgJiYgdG90YWwgPT09IGxpbWl0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQWRkIHRvIGVuZCwgaW5zdGVhZCBvZiBzcGxpY2luZ1xuICAgICAgaWYgKG1vZGlmaWVkSW5kZXggPiBjb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICBjb2x1bW5zLnB1c2hPYmplY3QoZHJvcHBlZCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29sdW1ucy5hcnJheUNvbnRlbnRXaWxsQ2hhbmdlKG1vZGlmaWVkSW5kZXgsIDAsIDEpO1xuICAgICAgICBjb2x1bW5zLnNwbGljZShtb2RpZmllZEluZGV4LCAwLCBkcm9wcGVkKTtcbiAgICAgICAgdGhpcy5zZXQoJ2NvbnRlbnQnLCBjb2x1bW5zKTtcbiAgICAgICAgY29sdW1ucy5hcnJheUNvbnRlbnREaWRDaGFuZ2UobW9kaWZpZWRJbmRleCwgMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkcm9wcGVkKSB7XG4gICAgICAgIHRoaXMuc2V0KCdjb2x1bW5zTm90SW5IZWFkZXInLCBjb2x1bW5zTm90SW5IZWFkZXIud2l0aG91dChkcm9wcGVkKSk7XG4gICAgICB9XG4gICAgfSBcbiAgfSxcblxuICBhY3Rpb25zOiB7XG4gICAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoZXhpc3RpbmcsIGRyb3BwZWQpIHtcbiAgICAgIHRoaXMuaW5zZXJ0QXQoZXhpc3RpbmcsIGRyb3BwZWQsIDApOyAgXG4gICAgfSxcblxuICAgIGluc2VydEFmdGVyOiBmdW5jdGlvbiAoZXhpc3RpbmcsIGRyb3BwZWQpIHtcbiAgICAgIHRoaXMuaW5zZXJ0QXQoZXhpc3RpbmcsIGRyb3BwZWQsIDEpOyAgXG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVIZWFkZXJDb2xsZWN0aW9uO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJyc7XG5cblxuICByZXR1cm4gYnVmZmVyO1xuICBcbn0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMSwgaGVscGVyLCBvcHRpb25zLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIHNlbGY9dGhpcztcblxuZnVuY3Rpb24gcHJvZ3JhbTEoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgICAgPHRyPlxcbiAgICAgICAgXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzWydpZiddLmNhbGwoZGVwdGgwLCBcInNlbGVjdGFibGVcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oMiwgcHJvZ3JhbTIsIGRhdGEpLGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuXFxuICAgICAgICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgXCJpdGVtLnJvd1wiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5ub29wLGZuOnNlbGYucHJvZ3JhbSg0LCBwcm9ncmFtNCwgZGF0YSksY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICA8L3RyPlxcbiAgICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cbmZ1bmN0aW9uIHByb2dyYW0yKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICAgICAgICA8dGQ+XCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnMuaW5wdXQgfHwgKGRlcHRoMCAmJiBkZXB0aDAuaW5wdXQpLG9wdGlvbnM9e2hhc2g6e1xuICAgICd0eXBlJzogKFwiY2hlY2tib3hcIiksXG4gICAgJ2NoZWNrZWQnOiAoXCJpdGVtLnNlbGVjdGVkXCIpXG4gIH0saGFzaFR5cGVzOnsndHlwZSc6IFwiU1RSSU5HXCIsJ2NoZWNrZWQnOiBcIklEXCJ9LGhhc2hDb250ZXh0czp7J3R5cGUnOiBkZXB0aDAsJ2NoZWNrZWQnOiBkZXB0aDB9LGNvbnRleHRzOltdLHR5cGVzOltdLGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiaW5wdXRcIiwgb3B0aW9ucykpKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCI8L3RkPlxcbiAgICAgICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbmZ1bmN0aW9uIHByb2dyYW00KGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICAgICAgICA8dGQ+XCIpO1xuICBzdGFjazEgPSBoZWxwZXJzLl90cmlhZ2VNdXN0YWNoZS5jYWxsKGRlcHRoMCwgXCJcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIjwvdGQ+XFxuICAgICAgICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cblxuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnNbJ2RhdGEtdGFibGUtYmluJ10gfHwgKGRlcHRoMCAmJiBkZXB0aDBbJ2RhdGEtdGFibGUtYmluJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb2x1bW5zJzogKFwiY29sdW1uc05vdEluSGVhZGVyXCIpLFxuICAgICd2aWV3TmFtZSc6IChcImJpbkNvbXBvbmVudFwiKVxuICB9LGhhc2hUeXBlczp7J2NvbHVtbnMnOiBcIklEXCIsJ3ZpZXdOYW1lJzogXCJTVFJJTkdcIn0saGFzaENvbnRleHRzOnsnY29sdW1ucyc6IGRlcHRoMCwndmlld05hbWUnOiBkZXB0aDB9LGNvbnRleHRzOltdLHR5cGVzOltdLGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiZGF0YS10YWJsZS1iaW5cIiwgb3B0aW9ucykpKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG48dGFibGUgY2xhc3M9XFxcInRhYmxlIHRhYmxlLXJlc3BvbnNpdmUgdGFibGUtaG92ZXIgdGFibGUtY29uZGVuc2VkXFxcIj5cXG4gIDx0aGVhZD5cXG4gICAgXCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oaGVscGVycy52aWV3LmNhbGwoZGVwdGgwLCBcImRhdGFUYWJsZUhlYWRlclwiLCB7aGFzaDp7XG4gICAgJ3ZpZXdOYW1lJzogKFwiY29sdW1uQ29sbGVjdGlvblwiKVxuICB9LGhhc2hUeXBlczp7J3ZpZXdOYW1lJzogXCJTVFJJTkdcIn0saGFzaENvbnRleHRzOnsndmlld05hbWUnOiBkZXB0aDB9LGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gIDwvdGhlYWQ+XFxuICA8dGJvZHk+XFxuICAgIFwiKTtcbiAgc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwLCBcIml0ZW1cIiwgXCJpblwiLCBcImRhdGFcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oMSwgcHJvZ3JhbTEsIGRhdGEpLGNvbnRleHRzOltkZXB0aDAsZGVwdGgwLGRlcHRoMF0sdHlwZXM6W1wiSURcIixcIklEXCIsXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgPC90Ym9keT5cXG48L3RhYmxlPlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsInZhciBEYXRhVGFibGVDb21wb25lbnQgPSByZXF1aXJlKCcuL2RhdGEtdGFibGUvY29tcG9uZW50Jyk7XG52YXIgRGF0YVRhYmxlQmluQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9kYXRhLXRhYmxlLWJpbi9jb21wb25lbnQnKTtcbnZhciBEYXRhVGFibGVDb2x1bW5Db21wb25lbnQgPSByZXF1aXJlKCcuL2RhdGEtdGFibGUtY29sdW1uL2NvbXBvbmVudCcpO1xuXG5FbWJlci5BcHBsaWNhdGlvbi5pbml0aWFsaXplcih7XG4gIG5hbWU6ICdkYXRhLXRhYmxlJyxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbihjb250YWluZXIsIGFwcGxpY2F0aW9uKSB7XG4gICAgY29udGFpbmVyLnJlZ2lzdGVyKCdjb21wb25lbnQ6ZGF0YS10YWJsZScsIERhdGFUYWJsZUNvbXBvbmVudCwge3NpbmdsZXRvbjogZmFsc2UgfSk7XG4gICAgY29udGFpbmVyLnJlZ2lzdGVyKCdjb21wb25lbnQ6ZGF0YS10YWJsZS1iaW4nLCBEYXRhVGFibGVCaW5Db21wb25lbnQsIHtzaW5nbGV0b246IGZhbHNlIH0pO1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcignY29tcG9uZW50OmRhdGEtdGFibGUtY29sdW1uJywgRGF0YVRhYmxlQ29sdW1uQ29tcG9uZW50LCB7c2luZ2xldG9uOiBmYWxzZSB9KTtcbiAgfVxufSk7XG4iXX0=
