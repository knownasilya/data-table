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

  selectedRows: function () {
    var data = this.get('data');

    return data.filter(function (item) {
      return item.get('selected') ? true : false;
    });
  }.property('data.@each.selected'),

  selectedChanged: function () {
    var selected = this.get('selectedRows');

    this.sendAction('action', selected);
  }.observes('selectedRows.@each.model.selected'),

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
        return Ember.Object.create({
          row: self.columnAttributeMap(columns, item, type),
          model: item,
          selected: false
        });
      }

    }).filter(function (item) {
      // Remove if
      var row = item.get('row');
      var allEmpty = row.every(function (col) {
        return Ember.isEmpty(col)
      });

      if (allEmpty) {
        return false;
      }
      else {
        return !row.isAny('@this', '');
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
  },

  actions: {
    clearSelected: function () {
      throw 'Not Yet Implemented';
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
  data.buffer.push("</td>\n          ");
  data.buffer.push(escapeExpression(helpers.log.call(depth0, "item.model", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n        ");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1iaW4vY29tcG9uZW50LmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWJpbi90ZW1wbGF0ZS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUtY29sdW1uL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1jb2x1bW4vdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvY29sbGVjdGlvbi1pdGVtLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvY29sbGVjdGlvbi1pdGVtLmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL2hlYWRlci9pbmRleC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlL3RlbXBsYXRlLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvaW5pdGlhbGl6ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUtYmluJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgRGF0YVRhYmxlQmluQ29tcG9uZW50ID0gRW1iZXIuQ29tcG9uZW50LmV4dGVuZCh7XG4gIGNsYXNzTmFtZXM6IFsnaGVhZGVyLWl0ZW0tYmluJ10sXG4gIGNsYXNzTmFtZUJpbmRpbmdzOiBbJ292ZXInXSxcblxuICBkcmFnT3ZlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGRyb3A6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnYXBwbGljYXRpb24vanNvbicpKTtcbiAgICB2YXIgY29sdW1ucyA9IHRoaXMuZ2V0KCdjb2x1bW5zJyk7XG4gICAgdmFyIGhlYWRlckNvbHVtbnMgPSB0aGlzLmdldCgncGFyZW50Vmlldy5jb2x1bW5zJyk7XG4gICAgdmFyIGRlZmF1bHRDb2x1bW5zID0gdGhpcy5nZXQoJ3BhcmVudFZpZXcuZGVmYXVsdENvbHVtbnMnKTtcbiAgICB2YXIgY29sdW1uO1xuXG4gICAgaWYgKCFjb2x1bW5zLmZpbmRCeSgnbmFtZScsIGRhdGEubmFtZSkgJiYgaGVhZGVyQ29sdW1ucy53aXRob3V0KGhlYWRlckNvbHVtbnMuZmluZEJ5KCduYW1lJywgZGF0YS5uYW1lKSkuY29tcGFjdCgpLmxlbmd0aCA+PSAxKSB7XG4gICAgICBjb2x1bW4gPSB0aGlzLmdldCgncGFyZW50Vmlldy5hdmFpbGFibGVDb2x1bW5zJykuZmluZEJ5KCduYW1lJywgZGF0YS5uYW1lKTtcbiAgICAgIHRoaXMuZ2V0KCdjb2x1bW5zJykucHVzaE9iamVjdChjb2x1bW4pO1xuXG4gICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgIHRoaXMuc2V0KCdwYXJlbnRWaWV3LmNvbHVtbnMnLCBoZWFkZXJDb2x1bW5zLndpdGhvdXQoY29sdW1uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXQoJ292ZXInLCBmYWxzZSk7XG4gIH0sXG5cbiAgZHJhZ0VudGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgfSxcblxuICBkcmFnTGVhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVRhYmxlQmluQ29tcG9uZW50O1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMSwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBzZWxmPXRoaXM7XG5cbmZ1bmN0aW9uIHByb2dyYW0xKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICA8bGk+XCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnNbJ2RhdGEtdGFibGUtY29sdW1uJ10gfHwgKGRlcHRoMCAmJiBkZXB0aDBbJ2RhdGEtdGFibGUtY29sdW1uJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb250ZW50JzogKFwiXCIpXG4gIH0saGFzaFR5cGVzOnsnY29udGVudCc6IFwiSURcIn0saGFzaENvbnRleHRzOnsnY29udGVudCc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJkYXRhLXRhYmxlLWNvbHVtblwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIjwvbGk+XFxuICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cblxuZnVuY3Rpb24gcHJvZ3JhbTMoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIFxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgIDxsaT48c3BhbiBjbGFzcz1cXFwidGV4dC1tdXRlZFxcXCI+Tm8gYXR0cmlidXRlcyBhdmFpbGFibGUuPC9zcGFuPjwvbGk+XFxuICBcIik7XG4gIH1cblxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPHVsIGNsYXNzPVxcXCJ3ZWxsIHdlbGwtc20gbGlzdC11bnN0eWxlZCBsaXN0LWlubGluZVxcXCI+XFxuICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgXCJjb2x1bW5zXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLnByb2dyYW0oMywgcHJvZ3JhbTMsIGRhdGEpLGZuOnNlbGYucHJvZ3JhbSgxLCBwcm9ncmFtMSwgZGF0YSksY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG48L3VsPlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsIkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlLWNvbHVtbiddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUNvbHVtbkNvbXBvbmVudCA9IEVtYmVyLkNvbXBvbmVudC5leHRlbmQoe1xuICBjbGFzc05hbWVzOiBbJ2xhYmVsJywgJ2xhYmVsLWRlZmF1bHQnXSxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnZGF0YVR5cGUnXSxcbiAgYXR0cmlidXRlQmluZGluZ3M6IFsnZHJhZ2dhYmxlJ10sXG4gIGRyYWdnYWJsZTogJ3RydWUnLFxuXG4gIGRhdGFUeXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICd0eXBlLScgKyB0aGlzLmdldCgnY29udGVudC5kYXRhVHlwZScpIHx8ICdkZWZhdWx0JztcbiAgfS5wcm9wZXJ0eSgnY29udGVudC5kYXRhVHlwZScpLFxuXG4gIGRyYWdTdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBpZDogdGhpcy5nZXQoJ2VsZW1lbnRJZCcpLFxuICAgICAgbmFtZTogdGhpcy5nZXQoJ2NvbnRlbnQubmFtZScpXG4gICAgfTtcblxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVDb2x1bW5Db21wb25lbnQ7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuXG5cbiAgc3RhY2sxID0gaGVscGVycy5fdHJpYWdlTXVzdGFjaGUuY2FsbChkZXB0aDAsIFwiY29udGVudC5uYW1lXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJ2YXIgRGF0YVRhYmxlSGVhZGVyVmlldyA9IHJlcXVpcmUoJy4vaGVhZGVyJyk7XG5FbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZSddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUNvbXBvbmVudCA9IEVtYmVyLkNvbXBvbmVudC5leHRlbmQoe1xuICBjb2x1bW5zOiBFbWJlci5BKCksXG4gIGRhdGFzZXQ6IEVtYmVyLkEoKSxcbiAgbGltaXQ6IG51bGwsXG4gIGRhdGFUYWJsZUhlYWRlcjogRGF0YVRhYmxlSGVhZGVyVmlldyxcblxuICBzZWxlY3RlZFJvd3M6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGF0YSA9IHRoaXMuZ2V0KCdkYXRhJyk7XG5cbiAgICByZXR1cm4gZGF0YS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtLmdldCgnc2VsZWN0ZWQnKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9KTtcbiAgfS5wcm9wZXJ0eSgnZGF0YS5AZWFjaC5zZWxlY3RlZCcpLFxuXG4gIHNlbGVjdGVkQ2hhbmdlZDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxlY3RlZCA9IHRoaXMuZ2V0KCdzZWxlY3RlZFJvd3MnKTtcblxuICAgIHRoaXMuc2VuZEFjdGlvbignYWN0aW9uJywgc2VsZWN0ZWQpO1xuICB9Lm9ic2VydmVzKCdzZWxlY3RlZFJvd3MuQGVhY2gubW9kZWwuc2VsZWN0ZWQnKSxcblxuICBzZWxlY3RhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZ2V0KCdhY3Rpb24nKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBmYWxzZTtcbiAgfS5wcm9wZXJ0eSgpLFxuXG4gIHR5cGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCdkYXRhc2V0JykucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgY3VycmVudCkge1xuICAgICAgaWYgKCFwcmV2aW91cy5maW5kQnkoJ3R5cGUnLCBjdXJyZW50LmNvbnN0cnVjdG9yLnR5cGVLZXkpKSB7XG4gICAgICAgIHByZXZpb3VzLnB1c2hPYmplY3QoRW1iZXIuT2JqZWN0LmNyZWF0ZSh7XG4gICAgICAgICAgdHlwZTogY3VycmVudC5jb25zdHJ1Y3Rvci50eXBlS2V5LFxuICAgICAgICAgIGtleXM6IEVtYmVyLmtleXMoY3VycmVudC50b0pTT04oKSlcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgfSwgW10pO1xuICB9LnByb3BlcnR5KCdkYXRhc2V0JyksXG5cbiAgYXZhaWxhYmxlQ29sdW1uczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBkYXRhc2V0ID0gdGhpcy5nZXQoJ2RhdGFzZXQnKTtcbiAgICB2YXIgYWxpYXNlcyA9IHRoaXMuZ2V0KCdjb2x1bW5BbGlhc2VzJyk7XG4gICAgcmV0dXJuIGFsaWFzZXMgJiYgIUVtYmVyLmlzRW1wdHkoYWxpYXNlcykgPyBhbGlhc2VzIDogdGhpcy5nZW5lcmF0ZUNvbHVtbnMoZGF0YXNldCk7XG4gIH0ucHJvcGVydHkoKSxcblxuICBjb2x1bW5zTm90SW5IZWFkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXZhaWxhYmxlID0gdGhpcy5nZXQoJ2F2YWlsYWJsZUNvbHVtbnMnKTtcbiAgICB2YXIgZGlzcGxheWVkID0gdGhpcy5nZXQoJ2NvbHVtbnMnKTtcblxuICAgIHJldHVybiBhdmFpbGFibGUucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgaXRlbSkge1xuICAgICAgaWYgKCFkaXNwbGF5ZWQuZmluZEJ5KCduYW1lJywgaXRlbS5uYW1lKSkge1xuICAgICAgICBwcmV2aW91cy5wdXNoT2JqZWN0KGl0ZW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgfSwgW10pO1xuICB9LnByb3BlcnR5KCdhdmFpbGFibGVDb2x1bW5zJywgJ2NvbHVtbnMnKSxcblxuICBwcmVQb3B1bGF0ZUNvbHVtbnM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZWN0YWJsZSA9IHRoaXMuZ2V0KCdzZWxlY3RhYmxlJyk7XG4gICAgdmFyIGRlZmF1bHRDb2x1bW5zID0gdGhpcy5nZXQoJ2RlZmF1bHRDb2x1bW5zJyk7XG4gICAgdmFyIGF2YWlsYWJsZUNvbHVtbnMgPSB0aGlzLmdldCgnYXZhaWxhYmxlQ29sdW1ucycpO1xuICAgIHZhciBmaWx0ZXJlZCA9IGF2YWlsYWJsZUNvbHVtbnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdENvbHVtbnMuY29udGFpbnMoaXRlbS5nZXQoJ25hbWUnKSk7XG4gICAgfSk7XG5cbiAgICBpZiAoc2VsZWN0YWJsZSkge1xuICAgICAgZmlsdGVyZWQudW5zaGlmdChudWxsKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldCgnY29sdW1ucycsIGZpbHRlcmVkKTtcbiAgfS5vbignaW5pdCcpLFxuXG4gIGRhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGF0YXNldCA9IHRoaXMuZ2V0KCdkYXRhc2V0Jyk7XG4gICAgdmFyIGNvbHVtbnMgPSB0aGlzLmdldCgnY29sdW1ucycpO1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGRhdGFzZXQgPSBFbWJlci5pc0FycmF5KGRhdGFzZXQpID8gZGF0YXNldCA6IGRhdGFzZXQuZ2V0KCdjb250ZW50Jyk7XG5cbiAgICBpZiAoIUVtYmVyLmlzQXJyYXkoZGF0YXNldCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YXNldCBpbnB1dCBtdXN0IGJlIGFuIGFycmF5LicpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhc2V0Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIHR5cGUgPSBpdGVtLmNvbnN0cnVjdG9yLnR5cGVLZXk7XG5cbiAgICAgIGlmIChjb2x1bW5zKSB7XG4gICAgICAgIHJldHVybiBFbWJlci5PYmplY3QuY3JlYXRlKHtcbiAgICAgICAgICByb3c6IHNlbGYuY29sdW1uQXR0cmlidXRlTWFwKGNvbHVtbnMsIGl0ZW0sIHR5cGUpLFxuICAgICAgICAgIG1vZGVsOiBpdGVtLFxuICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgLy8gUmVtb3ZlIGlmXG4gICAgICB2YXIgcm93ID0gaXRlbS5nZXQoJ3JvdycpO1xuICAgICAgdmFyIGFsbEVtcHR5ID0gcm93LmV2ZXJ5KGZ1bmN0aW9uIChjb2wpIHtcbiAgICAgICAgcmV0dXJuIEVtYmVyLmlzRW1wdHkoY29sKVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChhbGxFbXB0eSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICFyb3cuaXNBbnkoJ0B0aGlzJywgJycpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LnByb3BlcnR5KCdkYXRhc2V0JywgJ2NvbHVtbnMubGVuZ3RoJyksXG5cbiAgY29sdW1uQXR0cmlidXRlTWFwOiBmdW5jdGlvbiAoY29sdW1ucywgcm93LCB0eXBlKSB7XG4gICAgaWYgKCFyb3cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICByb3dKc29uID0gcm93LnRvSlNPTigpLFxuICAgICAgcm93S2V5cyA9IEVtYmVyLmtleXMocm93SnNvbiksXG4gICAgICBjb2wgPSAwLFxuICAgICAgY29sdW1uc0FkZGVkID0gW10sXG4gICAgICBoZWFkZXIsIHByb3AsIGF0dHI7XG5cbiAgICBmb3IgKDsgY29sIDwgY29sdW1ucy5sZW5ndGg7IGNvbCsrKSB7XG4gICAgICBoZWFkZXIgPSBjb2x1bW5zLm9iamVjdEF0KGNvbCk7XG5cbiAgICAgIGlmICghaGVhZGVyKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgXG4gICAgICBoZWFkZXIuZ2V0KCdhdHRyaWJ1dGVzJykuZm9yRWFjaChmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICB2YXIgc3BsaXQgPSBhdHRyLnNwbGl0KCc6Jyk7XG4gICAgICAgIHByb3AgPSBzcGxpdFsxXTtcbiAgICAgICAgaWYgKHJvd0pzb24uaGFzT3duUHJvcGVydHkocHJvcCkgJiYgIWNvbHVtbnNBZGRlZC5jb250YWlucyhwcm9wKSkge1xuICAgICAgICAgIGNvbHVtbnNBZGRlZC5wdXNoKHByb3ApO1xuICAgICAgICAgIHJlc3VsdC5zcGxpY2UoY29sLCAwLCByb3dKc29uW3Byb3BdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghY29sdW1uc0FkZGVkLmNvbnRhaW5zKHByb3ApKSB7XG4gICAgICAgICAgcmVzdWx0LnNwbGljZShjb2wsIDAsICcnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBnZW5lcmF0ZUNvbHVtbnM6IGZ1bmN0aW9uIChkYXRhc2V0KSB7XG4gICAgdmFyIHR5cGVzID0gdGhpcy5nZXQoJ3R5cGVzJyk7XG5cbiAgICBpZiAodHlwZXMpIHtcbiAgICAgIHJldHVybiB0eXBlcy5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzLCBjdXJyZW50LCBpbmRleCwgYXJyKSB7XG4gICAgICAgIHZhciB0eXBlID0gY3VycmVudC5nZXQoJ3R5cGUnKTtcblxuICAgICAgICBjdXJyZW50LmdldCgna2V5cycpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IGl0ZW0uY2FwaXRhbGl6ZSgpO1xuICAgICAgICAgIHZhciBjb2x1bW4gPSBwcmV2aW91cy5maW5kQnkoJ25hbWUnLCBuYW1lKTtcbiAgICAgICAgICB2YXIgYXR0cmlidXRlID0gdHlwZSArICc6JyArIGl0ZW07XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgICAgY29sdW1uLmdldCgnYXR0cmlidXRlcycpLnB1c2hPYmplY3QoYXR0cmlidXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcmV2aW91cy5wdXNoT2JqZWN0KEVtYmVyLk9iamVjdC5jcmVhdGUoe1xuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbYXR0cmlidXRlXSxcbiAgICAgICAgICAgICAgZGF0YVR5cGU6IHR5cGVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICAgIH0sIFtdKTtcbiAgICB9XG4gIH0sXG5cbiAgYWN0aW9uczoge1xuICAgIGNsZWFyU2VsZWN0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93ICdOb3QgWWV0IEltcGxlbWVudGVkJztcbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFUYWJsZUNvbXBvbmVudDtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBjb21waWxlciA9IEVtYmVyLkhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIGFub255bW91cyhIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbnRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBFbWJlci5IYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazEsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbiwgc2VsZj10aGlzO1xuXG5mdW5jdGlvbiBwcm9ncmFtMShkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBoZWxwZXIsIG9wdGlvbnM7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gIFwiKTtcbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzWydkYXRhLXRhYmxlLWNvbHVtbiddIHx8IChkZXB0aDAgJiYgZGVwdGgwWydkYXRhLXRhYmxlLWNvbHVtbiddKSxvcHRpb25zPXtoYXNoOntcbiAgICAnY29udGVudCc6IChcInZpZXcuY29udGVudFwiKVxuICB9LGhhc2hUeXBlczp7J2NvbnRlbnQnOiBcIklEXCJ9LGhhc2hDb250ZXh0czp7J2NvbnRlbnQnOiBkZXB0aDB9LGNvbnRleHRzOltdLHR5cGVzOltdLGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiZGF0YS10YWJsZS1jb2x1bW5cIiwgb3B0aW9ucykpKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cblxuICBzdGFjazEgPSBoZWxwZXJzWydpZiddLmNhbGwoZGVwdGgwLCBcInZpZXcuY29udGVudFwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5ub29wLGZuOnNlbGYucHJvZ3JhbSgxLCBwcm9ncmFtMSwgZGF0YSksY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJFbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZS9jb2xsZWN0aW9uLWl0ZW0nXSA9IHJlcXVpcmUoJy4vY29sbGVjdGlvbi1pdGVtLmhicycpO1xuXG52YXIgQ29sbGVjdGlvbkl0ZW1WaWV3ID0gRW1iZXIuVmlldy5leHRlbmQoe1xuICBlbGVtZW50SWQ6IEVtYmVyLmNvbXB1dGVkLmFsaWFzKCduYW1lJyksXG4gIHRlbXBsYXRlTmFtZTogJ2NvbXBvbmVudHMvZGF0YS10YWJsZS9jb2xsZWN0aW9uLWl0ZW0nLFxuICBjbGFzc05hbWVCaW5kaW5nczogWydkcm9wU2lkZScsICdjb2x1bW5UeXBlJ10sXG4gIHRhZ05hbWU6ICd0aCcsXG4gIGRyb3BTaWRlOiBudWxsLFxuICB0YXJnZXQ6IEVtYmVyLmNvbXB1dGVkLmFsaWFzKCdwYXJlbnRWaWV3JyksXG5cbiAgY29sdW1uVHlwZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb250ZW50ID0gdGhpcy5nZXQoJ2NvbnRlbnQubmFtZScpO1xuICAgIHZhciBwb3N0Zml4ID0gJy1jb2x1bW4nO1xuICAgIHJldHVybiBjb250ZW50ID8gKGNvbnRlbnQgKyBwb3N0Zml4KS50b0xvd2VyQ2FzZSgpIDogJ3NlbGVjdGFibGUnICsgcG9zdGZpeDtcbiAgfS5wcm9wZXJ0eSgnY29udGVudCcpLFxuXG4gIGRyYWdPdmVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuZ2V0KCdjb250ZW50JykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBFbWJlci5ydW4udGhyb3R0bGUodGhpcywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQub2Zmc2V0WCA+ICh0aGlzLiQoKS53aWR0aCgpIC8gMikpIHtcbiAgICAgICAgdGhpcy5zZXQoJ2Ryb3BTaWRlJywgJ3JpZ2h0Jyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXQoJ2Ryb3BTaWRlJywgJ2xlZnQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXQoJ3BhcmVudFZpZXcub3ZlcicsIHRydWUpO1xuICAgIH0sIDMwMCk7XG4gIH0sXG5cbiAgZHJhZ0xlYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXQoJ2Ryb3BTaWRlJywgbnVsbCk7XG4gICAgdGhpcy5zZXQoJ3BhcmVudFZpZXcub3ZlcicsIGZhbHNlKTtcbiAgfSxcblxuICBkcm9wOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmdldCgnY29udGVudCcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNpZGVEcm9wcGVkID0gdGhpcy5nZXQoJ2Ryb3BTaWRlJyk7XG4gICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJykpO1xuICAgIHZhciBjb2x1bW4gPSB0aGlzLmdldCgncGFyZW50Vmlldy5wYXJlbnRWaWV3LmF2YWlsYWJsZUNvbHVtbnMnKS5maW5kQnkoJ25hbWUnLCBkYXRhLm5hbWUpO1xuXG4gICAgaWYgKHNpZGVEcm9wcGVkID09PSAnbGVmdCcpIHtcbiAgICAgIHRoaXMuc2VuZCgnaW5zZXJ0QmVmb3JlJywgdGhpcy5nZXQoJ2NvbnRlbnQnKSwgY29sdW1uKTsgICBcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnNlbmQoJ2luc2VydEFmdGVyJywgdGhpcy5nZXQoJ2NvbnRlbnQnKSwgY29sdW1uKTsgICBcbiAgICB9XG5cbiAgICB0aGlzLnNldCgnZHJvcFNpZGUnLCBudWxsKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvbkl0ZW1WaWV3O1xuIiwidmFyIENvbGxlY3Rpb25JdGVtVmlldyA9IHJlcXVpcmUoJy4vY29sbGVjdGlvbi1pdGVtJyk7XG5FbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZS9oZWFkZXInXSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUuaGJzJyk7XG5cbnZhciBEYXRhVGFibGVIZWFkZXJDb2xsZWN0aW9uID0gRW1iZXIuQ29sbGVjdGlvblZpZXcuZXh0ZW5kKHtcbiAgdGFnTmFtZTogJ3RyJyxcbiAgdGVtcGxhdGVOYW1lOiAnY29tcG9uZW50cy9kYXRhLXRhYmxlL2hlYWRlcicsXG4gIGNvbnRlbnQ6IEVtYmVyLmNvbXB1dGVkLmFsaWFzKCdwYXJlbnRWaWV3LmNvbHVtbnMnKSxcbiAgbGltaXQ6IEVtYmVyLmNvbXB1dGVkLmFsaWFzKCdwYXJlbnRWaWV3LmxpbWl0JyksXG4gIGNsYXNzTmFtZUJpbmRpbmdzOiBbJ292ZXInXSxcbiAgY29sdW1uc05vdEluSGVhZGVyOiBFbWJlci5jb21wdXRlZC5hbGlhcygncGFyZW50Vmlldy5iaW5Db21wb25lbnQuY29sdW1ucycpLFxuICBpdGVtVmlld0NsYXNzOiBDb2xsZWN0aW9uSXRlbVZpZXcsXG5cbiAgZHJhZ092ZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG5cbiAgZHJhZ0VudGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIHRydWUpO1xuICB9LFxuXG4gIGRyYWdMZWF2ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0KCdvdmVyJywgZmFsc2UpO1xuICB9LFxuXG4gIGRyb3A6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfSxcblxuICBpbnNlcnRBdDogZnVuY3Rpb24gKGV4aXN0aW5nLCBkcm9wcGVkLCBhZGQpIHtcbiAgICB2YXIgY29sdW1ucyA9IHRoaXMuZ2V0KCdjb250ZW50Jyk7XG4gICAgdmFyIGNvbHVtbnNOb3RJbkhlYWRlciA9IHRoaXMuZ2V0KCdjb2x1bW5zTm90SW5IZWFkZXInKTtcbiAgICB2YXIgZXhpc3RpbmdJbmRleCA9IGNvbHVtbnMuaW5kZXhPZihleGlzdGluZyk7XG4gICAgdmFyIGR1cGxpY2F0ZSA9IGNvbHVtbnMuZmluZEJ5KCduYW1lJywgZHJvcHBlZC5nZXQoJ25hbWUnKSk7XG4gICAgdmFyIHRvdGFsID0gdGhpcy5nZXQoJ2NvbnRlbnQubGVuZ3RoJyk7XG4gICAgdmFyIGxpbWl0ID0gdGhpcy5nZXQoJ2xpbWl0Jyk7XG4gICAgdmFyIG1vZGlmZWRJbmRleDtcbiAgICB2YXIgZHVwSW5kZXg7XG5cbiAgICBpZiAoZXhpc3RpbmcuZ2V0KCduYW1lJykgPT09IGRyb3BwZWQuZ2V0KCduYW1lJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBtb2RpZmllZEluZGV4ID0gZXhpc3RpbmdJbmRleCArIGFkZDtcbiAgICB9XG5cbiAgICBpZiAoY29sdW1ucykge1xuICAgICAgLy8gbW92ZSBjb2x1bW4gdG8gbmV3IGluZGV4XG4gICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgIGR1cEluZGV4ID0gY29sdW1ucy5pbmRleE9mKGR1cGxpY2F0ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZHVwSW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgY29sdW1ucy5hcnJheUNvbnRlbnRXaWxsQ2hhbmdlKGR1cEluZGV4LCAxLCAwKTtcbiAgICAgICAgICBjb2x1bW5zLnNwbGljZShkdXBJbmRleCwgMSk7XG4gICAgICAgICAgdGhpcy5zZXQoJ2NvbnRlbnQnLCBjb2x1bW5zKTtcbiAgICAgICAgICBjb2x1bW5zLmFycmF5Q29udGVudERpZENoYW5nZShkdXBJbmRleCwgMSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGxpbWl0ICYmIHRvdGFsID09PSBsaW1pdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIEFkZCB0byBlbmQsIGluc3RlYWQgb2Ygc3BsaWNpbmdcbiAgICAgIGlmIChtb2RpZmllZEluZGV4ID4gY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgY29sdW1ucy5wdXNoT2JqZWN0KGRyb3BwZWQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbHVtbnMuYXJyYXlDb250ZW50V2lsbENoYW5nZShtb2RpZmllZEluZGV4LCAwLCAxKTtcbiAgICAgICAgY29sdW1ucy5zcGxpY2UobW9kaWZpZWRJbmRleCwgMCwgZHJvcHBlZCk7XG4gICAgICAgIHRoaXMuc2V0KCdjb250ZW50JywgY29sdW1ucyk7XG4gICAgICAgIGNvbHVtbnMuYXJyYXlDb250ZW50RGlkQ2hhbmdlKG1vZGlmaWVkSW5kZXgsIDAsIDEpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHJvcHBlZCkge1xuICAgICAgICB0aGlzLnNldCgnY29sdW1uc05vdEluSGVhZGVyJywgY29sdW1uc05vdEluSGVhZGVyLndpdGhvdXQoZHJvcHBlZCkpO1xuICAgICAgfVxuICAgIH0gXG4gIH0sXG5cbiAgYWN0aW9uczoge1xuICAgIGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGV4aXN0aW5nLCBkcm9wcGVkKSB7XG4gICAgICB0aGlzLmluc2VydEF0KGV4aXN0aW5nLCBkcm9wcGVkLCAwKTsgIFxuICAgIH0sXG5cbiAgICBpbnNlcnRBZnRlcjogZnVuY3Rpb24gKGV4aXN0aW5nLCBkcm9wcGVkKSB7XG4gICAgICB0aGlzLmluc2VydEF0KGV4aXN0aW5nLCBkcm9wcGVkLCAxKTsgIFxuICAgIH1cbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVRhYmxlSGVhZGVyQ29sbGVjdGlvbjtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBjb21waWxlciA9IEVtYmVyLkhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIGFub255bW91cyhIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbnRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBFbWJlci5IYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9ICcnO1xuXG5cbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBjb21waWxlciA9IEVtYmVyLkhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIGFub255bW91cyhIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbnRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBFbWJlci5IYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazEsIGhlbHBlciwgb3B0aW9ucywgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBzZWxmPXRoaXM7XG5cbmZ1bmN0aW9uIHByb2dyYW0xKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICAgIDx0cj5cXG4gICAgICAgIFwiKTtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgXCJzZWxlY3RhYmxlXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDIsIHByb2dyYW0yLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcblxcbiAgICAgICAgXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAsIFwiaXRlbS5yb3dcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oNCwgcHJvZ3JhbTQsIGRhdGEpLGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgICAgPC90cj5cXG4gICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5mdW5jdGlvbiBwcm9ncmFtMihkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBoZWxwZXIsIG9wdGlvbnM7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICAgICAgPHRkPlwiKTtcbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzLmlucHV0IHx8IChkZXB0aDAgJiYgZGVwdGgwLmlucHV0KSxvcHRpb25zPXtoYXNoOntcbiAgICAndHlwZSc6IChcImNoZWNrYm94XCIpLFxuICAgICdjaGVja2VkJzogKFwiaXRlbS5zZWxlY3RlZFwiKVxuICB9LGhhc2hUeXBlczp7J3R5cGUnOiBcIlNUUklOR1wiLCdjaGVja2VkJzogXCJJRFwifSxoYXNoQ29udGV4dHM6eyd0eXBlJzogZGVwdGgwLCdjaGVja2VkJzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImlucHV0XCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPC90ZD5cXG4gICAgICAgICAgXCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oaGVscGVycy5sb2cuY2FsbChkZXB0aDAsIFwiaXRlbS5tb2RlbFwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICAgIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG5mdW5jdGlvbiBwcm9ncmFtNChkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazE7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICAgICAgPHRkPlwiKTtcbiAgc3RhY2sxID0gaGVscGVycy5fdHJpYWdlTXVzdGFjaGUuY2FsbChkZXB0aDAsIFwiXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCI8L3RkPlxcbiAgICAgICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzWydkYXRhLXRhYmxlLWJpbiddIHx8IChkZXB0aDAgJiYgZGVwdGgwWydkYXRhLXRhYmxlLWJpbiddKSxvcHRpb25zPXtoYXNoOntcbiAgICAnY29sdW1ucyc6IChcImNvbHVtbnNOb3RJbkhlYWRlclwiKSxcbiAgICAndmlld05hbWUnOiAoXCJiaW5Db21wb25lbnRcIilcbiAgfSxoYXNoVHlwZXM6eydjb2x1bW5zJzogXCJJRFwiLCd2aWV3TmFtZSc6IFwiU1RSSU5HXCJ9LGhhc2hDb250ZXh0czp7J2NvbHVtbnMnOiBkZXB0aDAsJ3ZpZXdOYW1lJzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImRhdGEtdGFibGUtYmluXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuPHRhYmxlIGNsYXNzPVxcXCJ0YWJsZSB0YWJsZS1yZXNwb25zaXZlIHRhYmxlLWhvdmVyIHRhYmxlLWNvbmRlbnNlZFxcXCI+XFxuICA8dGhlYWQ+XFxuICAgIFwiKTtcbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKGhlbHBlcnMudmlldy5jYWxsKGRlcHRoMCwgXCJkYXRhVGFibGVIZWFkZXJcIiwge2hhc2g6e1xuICAgICd2aWV3TmFtZSc6IChcImNvbHVtbkNvbGxlY3Rpb25cIilcbiAgfSxoYXNoVHlwZXM6eyd2aWV3TmFtZSc6IFwiU1RSSU5HXCJ9LGhhc2hDb250ZXh0czp7J3ZpZXdOYW1lJzogZGVwdGgwfSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICA8L3RoZWFkPlxcbiAgPHRib2R5PlxcbiAgICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgXCJpdGVtXCIsIFwiaW5cIiwgXCJkYXRhXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwLGRlcHRoMCxkZXB0aDBdLHR5cGVzOltcIklEXCIsXCJJRFwiLFwiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gIDwvdGJvZHk+XFxuPC90YWJsZT5cXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJ2YXIgRGF0YVRhYmxlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9kYXRhLXRhYmxlL2NvbXBvbmVudCcpO1xudmFyIERhdGFUYWJsZUJpbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vZGF0YS10YWJsZS1iaW4vY29tcG9uZW50Jyk7XG52YXIgRGF0YVRhYmxlQ29sdW1uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9kYXRhLXRhYmxlLWNvbHVtbi9jb21wb25lbnQnKTtcblxuRW1iZXIuQXBwbGljYXRpb24uaW5pdGlhbGl6ZXIoe1xuICBuYW1lOiAnZGF0YS10YWJsZScsXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oY29udGFpbmVyLCBhcHBsaWNhdGlvbikge1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcignY29tcG9uZW50OmRhdGEtdGFibGUnLCBEYXRhVGFibGVDb21wb25lbnQsIHtzaW5nbGV0b246IGZhbHNlIH0pO1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcignY29tcG9uZW50OmRhdGEtdGFibGUtYmluJywgRGF0YVRhYmxlQmluQ29tcG9uZW50LCB7c2luZ2xldG9uOiBmYWxzZSB9KTtcbiAgICBjb250YWluZXIucmVnaXN0ZXIoJ2NvbXBvbmVudDpkYXRhLXRhYmxlLWNvbHVtbicsIERhdGFUYWJsZUNvbHVtbkNvbXBvbmVudCwge3NpbmdsZXRvbjogZmFsc2UgfSk7XG4gIH1cbn0pO1xuIl19
