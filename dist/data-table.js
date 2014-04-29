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

      if (column) {
        this.get('columns').pushObject(column);
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
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers['if'].call(depth0, "columnsComposable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n      <li>");
  data.buffer.push(escapeExpression((helper = helpers['data-table-composable-column'] || (depth0 && depth0['data-table-composable-column']),options={hash:{
    'content': ("column")
  },hashTypes:{'content': "ID"},hashContexts:{'content': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "data-table-composable-column", options))));
  data.buffer.push("</li>\n    ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push(" \n      <li>");
  data.buffer.push(escapeExpression((helper = helpers['data-table-column'] || (depth0 && depth0['data-table-column']),options={hash:{
    'content': ("column"),
    'class': ("btn btn-xs btn-default")
  },hashTypes:{'content': "ID",'class': "STRING"},hashContexts:{'content': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "data-table-column", options))));
  data.buffer.push("</li>\n    ");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\n    <li><span class=\"text-muted\">No attributes available.</span></li>\n  ");
  }

  data.buffer.push("<ul class=\"well well-sm list-unstyled list-inline\">\n  ");
  stack1 = helpers.each.call(depth0, "column", "in", "columns", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});

},{}],3:[function(require,module,exports){
Ember.TEMPLATES['components/data-table-column'] = require('./template.hbs');

var DataTableColumnComponent = Ember.Component.extend({
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
  data.buffer.push(" \n");
  return buffer;
  
});

},{}],5:[function(require,module,exports){
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

},{"../data-table-column/component":3,"./name":6,"./template.hbs":8}],6:[function(require,module,exports){
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

},{"./template.hbs":7}],7:[function(require,module,exports){
// hbsfy compiled Handlebars template
var compiler = Ember.Handlebars;
module.exports = compiler.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "view.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

},{}],8:[function(require,module,exports){
// hbsfy compiled Handlebars template
var compiler = Ember.Handlebars;
module.exports = compiler.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <li><a href=\"#\">");
  stack1 = helpers._triageMustache.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a></li>\n  ");
  return buffer;
  }

  data.buffer.push(escapeExpression(helpers.view.call(depth0, "NameViewClass", {hash:{
    'name': ("content.name"),
    'viewName': ("nameView")
  },hashTypes:{'name': "ID",'viewName': "STRING"},hashContexts:{'name': depth0,'viewName': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n\n<button type=\"button\" class=\"btn btn-xs btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n  <span class=\"caret\"></span>\n  <span class=\"sr-only\">Toggle Dropdown</span>\n</button>\n\n<ul class=\"dropdown-menu\" role=\"menu\">\n  ");
  stack1 = helpers.each.call(depth0, "content.attributes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  <li class=\"divider\"></li>\n  <li><a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Edit Name</a></li>\n</ul>\n");
  return buffer;
  
});

},{}],9:[function(require,module,exports){
var DataTableHeaderView = require('./header');
Ember.TEMPLATES['components/data-table'] = require('./template.hbs');

var DataTableComponent = Ember.Component.extend({
  columns: Ember.A(),
  dataset: Ember.A(),
  columnsComposable: false,
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

},{"./header":12,"./template.hbs":14}],10:[function(require,module,exports){
// hbsfy compiled Handlebars template
var compiler = Ember.Handlebars;
module.exports = compiler.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  ");
  stack1 = helpers['if'].call(depth0, "view.parentView.columnsComposable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers['data-table-composable-column'] || (depth0 && depth0['data-table-composable-column']),options={hash:{
    'content': ("view.content")
  },hashTypes:{'content': "ID"},hashContexts:{'content': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "data-table-composable-column", options))));
  data.buffer.push("\n  ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers['data-table-column'] || (depth0 && depth0['data-table-column']),options={hash:{
    'content': ("view.content"),
    'class': ("btn btn-xs btn-default")
  },hashTypes:{'content': "ID",'class': "STRING"},hashContexts:{'content': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "data-table-column", options))));
  data.buffer.push("\n  ");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "view.content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

},{}],11:[function(require,module,exports){
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
    var rawData = event.dataTransfer.getData('application/json');

    if (rawData) {
      var data = JSON.parse(rawData);
      var column = this.get('parentView.parentView.availableColumns').findBy('name', data.name);

      if (sideDropped === 'left') {
        this.send('insertBefore', this.get('content'), column);   
      }
      else {
        this.send('insertAfter', this.get('content'), column);   
      }
    }

    this.set('dropSide', null);
  }
});

module.exports = CollectionItemView;

},{"./collection-item.hbs":10}],12:[function(require,module,exports){
var CollectionItemView = require('./collection-item');
Ember.TEMPLATES['components/data-table/header'] = require('./template.hbs');

var DataTableHeaderCollection = Ember.CollectionView.extend({
  tagName: 'tr',
  templateName: 'components/data-table/header',
  content: Ember.computed.alias('parentView.columns'),
  limit: Ember.computed.alias('parentView.limit'),
  classNameBindings: ['over'],
  columnsNotInHeader: Ember.computed.alias('parentView.binComponent.columns'),
  columnsComposable: Ember.computed.alias('parentView.columnsComposable'),
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

},{"./collection-item":11,"./template.hbs":13}],13:[function(require,module,exports){
// hbsfy compiled Handlebars template
var compiler = Ember.Handlebars;
module.exports = compiler.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

},{}],14:[function(require,module,exports){
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
    'viewName': ("binComponent"),
    'columnsComposable': ("columnsComposable")
  },hashTypes:{'columns': "ID",'viewName': "STRING",'columnsComposable': "ID"},hashContexts:{'columns': depth0,'viewName': depth0,'columnsComposable': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "data-table-bin", options))));
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

},{}],15:[function(require,module,exports){
var DataTableComponent = require('./data-table/component');
var DataTableBinComponent = require('./data-table-bin/component');
var DataTableColumnComponent = require('./data-table-column/component');
var DataTableComposableColumnComponent = require('./data-table-composable-column/component');

Ember.Application.initializer({
  name: 'data-table',

  initialize: function(container, application) {
    container.register('component:data-table', DataTableComponent, { singleton: false });
    container.register('component:data-table-bin', DataTableBinComponent, { singleton: false });
    container.register('component:data-table-column', DataTableColumnComponent, { singleton: false });
    container.register('component:data-table-composable-column', DataTableComposableColumnComponent, { singleton: false });
  }
});

},{"./data-table-bin/component":1,"./data-table-column/component":3,"./data-table-composable-column/component":5,"./data-table/component":9}]},{},[15])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1iaW4vY29tcG9uZW50LmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWJpbi90ZW1wbGF0ZS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUtY29sdW1uL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1jb2x1bW4vdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbi9uYW1lL2luZGV4LmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL25hbWUvdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL3RlbXBsYXRlLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9jb21wb25lbnQuanMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUvaGVhZGVyL2NvbGxlY3Rpb24taXRlbS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUvaGVhZGVyL2NvbGxlY3Rpb24taXRlbS5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvaW5kZXguanMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUvaGVhZGVyL3RlbXBsYXRlLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS90ZW1wbGF0ZS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2luaXRpYWxpemVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUtYmluJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgRGF0YVRhYmxlQmluQ29tcG9uZW50ID0gRW1iZXIuQ29tcG9uZW50LmV4dGVuZCh7XG4gIGNsYXNzTmFtZXM6IFsnaGVhZGVyLWl0ZW0tYmluJ10sXG4gIGNsYXNzTmFtZUJpbmRpbmdzOiBbJ292ZXInXSxcblxuICBkcmFnT3ZlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGRyb3A6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnYXBwbGljYXRpb24vanNvbicpKTtcbiAgICB2YXIgY29sdW1ucyA9IHRoaXMuZ2V0KCdjb2x1bW5zJyk7XG4gICAgdmFyIGhlYWRlckNvbHVtbnMgPSB0aGlzLmdldCgncGFyZW50Vmlldy5jb2x1bW5zJyk7XG4gICAgdmFyIGRlZmF1bHRDb2x1bW5zID0gdGhpcy5nZXQoJ3BhcmVudFZpZXcuZGVmYXVsdENvbHVtbnMnKTtcbiAgICB2YXIgY29sdW1uO1xuXG4gICAgaWYgKCFjb2x1bW5zLmZpbmRCeSgnbmFtZScsIGRhdGEubmFtZSkgJiYgaGVhZGVyQ29sdW1ucy53aXRob3V0KGhlYWRlckNvbHVtbnMuZmluZEJ5KCduYW1lJywgZGF0YS5uYW1lKSkuY29tcGFjdCgpLmxlbmd0aCA+PSAxKSB7XG4gICAgICBjb2x1bW4gPSB0aGlzLmdldCgncGFyZW50Vmlldy5hdmFpbGFibGVDb2x1bW5zJykuZmluZEJ5KCduYW1lJywgZGF0YS5uYW1lKTtcblxuICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICB0aGlzLmdldCgnY29sdW1ucycpLnB1c2hPYmplY3QoY29sdW1uKTtcbiAgICAgICAgdGhpcy5zZXQoJ3BhcmVudFZpZXcuY29sdW1ucycsIGhlYWRlckNvbHVtbnMud2l0aG91dChjb2x1bW4pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfSxcblxuICBkcmFnRW50ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIHRydWUpO1xuICB9LFxuXG4gIGRyYWdMZWF2ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0KCdvdmVyJywgZmFsc2UpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVCaW5Db21wb25lbnQ7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIHNlbGY9dGhpcztcblxuZnVuY3Rpb24gcHJvZ3JhbTEoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgIFwiKTtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgXCJjb2x1bW5zQ29tcG9zYWJsZVwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5wcm9ncmFtKDQsIHByb2dyYW00LCBkYXRhKSxmbjpzZWxmLnByb2dyYW0oMiwgcHJvZ3JhbTIsIGRhdGEpLGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cbmZ1bmN0aW9uIHByb2dyYW0yKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICAgIDxsaT5cIik7XG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVyc1snZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbiddIHx8IChkZXB0aDAgJiYgZGVwdGgwWydkYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb250ZW50JzogKFwiY29sdW1uXCIpXG4gIH0saGFzaFR5cGVzOnsnY29udGVudCc6IFwiSURcIn0saGFzaENvbnRleHRzOnsnY29udGVudCc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJkYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPC9saT5cXG4gICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbmZ1bmN0aW9uIHByb2dyYW00KGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIiBcXG4gICAgICA8bGk+XCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnNbJ2RhdGEtdGFibGUtY29sdW1uJ10gfHwgKGRlcHRoMCAmJiBkZXB0aDBbJ2RhdGEtdGFibGUtY29sdW1uJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb250ZW50JzogKFwiY29sdW1uXCIpLFxuICAgICdjbGFzcyc6IChcImJ0biBidG4teHMgYnRuLWRlZmF1bHRcIilcbiAgfSxoYXNoVHlwZXM6eydjb250ZW50JzogXCJJRFwiLCdjbGFzcyc6IFwiU1RSSU5HXCJ9LGhhc2hDb250ZXh0czp7J2NvbnRlbnQnOiBkZXB0aDAsJ2NsYXNzJzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImRhdGEtdGFibGUtY29sdW1uXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPC9saT5cXG4gICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbmZ1bmN0aW9uIHByb2dyYW02KGRlcHRoMCxkYXRhKSB7XG4gIFxuICBcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICA8bGk+PHNwYW4gY2xhc3M9XFxcInRleHQtbXV0ZWRcXFwiPk5vIGF0dHJpYnV0ZXMgYXZhaWxhYmxlLjwvc3Bhbj48L2xpPlxcbiAgXCIpO1xuICB9XG5cbiAgZGF0YS5idWZmZXIucHVzaChcIjx1bCBjbGFzcz1cXFwid2VsbCB3ZWxsLXNtIGxpc3QtdW5zdHlsZWQgbGlzdC1pbmxpbmVcXFwiPlxcbiAgXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAsIFwiY29sdW1uXCIsIFwiaW5cIiwgXCJjb2x1bW5zXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLnByb2dyYW0oNiwgcHJvZ3JhbTYsIGRhdGEpLGZuOnNlbGYucHJvZ3JhbSgxLCBwcm9ncmFtMSwgZGF0YSksY29udGV4dHM6W2RlcHRoMCxkZXB0aDAsZGVwdGgwXSx0eXBlczpbXCJJRFwiLFwiSURcIixcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuPC91bD5cXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJFbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZS1jb2x1bW4nXSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUuaGJzJyk7XG5cbnZhciBEYXRhVGFibGVDb2x1bW5Db21wb25lbnQgPSBFbWJlci5Db21wb25lbnQuZXh0ZW5kKHtcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnZGF0YVR5cGUnXSxcbiAgYXR0cmlidXRlQmluZGluZ3M6IFsnZHJhZ2dhYmxlJ10sXG4gIGRyYWdnYWJsZTogJ3RydWUnLFxuXG4gIGRhdGFUeXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICd0eXBlLScgKyB0aGlzLmdldCgnY29udGVudC5kYXRhVHlwZScpIHx8ICdkZWZhdWx0JztcbiAgfS5wcm9wZXJ0eSgnY29udGVudC5kYXRhVHlwZScpLFxuXG4gIGRyYWdTdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBpZDogdGhpcy5nZXQoJ2VsZW1lbnRJZCcpLFxuICAgICAgbmFtZTogdGhpcy5nZXQoJ2NvbnRlbnQubmFtZScpXG4gICAgfTtcblxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVDb2x1bW5Db21wb25lbnQ7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuXG5cbiAgc3RhY2sxID0gaGVscGVycy5fdHJpYWdlTXVzdGFjaGUuY2FsbChkZXB0aDAsIFwiY29udGVudC5uYW1lXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCIgXFxuXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICBcbn0pO1xuIiwidmFyIE5hbWVWaWV3ID0gcmVxdWlyZSgnLi9uYW1lJyk7XG52YXIgQ29sdW1uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vZGF0YS10YWJsZS1jb2x1bW4vY29tcG9uZW50Jyk7XG5FbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbiddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUNvbXBvc2FibGVDb2x1bW5Db21wb25lbnQgPSBDb2x1bW5Db21wb25lbnQuZXh0ZW5kKHtcbiAgY2xhc3NOYW1lczogWydidG4tZ3JvdXAnXSxcbiAgTmFtZVZpZXdDbGFzczogTmFtZVZpZXcsXG5cbiAgZm9jdXNPdXQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciAkbmFtZSA9IEVtYmVyLiQoZXZlbnQudGFyZ2V0KTtcbiAgICBpZiAoJG5hbWUuaGFzQ2xhc3MoJ25hbWUnKSkge1xuICAgICAgdGhpcy5zZXQoJ2NvbnRlbnQubmFtZScsICRuYW1lLnRleHQoKSk7IFxuICAgICAgJG5hbWUuYXR0cignY29udGVudGVkaXRhYmxlJywgZmFsc2UpO1xuICAgIH1cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGRyYWdTdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBpZDogdGhpcy5nZXQoJ2VsZW1lbnRJZCcpLFxuICAgICAgbmFtZTogdGhpcy5nZXQoJ2NvbnRlbnQubmFtZScpLFxuICAgICAgYXR0cmlidXRlczogdGhpcy5nZXQoJ2NvbnRlbnQuYXR0cmlidXRlcycpXG4gICAgfTtcblxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9LFxuXG4gIGRyb3A6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciByYXdEYXRhID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgIGlmIChyYXdEYXRhKSB7XG4gICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmF3RGF0YSk7XG4gICAgICB2YXIgYXR0cmlidXRlcyA9IHRoaXMuZ2V0KCdjb250ZW50LmF0dHJpYnV0ZXMnKTtcblxuICAgICAgdGhpcy5zZXQoJ2NvbnRlbnQuYXR0cmlidXRlcycsIGF0dHJpYnV0ZXMuY29uY2F0KGRhdGEuYXR0cmlidXRlcykudW5pcSgpKTtcbiAgICB9XG4gIH0sXG5cbiAgYWN0aW9uczoge1xuICAgIGVkaXROYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmdldCgnbmFtZVZpZXcnKS5zZW5kKCdtYWtlRWRpdGFibGUnKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFUYWJsZUNvbXBvc2FibGVDb2x1bW5Db21wb25lbnQ7XG4iLCJFbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbi9uYW1lJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgTmFtZVZpZXcgPSBFbWJlci5WaWV3LmV4dGVuZCh7XG4gIHRlbXBsYXRlTmFtZTogJ2NvbXBvbmVudHMvZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbi9uYW1lJyxcbiAgdGFnTmFtZTogJ3NwYW4nLFxuICBjbGFzc05hbWVzOiBbJ2J0bicsICdidG4teHMnLCAnYnRuLWRlZmF1bHQnLCAnbmFtZSddLFxuICBhdHRyaWJ1dGVCaW5kaW5nczogWydjb250ZW50ZWRpdGFibGUnXSxcbiAgY29udGVudGVkaXRhYmxlOiAnZmFsc2UnLFxuICBuYW1lOiBudWxsLFxuXG4gIGtleURvd246IGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vIE9uIEVudGVyL1JldHVyblxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgdmFyIG5ld05hbWUgPSB0aGlzLiQoKS50ZXh0KCk7XG4gICAgICB0aGlzLnNldE5hbWUobmV3TmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIG1hZGVFZGl0YWJsZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBlZGl0YWJsZSA9IHRoaXMuZ2V0KCdjb250ZW50ZWRpdGFibGUnKTtcblxuICAgIGlmIChlZGl0YWJsZSkge1xuICAgICAgRW1iZXIucnVuLnNjaGVkdWxlKCdhZnRlclJlbmRlcicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kKCkuZm9jdXMoKTtcbiAgICAgICAgc2VsZWN0VGV4dCh0aGlzLiQoKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0ub2JzZXJ2ZXMoJ2NvbnRlbnRlZGl0YWJsZScpLFxuXG4gIGZvY3VzT3V0OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG5ld05hbWUgPSB0aGlzLiQoKS50ZXh0KCk7XG4gICAgdGhpcy5zZXROYW1lKG5ld05hbWUpO1xuICB9LFxuXG4gIHNldE5hbWU6IGZ1bmN0aW9uIChuZXdOYW1lKSB7XG4gICAgaWYgKCFFbWJlci5pc0VtcHR5KG5ld05hbWUpKSB7XG4gICAgICB0aGlzLnNldFByb3BlcnRpZXMoe1xuICAgICAgICBuYW1lOiBuZXdOYW1lLFxuICAgICAgICBjb250ZW50ZWRpdGFibGU6ICdmYWxzZSdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuJCgpLnRleHQodGhpcy5nZXQoJ25hbWUnKSk7XG4gICAgICB0aGlzLnNldCgnY29udGVudGVkaXRhYmxlJywgJ2ZhbHNlJyk7XG4gICAgfVxuICB9LFxuXG4gIGFjdGlvbnM6IHtcbiAgICBtYWtlRWRpdGFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc2V0KCdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScpO1xuICAgIH1cbiAgfSBcbn0pO1xuXG5mdW5jdGlvbiBzZWxlY3RUZXh0KGVsZW1lbnQpIHtcbiAgdmFyIGRvYyA9IGRvY3VtZW50LFxuICAgIG5vZGUgPSBlbGVtZW50LmdldCgwKSxcbiAgICByYW5nZSwgc2VsZWN0aW9uO1xuICBcbiAgaWYgKGRvYy5ib2R5LmNyZWF0ZVRleHRSYW5nZSkgeyAvL21zXG4gICAgcmFuZ2UgPSBkb2MuYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICByYW5nZS5tb3ZlVG9FbGVtZW50VGV4dChub2RlKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfSBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7IC8vYWxsIG90aGVyc1xuICAgIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTsgICAgICAgIFxuICAgIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKG5vZGUpO1xuICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZVZpZXc7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuXG5cbiAgc3RhY2sxID0gaGVscGVycy5fdHJpYWdlTXVzdGFjaGUuY2FsbChkZXB0aDAsIFwidmlldy5uYW1lXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbiwgc2VsZj10aGlzO1xuXG5mdW5jdGlvbiBwcm9ncmFtMShkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazE7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgPGxpPjxhIGhyZWY9XFxcIiNcXFwiPlwiKTtcbiAgc3RhY2sxID0gaGVscGVycy5fdHJpYWdlTXVzdGFjaGUuY2FsbChkZXB0aDAsIFwiXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCI8L2E+PC9saT5cXG4gIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbihoZWxwZXJzLnZpZXcuY2FsbChkZXB0aDAsIFwiTmFtZVZpZXdDbGFzc1wiLCB7aGFzaDp7XG4gICAgJ25hbWUnOiAoXCJjb250ZW50Lm5hbWVcIiksXG4gICAgJ3ZpZXdOYW1lJzogKFwibmFtZVZpZXdcIilcbiAgfSxoYXNoVHlwZXM6eyduYW1lJzogXCJJRFwiLCd2aWV3TmFtZSc6IFwiU1RSSU5HXCJ9LGhhc2hDb250ZXh0czp7J25hbWUnOiBkZXB0aDAsJ3ZpZXdOYW1lJzogZGVwdGgwfSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuXFxuPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXhzIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVxcXCIgZGF0YS10b2dnbGU9XFxcImRyb3Bkb3duXFxcIj5cXG4gIDxzcGFuIGNsYXNzPVxcXCJjYXJldFxcXCI+PC9zcGFuPlxcbiAgPHNwYW4gY2xhc3M9XFxcInNyLW9ubHlcXFwiPlRvZ2dsZSBEcm9wZG93bjwvc3Bhbj5cXG48L2J1dHRvbj5cXG5cXG48dWwgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnVcXFwiIHJvbGU9XFxcIm1lbnVcXFwiPlxcbiAgXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAsIFwiY29udGVudC5hdHRyaWJ1dGVzXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgPGxpIGNsYXNzPVxcXCJkaXZpZGVyXFxcIj48L2xpPlxcbiAgPGxpPjxhIGhyZWY9XFxcIiNcXFwiIFwiKTtcbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKGhlbHBlcnMuYWN0aW9uLmNhbGwoZGVwdGgwLCBcImVkaXROYW1lXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiU1RSSU5HXCJdLGRhdGE6ZGF0YX0pKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCI+RWRpdCBOYW1lPC9hPjwvbGk+XFxuPC91bD5cXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJ2YXIgRGF0YVRhYmxlSGVhZGVyVmlldyA9IHJlcXVpcmUoJy4vaGVhZGVyJyk7XG5FbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZSddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUNvbXBvbmVudCA9IEVtYmVyLkNvbXBvbmVudC5leHRlbmQoe1xuICBjb2x1bW5zOiBFbWJlci5BKCksXG4gIGRhdGFzZXQ6IEVtYmVyLkEoKSxcbiAgY29sdW1uc0NvbXBvc2FibGU6IGZhbHNlLFxuICBsaW1pdDogbnVsbCxcbiAgZGF0YVRhYmxlSGVhZGVyOiBEYXRhVGFibGVIZWFkZXJWaWV3LFxuICBzZWxlY3RlZFJvd3M6IEVtYmVyLmNvbXB1dGVkLmZpbHRlckJ5KCdkYXRhJywgJ3NlbGVjdGVkJywgdHJ1ZSksIFxuXG4gIGJsYWg6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmdldCgnc2VsZWN0ZWRSb3dzJyk7XG4gIH0ub24oJ2luaXQnKSxcblxuICBzZWxlY3RlZENoYW5nZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLmdldCgnc2VsZWN0ZWRSb3dzJyk7XG4gICAgXG4gICAgaWYgKHNlbGVjdGVkICYmIHNlbGVjdGVkLmdldCgnbGVuZ3RoJykpIHtcbiAgICAgIHRoaXMuc2VuZEFjdGlvbignYWN0aW9uJywgc2VsZWN0ZWQpO1xuICAgIH1cbiAgfS5vYnNlcnZlcygnc2VsZWN0ZWRSb3dzJyksXG5cbiAgc2VsZWN0YWJsZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmdldCgnYWN0aW9uJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0ucHJvcGVydHkoKSxcblxuICB0eXBlczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdldCgnZGF0YXNldCcpLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXMsIGN1cnJlbnQpIHtcbiAgICAgIGlmICghcHJldmlvdXMuZmluZEJ5KCd0eXBlJywgY3VycmVudC5jb25zdHJ1Y3Rvci50eXBlS2V5KSkge1xuICAgICAgICBwcmV2aW91cy5wdXNoT2JqZWN0KEVtYmVyLk9iamVjdC5jcmVhdGUoe1xuICAgICAgICAgIHR5cGU6IGN1cnJlbnQuY29uc3RydWN0b3IudHlwZUtleSxcbiAgICAgICAgICBrZXlzOiBFbWJlci5rZXlzKGN1cnJlbnQudG9KU09OKCkpXG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgIH0sIFtdKTtcbiAgfS5wcm9wZXJ0eSgnZGF0YXNldCcpLFxuXG4gIGF2YWlsYWJsZUNvbHVtbnM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGF0YXNldCA9IHRoaXMuZ2V0KCdkYXRhc2V0Jyk7XG4gICAgdmFyIGFsaWFzZXMgPSB0aGlzLmdldCgnY29sdW1uQWxpYXNlcycpO1xuICAgIHJldHVybiBhbGlhc2VzICYmICFFbWJlci5pc0VtcHR5KGFsaWFzZXMpID8gYWxpYXNlcyA6IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKGRhdGFzZXQpO1xuICB9LnByb3BlcnR5KCksXG5cbiAgY29sdW1uc05vdEluSGVhZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGF2YWlsYWJsZSA9IHRoaXMuZ2V0KCdhdmFpbGFibGVDb2x1bW5zJyk7XG4gICAgdmFyIGRpc3BsYXllZCA9IHRoaXMuZ2V0KCdjb2x1bW5zJyk7XG5cbiAgICByZXR1cm4gYXZhaWxhYmxlLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXMsIGl0ZW0pIHtcbiAgICAgIGlmICghZGlzcGxheWVkLmZpbmRCeSgnbmFtZScsIGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgcHJldmlvdXMucHVzaE9iamVjdChpdGVtKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgIH0sIFtdKTtcbiAgfS5wcm9wZXJ0eSgnYXZhaWxhYmxlQ29sdW1ucycsICdjb2x1bW5zJyksXG5cbiAgcHJlUG9wdWxhdGVDb2x1bW5zOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGVjdGFibGUgPSB0aGlzLmdldCgnc2VsZWN0YWJsZScpO1xuICAgIHZhciBkZWZhdWx0Q29sdW1ucyA9IHRoaXMuZ2V0KCdkZWZhdWx0Q29sdW1ucycpO1xuICAgIHZhciBhdmFpbGFibGVDb2x1bW5zID0gdGhpcy5nZXQoJ2F2YWlsYWJsZUNvbHVtbnMnKTtcbiAgICB2YXIgZmlsdGVyZWQgPSBhdmFpbGFibGVDb2x1bW5zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRDb2x1bW5zLmNvbnRhaW5zKGl0ZW0uZ2V0KCduYW1lJykpO1xuICAgIH0pO1xuXG4gICAgaWYgKHNlbGVjdGFibGUpIHtcbiAgICAgIGZpbHRlcmVkLnVuc2hpZnQobnVsbCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXQoJ2NvbHVtbnMnLCBmaWx0ZXJlZCk7XG4gIH0ub24oJ2luaXQnKSxcblxuICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRhdGFzZXQgPSB0aGlzLmdldCgnZGF0YXNldCcpO1xuICAgIHZhciBjb2x1bW5zID0gdGhpcy5nZXQoJ2NvbHVtbnMnKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHJlc3VsdDtcblxuICAgIGRhdGFzZXQgPSBFbWJlci5pc0FycmF5KGRhdGFzZXQpID8gZGF0YXNldCA6IGRhdGFzZXQuZ2V0KCdjb250ZW50Jyk7XG5cbiAgICBpZiAoIUVtYmVyLmlzQXJyYXkoZGF0YXNldCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YXNldCBpbnB1dCBtdXN0IGJlIGFuIGFycmF5LicpO1xuICAgIH1cblxuICAgIHJlc3VsdCA9IGRhdGFzZXQubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgdHlwZSA9IGl0ZW0uY29uc3RydWN0b3IudHlwZUtleTtcblxuICAgICAgaWYgKGNvbHVtbnMpIHtcbiAgICAgICAgcmV0dXJuIEVtYmVyLk9iamVjdC5jcmVhdGUoe1xuICAgICAgICAgIHJvdzogc2VsZi5jb2x1bW5BdHRyaWJ1dGVNYXAoY29sdW1ucywgaXRlbSwgdHlwZSksXG4gICAgICAgICAgbW9kZWw6IGl0ZW0sXG4gICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIHJvdyA9IGl0ZW0uZ2V0KCdyb3cnKTtcblxuICAgICAgaWYgKHJvdykge1xuICAgICAgICB2YXIgYWxsRW1wdHkgPSByb3cuZXZlcnkoZnVuY3Rpb24gKGNvbCkge1xuICAgICAgICAgIHJldHVybiBFbWJlci5pc0VtcHR5KGNvbClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGFsbEVtcHR5KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiAhcm93LmlzQW55KCdAdGhpcycsICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfS5wcm9wZXJ0eSgnZGF0YXNldCcsICdjb2x1bW5zLmxlbmd0aCcpLFxuXG4gIGNvbHVtbkF0dHJpYnV0ZU1hcDogZnVuY3Rpb24gKGNvbHVtbnMsIHJvdywgdHlwZSkge1xuICAgIGlmICghcm93KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IFtdLFxuICAgICAgcm93SnNvbiA9IHJvdy50b0pTT04oKSxcbiAgICAgIHJvd0tleXMgPSBFbWJlci5rZXlzKHJvd0pzb24pLFxuICAgICAgY29sID0gMCxcbiAgICAgIGNvbHVtbnNBZGRlZCA9IFtdLFxuICAgICAgaGVhZGVyLCBwcm9wLCBhdHRyO1xuXG4gICAgZm9yICg7IGNvbCA8IGNvbHVtbnMubGVuZ3RoOyBjb2wrKykge1xuICAgICAgaGVhZGVyID0gY29sdW1ucy5vYmplY3RBdChjb2wpO1xuXG4gICAgICBpZiAoIWhlYWRlcikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaGVhZGVyLmdldCgnYXR0cmlidXRlcycpLmZvckVhY2goZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYXR0ci5zcGxpdCgnOicpO1xuICAgICAgICBwcm9wID0gc3BsaXRbMV07XG4gICAgICAgIGlmIChyb3dKc29uLmhhc093blByb3BlcnR5KHByb3ApICYmICFjb2x1bW5zQWRkZWQuY29udGFpbnMocHJvcCkpIHtcbiAgICAgICAgICBjb2x1bW5zQWRkZWQucHVzaChwcm9wKTtcbiAgICAgICAgICByZXN1bHQuc3BsaWNlKGNvbCwgMCwgcm93SnNvbltwcm9wXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWNvbHVtbnNBZGRlZC5jb250YWlucyhwcm9wKSkge1xuICAgICAgICAgIHJlc3VsdC5zcGxpY2UoY29sLCAwLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgZ2VuZXJhdGVDb2x1bW5zOiBmdW5jdGlvbiAoZGF0YXNldCkge1xuICAgIHZhciB0eXBlcyA9IHRoaXMuZ2V0KCd0eXBlcycpO1xuXG4gICAgaWYgKHR5cGVzKSB7XG4gICAgICByZXR1cm4gdHlwZXMucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgY3VycmVudCwgaW5kZXgsIGFycikge1xuICAgICAgICB2YXIgdHlwZSA9IGN1cnJlbnQuZ2V0KCd0eXBlJyk7XG5cbiAgICAgICAgY3VycmVudC5nZXQoJ2tleXMnKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgdmFyIG5hbWUgPSBpdGVtLmNhcGl0YWxpemUoKTtcbiAgICAgICAgICB2YXIgY29sdW1uID0gcHJldmlvdXMuZmluZEJ5KCduYW1lJywgbmFtZSk7XG4gICAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IHR5cGUgKyAnOicgKyBpdGVtO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgICAgIGNvbHVtbi5nZXQoJ2F0dHJpYnV0ZXMnKS5wdXNoT2JqZWN0KGF0dHJpYnV0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHJldmlvdXMucHVzaE9iamVjdChFbWJlci5PYmplY3QuY3JlYXRlKHtcbiAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgYXR0cmlidXRlczogW2F0dHJpYnV0ZV0sXG4gICAgICAgICAgICAgIGRhdGFUeXBlOiB0eXBlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuICB9LFxuXG4gIGFjdGlvbnM6IHtcbiAgICBjbGVhclNlbGVjdGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmdldCgnZGF0YScpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5zZXQoJ3NlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVDb21wb25lbnQ7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIHNlbGY9dGhpcztcblxuZnVuY3Rpb24gcHJvZ3JhbTEoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnNbJ2lmJ10uY2FsbChkZXB0aDAsIFwidmlldy5wYXJlbnRWaWV3LmNvbHVtbnNDb21wb3NhYmxlXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLnByb2dyYW0oNCwgcHJvZ3JhbTQsIGRhdGEpLGZuOnNlbGYucHJvZ3JhbSgyLCBwcm9ncmFtMiwgZGF0YSksY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cbmZ1bmN0aW9uIHByb2dyYW0yKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICBcIik7XG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVyc1snZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbiddIHx8IChkZXB0aDAgJiYgZGVwdGgwWydkYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb250ZW50JzogKFwidmlldy5jb250ZW50XCIpXG4gIH0saGFzaFR5cGVzOnsnY29udGVudCc6IFwiSURcIn0saGFzaENvbnRleHRzOnsnY29udGVudCc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJkYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cblxuZnVuY3Rpb24gcHJvZ3JhbTQoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgaGVscGVyLCBvcHRpb25zO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgIFwiKTtcbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzWydkYXRhLXRhYmxlLWNvbHVtbiddIHx8IChkZXB0aDAgJiYgZGVwdGgwWydkYXRhLXRhYmxlLWNvbHVtbiddKSxvcHRpb25zPXtoYXNoOntcbiAgICAnY29udGVudCc6IChcInZpZXcuY29udGVudFwiKSxcbiAgICAnY2xhc3MnOiAoXCJidG4gYnRuLXhzIGJ0bi1kZWZhdWx0XCIpXG4gIH0saGFzaFR5cGVzOnsnY29udGVudCc6IFwiSURcIiwnY2xhc3MnOiBcIlNUUklOR1wifSxoYXNoQ29udGV4dHM6eydjb250ZW50JzogZGVwdGgwLCdjbGFzcyc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJkYXRhLXRhYmxlLWNvbHVtblwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgXCJ2aWV3LmNvbnRlbnRcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oMSwgcHJvZ3JhbTEsIGRhdGEpLGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICBcbn0pO1xuIiwiRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUvY29sbGVjdGlvbi1pdGVtJ10gPSByZXF1aXJlKCcuL2NvbGxlY3Rpb24taXRlbS5oYnMnKTtcblxudmFyIENvbGxlY3Rpb25JdGVtVmlldyA9IEVtYmVyLlZpZXcuZXh0ZW5kKHtcbiAgZWxlbWVudElkOiBFbWJlci5jb21wdXRlZC5hbGlhcygnbmFtZScpLFxuICB0ZW1wbGF0ZU5hbWU6ICdjb21wb25lbnRzL2RhdGEtdGFibGUvY29sbGVjdGlvbi1pdGVtJyxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnZHJvcFNpZGUnLCAnY29sdW1uVHlwZSddLFxuICB0YWdOYW1lOiAndGgnLFxuICBkcm9wU2lkZTogbnVsbCxcbiAgdGFyZ2V0OiBFbWJlci5jb21wdXRlZC5hbGlhcygncGFyZW50VmlldycpLFxuXG4gIGNvbHVtblR5cGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGVudCA9IHRoaXMuZ2V0KCdjb250ZW50Lm5hbWUnKTtcbiAgICB2YXIgcG9zdGZpeCA9ICctY29sdW1uJztcbiAgICByZXR1cm4gY29udGVudCA/IChjb250ZW50ICsgcG9zdGZpeCkudG9Mb3dlckNhc2UoKSA6ICdzZWxlY3RhYmxlJyArIHBvc3RmaXg7XG4gIH0ucHJvcGVydHkoJ2NvbnRlbnQnKSxcblxuICBkcmFnT3ZlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmdldCgnY29udGVudCcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgRW1iZXIucnVuLnRocm90dGxlKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChldmVudC5vcmlnaW5hbEV2ZW50Lm9mZnNldFggPiAodGhpcy4kKCkud2lkdGgoKSAvIDIpKSB7XG4gICAgICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsICdyaWdodCcpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsICdsZWZ0Jyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0KCdwYXJlbnRWaWV3Lm92ZXInLCB0cnVlKTtcbiAgICB9LCAzMDApO1xuICB9LFxuXG4gIGRyYWdMZWF2ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsIG51bGwpO1xuICAgIHRoaXMuc2V0KCdwYXJlbnRWaWV3Lm92ZXInLCBmYWxzZSk7XG4gIH0sXG5cbiAgZHJvcDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5nZXQoJ2NvbnRlbnQnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzaWRlRHJvcHBlZCA9IHRoaXMuZ2V0KCdkcm9wU2lkZScpO1xuICAgIHZhciByYXdEYXRhID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgIGlmIChyYXdEYXRhKSB7XG4gICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmF3RGF0YSk7XG4gICAgICB2YXIgY29sdW1uID0gdGhpcy5nZXQoJ3BhcmVudFZpZXcucGFyZW50Vmlldy5hdmFpbGFibGVDb2x1bW5zJykuZmluZEJ5KCduYW1lJywgZGF0YS5uYW1lKTtcblxuICAgICAgaWYgKHNpZGVEcm9wcGVkID09PSAnbGVmdCcpIHtcbiAgICAgICAgdGhpcy5zZW5kKCdpbnNlcnRCZWZvcmUnLCB0aGlzLmdldCgnY29udGVudCcpLCBjb2x1bW4pOyAgIFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2VuZCgnaW5zZXJ0QWZ0ZXInLCB0aGlzLmdldCgnY29udGVudCcpLCBjb2x1bW4pOyAgIFxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsIG51bGwpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0aW9uSXRlbVZpZXc7XG4iLCJ2YXIgQ29sbGVjdGlvbkl0ZW1WaWV3ID0gcmVxdWlyZSgnLi9jb2xsZWN0aW9uLWl0ZW0nKTtcbkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlL2hlYWRlciddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUhlYWRlckNvbGxlY3Rpb24gPSBFbWJlci5Db2xsZWN0aW9uVmlldy5leHRlbmQoe1xuICB0YWdOYW1lOiAndHInLFxuICB0ZW1wbGF0ZU5hbWU6ICdjb21wb25lbnRzL2RhdGEtdGFibGUvaGVhZGVyJyxcbiAgY29udGVudDogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ3BhcmVudFZpZXcuY29sdW1ucycpLFxuICBsaW1pdDogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ3BhcmVudFZpZXcubGltaXQnKSxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnb3ZlciddLFxuICBjb2x1bW5zTm90SW5IZWFkZXI6IEVtYmVyLmNvbXB1dGVkLmFsaWFzKCdwYXJlbnRWaWV3LmJpbkNvbXBvbmVudC5jb2x1bW5zJyksXG4gIGNvbHVtbnNDb21wb3NhYmxlOiBFbWJlci5jb21wdXRlZC5hbGlhcygncGFyZW50Vmlldy5jb2x1bW5zQ29tcG9zYWJsZScpLFxuICBpdGVtVmlld0NsYXNzOiBDb2xsZWN0aW9uSXRlbVZpZXcsXG5cbiAgZHJhZ092ZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG5cbiAgZHJhZ0VudGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIHRydWUpO1xuICB9LFxuXG4gIGRyYWdMZWF2ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0KCdvdmVyJywgZmFsc2UpO1xuICB9LFxuXG4gIGRyb3A6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfSxcblxuICBpbnNlcnRBdDogZnVuY3Rpb24gKGV4aXN0aW5nLCBkcm9wcGVkLCBhZGQpIHtcbiAgICB2YXIgY29sdW1ucyA9IHRoaXMuZ2V0KCdjb250ZW50Jyk7XG4gICAgdmFyIGNvbHVtbnNOb3RJbkhlYWRlciA9IHRoaXMuZ2V0KCdjb2x1bW5zTm90SW5IZWFkZXInKTtcbiAgICB2YXIgZXhpc3RpbmdJbmRleCA9IGNvbHVtbnMuaW5kZXhPZihleGlzdGluZyk7XG4gICAgdmFyIGR1cGxpY2F0ZSA9IGNvbHVtbnMuZmluZEJ5KCduYW1lJywgZHJvcHBlZC5nZXQoJ25hbWUnKSk7XG4gICAgdmFyIHRvdGFsID0gdGhpcy5nZXQoJ2NvbnRlbnQubGVuZ3RoJyk7XG4gICAgdmFyIGxpbWl0ID0gdGhpcy5nZXQoJ2xpbWl0Jyk7XG4gICAgdmFyIG1vZGlmZWRJbmRleDtcbiAgICB2YXIgZHVwSW5kZXg7XG5cbiAgICBpZiAoZXhpc3RpbmcuZ2V0KCduYW1lJykgPT09IGRyb3BwZWQuZ2V0KCduYW1lJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBtb2RpZmllZEluZGV4ID0gZXhpc3RpbmdJbmRleCArIGFkZDtcbiAgICB9XG5cbiAgICBpZiAoY29sdW1ucykge1xuICAgICAgLy8gbW92ZSBjb2x1bW4gdG8gbmV3IGluZGV4XG4gICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgIGR1cEluZGV4ID0gY29sdW1ucy5pbmRleE9mKGR1cGxpY2F0ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgZHVwSW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgY29sdW1ucy5hcnJheUNvbnRlbnRXaWxsQ2hhbmdlKGR1cEluZGV4LCAxLCAwKTtcbiAgICAgICAgICBjb2x1bW5zLnNwbGljZShkdXBJbmRleCwgMSk7XG4gICAgICAgICAgdGhpcy5zZXQoJ2NvbnRlbnQnLCBjb2x1bW5zKTtcbiAgICAgICAgICBjb2x1bW5zLmFycmF5Q29udGVudERpZENoYW5nZShkdXBJbmRleCwgMSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGxpbWl0ICYmIHRvdGFsID09PSBsaW1pdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIEFkZCB0byBlbmQsIGluc3RlYWQgb2Ygc3BsaWNpbmdcbiAgICAgIGlmIChtb2RpZmllZEluZGV4ID4gY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgY29sdW1ucy5wdXNoT2JqZWN0KGRyb3BwZWQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbHVtbnMuYXJyYXlDb250ZW50V2lsbENoYW5nZShtb2RpZmllZEluZGV4LCAwLCAxKTtcbiAgICAgICAgY29sdW1ucy5zcGxpY2UobW9kaWZpZWRJbmRleCwgMCwgZHJvcHBlZCk7XG4gICAgICAgIHRoaXMuc2V0KCdjb250ZW50JywgY29sdW1ucyk7XG4gICAgICAgIGNvbHVtbnMuYXJyYXlDb250ZW50RGlkQ2hhbmdlKG1vZGlmaWVkSW5kZXgsIDAsIDEpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHJvcHBlZCkge1xuICAgICAgICB0aGlzLnNldCgnY29sdW1uc05vdEluSGVhZGVyJywgY29sdW1uc05vdEluSGVhZGVyLndpdGhvdXQoZHJvcHBlZCkpO1xuICAgICAgfVxuICAgIH0gXG4gIH0sXG5cbiAgYWN0aW9uczoge1xuICAgIGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGV4aXN0aW5nLCBkcm9wcGVkKSB7XG4gICAgICB0aGlzLmluc2VydEF0KGV4aXN0aW5nLCBkcm9wcGVkLCAwKTsgIFxuICAgIH0sXG5cbiAgICBpbnNlcnRBZnRlcjogZnVuY3Rpb24gKGV4aXN0aW5nLCBkcm9wcGVkKSB7XG4gICAgICB0aGlzLmluc2VydEF0KGV4aXN0aW5nLCBkcm9wcGVkLCAxKTsgIFxuICAgIH1cbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVRhYmxlSGVhZGVyQ29sbGVjdGlvbjtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBjb21waWxlciA9IEVtYmVyLkhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIGFub255bW91cyhIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbnRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBFbWJlci5IYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9ICcnO1xuXG5cbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBjb21waWxlciA9IEVtYmVyLkhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIGFub255bW91cyhIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbnRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBFbWJlci5IYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazEsIGhlbHBlciwgb3B0aW9ucywgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBzZWxmPXRoaXM7XG5cbmZ1bmN0aW9uIHByb2dyYW0xKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICAgIDx0cj5cXG4gICAgICAgIFwiKTtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgXCJzZWxlY3RhYmxlXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDIsIHByb2dyYW0yLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcblxcbiAgICAgICAgXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAsIFwiaXRlbS5yb3dcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oNCwgcHJvZ3JhbTQsIGRhdGEpLGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgICAgPC90cj5cXG4gICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5mdW5jdGlvbiBwcm9ncmFtMihkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBoZWxwZXIsIG9wdGlvbnM7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICAgICAgPHRkPlwiKTtcbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzLmlucHV0IHx8IChkZXB0aDAgJiYgZGVwdGgwLmlucHV0KSxvcHRpb25zPXtoYXNoOntcbiAgICAndHlwZSc6IChcImNoZWNrYm94XCIpLFxuICAgICdjaGVja2VkJzogKFwiaXRlbS5zZWxlY3RlZFwiKVxuICB9LGhhc2hUeXBlczp7J3R5cGUnOiBcIlNUUklOR1wiLCdjaGVja2VkJzogXCJJRFwifSxoYXNoQ29udGV4dHM6eyd0eXBlJzogZGVwdGgwLCdjaGVja2VkJzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImlucHV0XCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPC90ZD5cXG4gICAgICAgIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG5mdW5jdGlvbiBwcm9ncmFtNChkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazE7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICAgICAgPHRkPlwiKTtcbiAgc3RhY2sxID0gaGVscGVycy5fdHJpYWdlTXVzdGFjaGUuY2FsbChkZXB0aDAsIFwiXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCI8L3RkPlxcbiAgICAgICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzWydkYXRhLXRhYmxlLWJpbiddIHx8IChkZXB0aDAgJiYgZGVwdGgwWydkYXRhLXRhYmxlLWJpbiddKSxvcHRpb25zPXtoYXNoOntcbiAgICAnY29sdW1ucyc6IChcImNvbHVtbnNOb3RJbkhlYWRlclwiKSxcbiAgICAndmlld05hbWUnOiAoXCJiaW5Db21wb25lbnRcIiksXG4gICAgJ2NvbHVtbnNDb21wb3NhYmxlJzogKFwiY29sdW1uc0NvbXBvc2FibGVcIilcbiAgfSxoYXNoVHlwZXM6eydjb2x1bW5zJzogXCJJRFwiLCd2aWV3TmFtZSc6IFwiU1RSSU5HXCIsJ2NvbHVtbnNDb21wb3NhYmxlJzogXCJJRFwifSxoYXNoQ29udGV4dHM6eydjb2x1bW5zJzogZGVwdGgwLCd2aWV3TmFtZSc6IGRlcHRoMCwnY29sdW1uc0NvbXBvc2FibGUnOiBkZXB0aDB9LGNvbnRleHRzOltdLHR5cGVzOltdLGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiZGF0YS10YWJsZS1iaW5cIiwgb3B0aW9ucykpKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG48dGFibGUgY2xhc3M9XFxcInRhYmxlIHRhYmxlLXJlc3BvbnNpdmUgdGFibGUtaG92ZXIgdGFibGUtY29uZGVuc2VkXFxcIj5cXG4gIDx0aGVhZD5cXG4gICAgXCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oaGVscGVycy52aWV3LmNhbGwoZGVwdGgwLCBcImRhdGFUYWJsZUhlYWRlclwiLCB7aGFzaDp7XG4gICAgJ3ZpZXdOYW1lJzogKFwiY29sdW1uQ29sbGVjdGlvblwiKVxuICB9LGhhc2hUeXBlczp7J3ZpZXdOYW1lJzogXCJTVFJJTkdcIn0saGFzaENvbnRleHRzOnsndmlld05hbWUnOiBkZXB0aDB9LGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gIDwvdGhlYWQ+XFxuICA8dGJvZHk+XFxuICAgIFwiKTtcbiAgc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwLCBcIml0ZW1cIiwgXCJpblwiLCBcImRhdGFcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oMSwgcHJvZ3JhbTEsIGRhdGEpLGNvbnRleHRzOltkZXB0aDAsZGVwdGgwLGRlcHRoMF0sdHlwZXM6W1wiSURcIixcIklEXCIsXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgPC90Ym9keT5cXG48L3RhYmxlPlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsInZhciBEYXRhVGFibGVDb21wb25lbnQgPSByZXF1aXJlKCcuL2RhdGEtdGFibGUvY29tcG9uZW50Jyk7XG52YXIgRGF0YVRhYmxlQmluQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9kYXRhLXRhYmxlLWJpbi9jb21wb25lbnQnKTtcbnZhciBEYXRhVGFibGVDb2x1bW5Db21wb25lbnQgPSByZXF1aXJlKCcuL2RhdGEtdGFibGUtY29sdW1uL2NvbXBvbmVudCcpO1xudmFyIERhdGFUYWJsZUNvbXBvc2FibGVDb2x1bW5Db21wb25lbnQgPSByZXF1aXJlKCcuL2RhdGEtdGFibGUtY29tcG9zYWJsZS1jb2x1bW4vY29tcG9uZW50Jyk7XG5cbkVtYmVyLkFwcGxpY2F0aW9uLmluaXRpYWxpemVyKHtcbiAgbmFtZTogJ2RhdGEtdGFibGUnLFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKGNvbnRhaW5lciwgYXBwbGljYXRpb24pIHtcbiAgICBjb250YWluZXIucmVnaXN0ZXIoJ2NvbXBvbmVudDpkYXRhLXRhYmxlJywgRGF0YVRhYmxlQ29tcG9uZW50LCB7IHNpbmdsZXRvbjogZmFsc2UgfSk7XG4gICAgY29udGFpbmVyLnJlZ2lzdGVyKCdjb21wb25lbnQ6ZGF0YS10YWJsZS1iaW4nLCBEYXRhVGFibGVCaW5Db21wb25lbnQsIHsgc2luZ2xldG9uOiBmYWxzZSB9KTtcbiAgICBjb250YWluZXIucmVnaXN0ZXIoJ2NvbXBvbmVudDpkYXRhLXRhYmxlLWNvbHVtbicsIERhdGFUYWJsZUNvbHVtbkNvbXBvbmVudCwgeyBzaW5nbGV0b246IGZhbHNlIH0pO1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcignY29tcG9uZW50OmRhdGEtdGFibGUtY29tcG9zYWJsZS1jb2x1bW4nLCBEYXRhVGFibGVDb21wb3NhYmxlQ29sdW1uQ29tcG9uZW50LCB7IHNpbmdsZXRvbjogZmFsc2UgfSk7XG4gIH1cbn0pO1xuIl19
