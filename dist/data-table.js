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

    if (!columns.findBy('id', data.id) && headerColumns.without(headerColumns.findBy('id', data.id)).compact().length >= 1) {
      column = this.get('parentView.availableColumns').findBy('id', data.id);

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
      id: this.get('content.id'),
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
      var columns = this.get('parentView.columns');
      var droppedColumn = columns.findBy('id', data.id);

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
  data.buffer.push("\n    <li><a href=\"#\"><span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': (":square-icon type"),
    'title': ("type")
  },hashTypes:{'class': "STRING",'title': "STRING"},hashContexts:{'class': depth0,'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></span> ");
  stack1 = helpers._triageMustache.call(depth0, "attribute", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
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
  limit: null,
  autoCompose: true,
  columns: Ember.A(),
  dataset: Ember.A(),
  columnsComposable: false,
  dataTableHeader: DataTableHeaderView,
  selectedRows: Ember.computed.filterBy('data', 'selected', true), 

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
    var aliases = this.get('columnAliases');

    if (aliases && !Ember.isEmpty(aliases)) {
      return aliases;
    }
    else {
      var dataset = this.get('dataset');
      var generated = this.generateColumns(dataset);
      return generated;
    }
  }.property(),

  columnsNotInHeader: function () {
    var available = this.get('availableColumns');
    var displayed = this.get('columns');

    return available.reduce(function (previous, item) {
      if (!displayed.findBy('id', item.get('id'))) {
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
      var id = item.get('id');
      return defaultColumns.contains(id);
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

  columnAttributeMap: function (columns, row, dataType) {
    if (!row) {
      return;
    }

    var result = [],
      //columnsByType = columns.filterBy('attribute.type', dataType),
      rowJson = row.toJSON(),
      rowKeys = Ember.keys(rowJson),
      col = 0,
      dataAdded = 0,
      columnsAdded = [],
      key, attr,
      header, prop, attr;

    for (; col < columns.length; col++) {
      header = columns.objectAt(col);

      if (!header) {
        continue;
      }
      dataAdded = result.get('length');

      if (header.get('isComposed')) {
        header.get('attributes').forEach(function (item) {
          key = item.get('type') + ':' + item.get('attribute');
          prop = item.get('attribute');

          if (rowJson.hasOwnProperty(prop) && !columnsAdded.contains(key) && dataType === item.get('type')) {
            columnsAdded.push(key);
            result.splice(col, 0, rowJson[prop]);
          }
        });

        if (result.get('length') === dataAdded) {
          result.splice(col, 0, '');
        }
      }
      else {
        key = header.get('id');
        attr = header.get('attribute');
        prop = header.get('attribute.attribute');

        if (rowJson.hasOwnProperty(prop) && !columnsAdded.contains(key) && dataType === attr.get('type')) {
          columnsAdded.push(key);
          result.splice(col, 0, rowJson[prop]);
        }
        else {
          result.splice(col, 0, '');
        }
      }
    }

    return result;
  },

  generateColumns: function (dataset) {
    var types = this.get('types');
    var autoCompose = this.get('autoCompose');

    if (types) {
      return types.reduce(function (previous, current, index, arr) {
        var type = current.get('type');

        current.get('keys').forEach(function (item) {
          var id = type + ':' + item;
          var name = item.capitalize();
          var column = previous.findBy('name', name);
          var attribute = Ember.Object.create({
            type: type,
            attribute: item
          });
          
          if (autoCompose && column) {
            column.set('isComposed', true);
            if (column.get('attributes').contains(column.get('attribute'))) {
              column.get('attributes').pushObject(column.get('attribute'));
            }
            column.get('attributes').pushObject(attribute);
          }
          else {
            previous.pushObject(Ember.Object.create({
              id: id,
              name: name,
              attributes: [attribute],
              attribute: attribute
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
  templateName: 'components/data-table/collection-item',
  classNameBindings: ['dropSide', 'columnType'],
  tagName: 'th',
  dropSide: null,
  target: Ember.computed.alias('parentView'),

  columnType: function () {
    var id = this.get('content.id');
    id = id ? id.split(':').join('-') : id;
    var postfix = '-column';
    return id ? (id + postfix) : 'selectable' + postfix;
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
      var column = this.get('parentView.parentView.availableColumns').findBy('id', data.id);

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
    var duplicate = columns.findBy('id', dropped.get('id'));
    var total = this.get('content.length');
    var limit = this.get('limit');
    var modifedIndex;
    var dupIndex;

    if (existing.get('id') === dropped.get('id')) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1iaW4vY29tcG9uZW50LmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWJpbi90ZW1wbGF0ZS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUtY29sdW1uL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1jb2x1bW4vdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbi9uYW1lL2luZGV4LmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL25hbWUvdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL3RlbXBsYXRlLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9jb21wb25lbnQuanMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUvaGVhZGVyL2NvbGxlY3Rpb24taXRlbS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUvaGVhZGVyL2NvbGxlY3Rpb24taXRlbS5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvaW5kZXguanMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUvaGVhZGVyL3RlbXBsYXRlLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS90ZW1wbGF0ZS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2luaXRpYWxpemVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUtYmluJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgRGF0YVRhYmxlQmluQ29tcG9uZW50ID0gRW1iZXIuQ29tcG9uZW50LmV4dGVuZCh7XG4gIGNsYXNzTmFtZXM6IFsnaGVhZGVyLWl0ZW0tYmluJ10sXG4gIGNsYXNzTmFtZUJpbmRpbmdzOiBbJ292ZXInXSxcblxuICBkcmFnT3ZlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGRyb3A6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnYXBwbGljYXRpb24vanNvbicpKTtcbiAgICB2YXIgY29sdW1ucyA9IHRoaXMuZ2V0KCdjb2x1bW5zJyk7XG4gICAgdmFyIGhlYWRlckNvbHVtbnMgPSB0aGlzLmdldCgncGFyZW50Vmlldy5jb2x1bW5zJyk7XG4gICAgdmFyIGRlZmF1bHRDb2x1bW5zID0gdGhpcy5nZXQoJ3BhcmVudFZpZXcuZGVmYXVsdENvbHVtbnMnKTtcbiAgICB2YXIgY29sdW1uO1xuXG4gICAgaWYgKCFjb2x1bW5zLmZpbmRCeSgnaWQnLCBkYXRhLmlkKSAmJiBoZWFkZXJDb2x1bW5zLndpdGhvdXQoaGVhZGVyQ29sdW1ucy5maW5kQnkoJ2lkJywgZGF0YS5pZCkpLmNvbXBhY3QoKS5sZW5ndGggPj0gMSkge1xuICAgICAgY29sdW1uID0gdGhpcy5nZXQoJ3BhcmVudFZpZXcuYXZhaWxhYmxlQ29sdW1ucycpLmZpbmRCeSgnaWQnLCBkYXRhLmlkKTtcblxuICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICB0aGlzLmdldCgnY29sdW1ucycpLnB1c2hPYmplY3QoY29sdW1uKTtcbiAgICAgICAgdGhpcy5zZXQoJ3BhcmVudFZpZXcuY29sdW1ucycsIGhlYWRlckNvbHVtbnMud2l0aG91dChjb2x1bW4pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfSxcblxuICBkcmFnRW50ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIHRydWUpO1xuICB9LFxuXG4gIGRyYWdMZWF2ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0KCdvdmVyJywgZmFsc2UpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVCaW5Db21wb25lbnQ7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIHNlbGY9dGhpcztcblxuZnVuY3Rpb24gcHJvZ3JhbTEoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgIFwiKTtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgXCJjb2x1bW5zQ29tcG9zYWJsZVwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5wcm9ncmFtKDQsIHByb2dyYW00LCBkYXRhKSxmbjpzZWxmLnByb2dyYW0oMiwgcHJvZ3JhbTIsIGRhdGEpLGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cbmZ1bmN0aW9uIHByb2dyYW0yKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICAgIDxsaT5cIik7XG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVyc1snZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbiddIHx8IChkZXB0aDAgJiYgZGVwdGgwWydkYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb250ZW50JzogKFwiY29sdW1uXCIpXG4gIH0saGFzaFR5cGVzOnsnY29udGVudCc6IFwiSURcIn0saGFzaENvbnRleHRzOnsnY29udGVudCc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJkYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPC9saT5cXG4gICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbmZ1bmN0aW9uIHByb2dyYW00KGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIiBcXG4gICAgICA8bGk+XCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnNbJ2RhdGEtdGFibGUtY29sdW1uJ10gfHwgKGRlcHRoMCAmJiBkZXB0aDBbJ2RhdGEtdGFibGUtY29sdW1uJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb250ZW50JzogKFwiY29sdW1uXCIpLFxuICAgICdjbGFzcyc6IChcImJ0biBidG4teHMgYnRuLWRlZmF1bHRcIilcbiAgfSxoYXNoVHlwZXM6eydjb250ZW50JzogXCJJRFwiLCdjbGFzcyc6IFwiU1RSSU5HXCJ9LGhhc2hDb250ZXh0czp7J2NvbnRlbnQnOiBkZXB0aDAsJ2NsYXNzJzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImRhdGEtdGFibGUtY29sdW1uXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPC9saT5cXG4gICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbmZ1bmN0aW9uIHByb2dyYW02KGRlcHRoMCxkYXRhKSB7XG4gIFxuICBcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICA8bGk+PHNwYW4gY2xhc3M9XFxcInRleHQtbXV0ZWRcXFwiPk5vIGF0dHJpYnV0ZXMgYXZhaWxhYmxlLjwvc3Bhbj48L2xpPlxcbiAgXCIpO1xuICB9XG5cbiAgZGF0YS5idWZmZXIucHVzaChcIjx1bCBjbGFzcz1cXFwid2VsbCB3ZWxsLXNtIGxpc3QtdW5zdHlsZWQgbGlzdC1pbmxpbmVcXFwiPlxcbiAgXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAsIFwiY29sdW1uXCIsIFwiaW5cIiwgXCJjb2x1bW5zXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLnByb2dyYW0oNiwgcHJvZ3JhbTYsIGRhdGEpLGZuOnNlbGYucHJvZ3JhbSgxLCBwcm9ncmFtMSwgZGF0YSksY29udGV4dHM6W2RlcHRoMCxkZXB0aDAsZGVwdGgwXSx0eXBlczpbXCJJRFwiLFwiSURcIixcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuPC91bD5cXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJFbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZS1jb2x1bW4nXSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUuaGJzJyk7XG5cbnZhciBEYXRhVGFibGVDb2x1bW5Db21wb25lbnQgPSBFbWJlci5Db21wb25lbnQuZXh0ZW5kKHtcbiAgY2xhc3NOYW1lczogWydkdC10eXBlJ10sXG4gIGF0dHJpYnV0ZUJpbmRpbmdzOiBbJ2RyYWdnYWJsZSddLFxuICBjbGFzc05hbWVCaW5kaW5nczogWydkYXRhVHlwZSddLFxuICBkcmFnZ2FibGU6ICd0cnVlJyxcbiAgZGF0YVR5cGU6IEVtYmVyLmNvbXB1dGVkLmFsaWFzKCdjb250ZW50LmF0dHJpYnV0ZS50eXBlJyksXG5cbiAgZHJhZ1N0YXJ0OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIGlkOiB0aGlzLmdldCgnY29udGVudC5pZCcpXG4gICAgfTtcblxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVDb2x1bW5Db21wb25lbnQ7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuXG5cbiAgc3RhY2sxID0gaGVscGVycy5fdHJpYWdlTXVzdGFjaGUuY2FsbChkZXB0aDAsIFwiY29udGVudC5uYW1lXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCIgXFxuXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICBcbn0pO1xuIiwidmFyIE5hbWVWaWV3ID0gcmVxdWlyZSgnLi9uYW1lJyk7XG52YXIgQ29sdW1uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vZGF0YS10YWJsZS1jb2x1bW4vY29tcG9uZW50Jyk7XG5FbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbiddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUNvbXBvc2FibGVDb2x1bW5Db21wb25lbnQgPSBDb2x1bW5Db21wb25lbnQuZXh0ZW5kKHtcbiAgY2xhc3NOYW1lczogWydidG4tZ3JvdXAnXSxcbiAgTmFtZVZpZXdDbGFzczogTmFtZVZpZXcsXG5cbiAgZm9jdXNPdXQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciAkbmFtZSA9IEVtYmVyLiQoZXZlbnQudGFyZ2V0KTtcbiAgICBpZiAoJG5hbWUuaGFzQ2xhc3MoJ25hbWUnKSkge1xuICAgICAgdGhpcy5zZXQoJ2NvbnRlbnQubmFtZScsICRuYW1lLnRleHQoKSk7IFxuICAgICAgJG5hbWUuYXR0cignY29udGVudGVkaXRhYmxlJywgZmFsc2UpO1xuICAgIH1cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGRyYWdTdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBpZDogdGhpcy5nZXQoJ2NvbnRlbnQuaWQnKSxcbiAgICAgIGF0dHJpYnV0ZXM6IHRoaXMuZ2V0KCdjb250ZW50LmF0dHJpYnV0ZXMnKVxuICAgIH07XG5cbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnYXBwbGljYXRpb24vanNvbicsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgfSxcblxuICBkcm9wOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgcmF3RGF0YSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICBpZiAocmF3RGF0YSkge1xuICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJhd0RhdGEpO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLmdldCgnY29udGVudC5hdHRyaWJ1dGVzJyk7XG4gICAgICB2YXIgY29sdW1ucyA9IHRoaXMuZ2V0KCdwYXJlbnRWaWV3LmNvbHVtbnMnKTtcbiAgICAgIHZhciBkcm9wcGVkQ29sdW1uID0gY29sdW1ucy5maW5kQnkoJ2lkJywgZGF0YS5pZCk7XG5cbiAgICAgIHRoaXMuc2V0KCdjb250ZW50LmF0dHJpYnV0ZXMnLCBhdHRyaWJ1dGVzLmNvbmNhdChkYXRhLmF0dHJpYnV0ZXMpLnVuaXEoKSk7XG4gICAgfVxuICB9LFxuXG4gIGFjdGlvbnM6IHtcbiAgICBlZGl0TmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5nZXQoJ25hbWVWaWV3Jykuc2VuZCgnbWFrZUVkaXRhYmxlJyk7XG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVDb21wb3NhYmxlQ29sdW1uQ29tcG9uZW50O1xuIiwiRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUtY29tcG9zYWJsZS1jb2x1bW4vbmFtZSddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIE5hbWVWaWV3ID0gRW1iZXIuVmlldy5leHRlbmQoe1xuICB0ZW1wbGF0ZU5hbWU6ICdjb21wb25lbnRzL2RhdGEtdGFibGUtY29tcG9zYWJsZS1jb2x1bW4vbmFtZScsXG4gIHRhZ05hbWU6ICdzcGFuJyxcbiAgY2xhc3NOYW1lczogWydidG4nLCAnYnRuLXhzJywgJ2J0bi1kZWZhdWx0JywgJ25hbWUnXSxcbiAgYXR0cmlidXRlQmluZGluZ3M6IFsnY29udGVudGVkaXRhYmxlJ10sXG4gIGNvbnRlbnRlZGl0YWJsZTogJ2ZhbHNlJyxcbiAgbmFtZTogbnVsbCxcblxuICBrZXlEb3duOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvLyBPbiBFbnRlci9SZXR1cm5cbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIHZhciBuZXdOYW1lID0gdGhpcy4kKCkudGV4dCgpO1xuICAgICAgdGhpcy5zZXROYW1lKG5ld05hbWUpO1xuICAgIH1cbiAgfSxcblxuICBtYWRlRWRpdGFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZWRpdGFibGUgPSB0aGlzLmdldCgnY29udGVudGVkaXRhYmxlJyk7XG5cbiAgICBpZiAoZWRpdGFibGUpIHtcbiAgICAgIEVtYmVyLnJ1bi5zY2hlZHVsZSgnYWZ0ZXJSZW5kZXInLCB0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJCgpLmZvY3VzKCk7XG4gICAgICAgIHNlbGVjdFRleHQodGhpcy4kKCkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9Lm9ic2VydmVzKCdjb250ZW50ZWRpdGFibGUnKSxcblxuICBmb2N1c091dDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXdOYW1lID0gdGhpcy4kKCkudGV4dCgpO1xuICAgIHRoaXMuc2V0TmFtZShuZXdOYW1lKTtcbiAgfSxcblxuICBzZXROYW1lOiBmdW5jdGlvbiAobmV3TmFtZSkge1xuICAgIGlmICghRW1iZXIuaXNFbXB0eShuZXdOYW1lKSkge1xuICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKHtcbiAgICAgICAgbmFtZTogbmV3TmFtZSxcbiAgICAgICAgY29udGVudGVkaXRhYmxlOiAnZmFsc2UnXG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLiQoKS50ZXh0KHRoaXMuZ2V0KCduYW1lJykpO1xuICAgICAgdGhpcy5zZXQoJ2NvbnRlbnRlZGl0YWJsZScsICdmYWxzZScpO1xuICAgIH1cbiAgfSxcblxuICBhY3Rpb25zOiB7XG4gICAgbWFrZUVkaXRhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldCgnY29udGVudGVkaXRhYmxlJywgJ3RydWUnKTtcbiAgICB9XG4gIH0gXG59KTtcblxuZnVuY3Rpb24gc2VsZWN0VGV4dChlbGVtZW50KSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudCxcbiAgICBub2RlID0gZWxlbWVudC5nZXQoMCksXG4gICAgcmFuZ2UsIHNlbGVjdGlvbjtcbiAgXG4gIGlmIChkb2MuYm9keS5jcmVhdGVUZXh0UmFuZ2UpIHsgLy9tc1xuICAgIHJhbmdlID0gZG9jLmJvZHkuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgcmFuZ2UubW92ZVRvRWxlbWVudFRleHQobm9kZSk7XG4gICAgcmFuZ2Uuc2VsZWN0KCk7XG4gIH0gZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbikgeyAvL2FsbCBvdGhlcnNcbiAgICBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7ICAgICAgICBcbiAgICByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcbiAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgc2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVWaWV3O1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMTtcblxuXG4gIHN0YWNrMSA9IGhlbHBlcnMuX3RyaWFnZU11c3RhY2hlLmNhbGwoZGVwdGgwLCBcInZpZXcubmFtZVwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICBcbn0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMSwgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIHNlbGY9dGhpcztcblxuZnVuY3Rpb24gcHJvZ3JhbTEoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgIDxsaT48YSBocmVmPVxcXCIjXFxcIj48c3BhbiBcIik7XG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbihoZWxwZXJzWydiaW5kLWF0dHInXS5jYWxsKGRlcHRoMCwge2hhc2g6e1xuICAgICdjbGFzcyc6IChcIjpzcXVhcmUtaWNvbiB0eXBlXCIpLFxuICAgICd0aXRsZSc6IChcInR5cGVcIilcbiAgfSxoYXNoVHlwZXM6eydjbGFzcyc6IFwiU1RSSU5HXCIsJ3RpdGxlJzogXCJTVFJJTkdcIn0saGFzaENvbnRleHRzOnsnY2xhc3MnOiBkZXB0aDAsJ3RpdGxlJzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9KSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPjwvc3Bhbj4gXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzLl90cmlhZ2VNdXN0YWNoZS5jYWxsKGRlcHRoMCwgXCJhdHRyaWJ1dGVcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIjwvYT48L2xpPlxcbiAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKGhlbHBlcnMudmlldy5jYWxsKGRlcHRoMCwgXCJOYW1lVmlld0NsYXNzXCIsIHtoYXNoOntcbiAgICAnbmFtZSc6IChcImNvbnRlbnQubmFtZVwiKSxcbiAgICAndmlld05hbWUnOiAoXCJuYW1lVmlld1wiKVxuICB9LGhhc2hUeXBlczp7J25hbWUnOiBcIklEXCIsJ3ZpZXdOYW1lJzogXCJTVFJJTkdcIn0saGFzaENvbnRleHRzOnsnbmFtZSc6IGRlcHRoMCwndmlld05hbWUnOiBkZXB0aDB9LGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG5cXG48YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4teHMgYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXFxcIiBkYXRhLXRvZ2dsZT1cXFwiZHJvcGRvd25cXFwiPlxcbiAgPHNwYW4gY2xhc3M9XFxcImNhcmV0XFxcIj48L3NwYW4+XFxuICA8c3BhbiBjbGFzcz1cXFwic3Itb25seVxcXCI+VG9nZ2xlIERyb3Bkb3duPC9zcGFuPlxcbjwvYnV0dG9uPlxcblxcbjx1bCBjbGFzcz1cXFwiZHJvcGRvd24tbWVudVxcXCIgcm9sZT1cXFwibWVudVxcXCI+XFxuICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgXCJjb250ZW50LmF0dHJpYnV0ZXNcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oMSwgcHJvZ3JhbTEsIGRhdGEpLGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICA8bGkgY2xhc3M9XFxcImRpdmlkZXJcXFwiPjwvbGk+XFxuICA8bGk+PGEgaHJlZj1cXFwiI1xcXCIgXCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oaGVscGVycy5hY3Rpb24uY2FsbChkZXB0aDAsIFwiZWRpdE5hbWVcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJTVFJJTkdcIl0sZGF0YTpkYXRhfSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIj5FZGl0IE5hbWU8L2E+PC9saT5cXG48L3VsPlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsInZhciBEYXRhVGFibGVIZWFkZXJWaWV3ID0gcmVxdWlyZSgnLi9oZWFkZXInKTtcbkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgRGF0YVRhYmxlQ29tcG9uZW50ID0gRW1iZXIuQ29tcG9uZW50LmV4dGVuZCh7XG4gIGxpbWl0OiBudWxsLFxuICBhdXRvQ29tcG9zZTogdHJ1ZSxcbiAgY29sdW1uczogRW1iZXIuQSgpLFxuICBkYXRhc2V0OiBFbWJlci5BKCksXG4gIGNvbHVtbnNDb21wb3NhYmxlOiBmYWxzZSxcbiAgZGF0YVRhYmxlSGVhZGVyOiBEYXRhVGFibGVIZWFkZXJWaWV3LFxuICBzZWxlY3RlZFJvd3M6IEVtYmVyLmNvbXB1dGVkLmZpbHRlckJ5KCdkYXRhJywgJ3NlbGVjdGVkJywgdHJ1ZSksIFxuXG4gIHNlbGVjdGVkQ2hhbmdlZDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxlY3RlZCA9IHRoaXMuZ2V0KCdzZWxlY3RlZFJvd3MnKTtcbiAgICBcbiAgICBpZiAoc2VsZWN0ZWQgJiYgc2VsZWN0ZWQuZ2V0KCdsZW5ndGgnKSkge1xuICAgICAgdGhpcy5zZW5kQWN0aW9uKCdhY3Rpb24nLCBzZWxlY3RlZCk7XG4gICAgfVxuICB9Lm9ic2VydmVzKCdzZWxlY3RlZFJvd3MnKSxcblxuICBzZWxlY3RhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZ2V0KCdhY3Rpb24nKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBmYWxzZTtcbiAgfS5wcm9wZXJ0eSgpLFxuXG4gIHR5cGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCdkYXRhc2V0JykucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgY3VycmVudCkge1xuICAgICAgaWYgKCFwcmV2aW91cy5maW5kQnkoJ3R5cGUnLCBjdXJyZW50LmNvbnN0cnVjdG9yLnR5cGVLZXkpKSB7XG4gICAgICAgIHByZXZpb3VzLnB1c2hPYmplY3QoRW1iZXIuT2JqZWN0LmNyZWF0ZSh7XG4gICAgICAgICAgdHlwZTogY3VycmVudC5jb25zdHJ1Y3Rvci50eXBlS2V5LFxuICAgICAgICAgIGtleXM6IEVtYmVyLmtleXMoY3VycmVudC50b0pTT04oKSlcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgfSwgW10pO1xuICB9LnByb3BlcnR5KCdkYXRhc2V0JyksXG5cbiAgYXZhaWxhYmxlQ29sdW1uczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhbGlhc2VzID0gdGhpcy5nZXQoJ2NvbHVtbkFsaWFzZXMnKTtcblxuICAgIGlmIChhbGlhc2VzICYmICFFbWJlci5pc0VtcHR5KGFsaWFzZXMpKSB7XG4gICAgICByZXR1cm4gYWxpYXNlcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgZGF0YXNldCA9IHRoaXMuZ2V0KCdkYXRhc2V0Jyk7XG4gICAgICB2YXIgZ2VuZXJhdGVkID0gdGhpcy5nZW5lcmF0ZUNvbHVtbnMoZGF0YXNldCk7XG4gICAgICByZXR1cm4gZ2VuZXJhdGVkO1xuICAgIH1cbiAgfS5wcm9wZXJ0eSgpLFxuXG4gIGNvbHVtbnNOb3RJbkhlYWRlcjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhdmFpbGFibGUgPSB0aGlzLmdldCgnYXZhaWxhYmxlQ29sdW1ucycpO1xuICAgIHZhciBkaXNwbGF5ZWQgPSB0aGlzLmdldCgnY29sdW1ucycpO1xuXG4gICAgcmV0dXJuIGF2YWlsYWJsZS5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzLCBpdGVtKSB7XG4gICAgICBpZiAoIWRpc3BsYXllZC5maW5kQnkoJ2lkJywgaXRlbS5nZXQoJ2lkJykpKSB7XG4gICAgICAgIHByZXZpb3VzLnB1c2hPYmplY3QoaXRlbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICB9LCBbXSk7XG4gIH0ucHJvcGVydHkoJ2F2YWlsYWJsZUNvbHVtbnMnLCAnY29sdW1ucycpLFxuXG4gIHByZVBvcHVsYXRlQ29sdW1uczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxlY3RhYmxlID0gdGhpcy5nZXQoJ3NlbGVjdGFibGUnKTtcbiAgICB2YXIgZGVmYXVsdENvbHVtbnMgPSB0aGlzLmdldCgnZGVmYXVsdENvbHVtbnMnKTtcbiAgICB2YXIgYXZhaWxhYmxlQ29sdW1ucyA9IHRoaXMuZ2V0KCdhdmFpbGFibGVDb2x1bW5zJyk7XG4gICAgdmFyIGZpbHRlcmVkID0gYXZhaWxhYmxlQ29sdW1ucy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBpZCA9IGl0ZW0uZ2V0KCdpZCcpO1xuICAgICAgcmV0dXJuIGRlZmF1bHRDb2x1bW5zLmNvbnRhaW5zKGlkKTtcbiAgICB9KTtcblxuICAgIGlmIChzZWxlY3RhYmxlKSB7XG4gICAgICBmaWx0ZXJlZC51bnNoaWZ0KG51bGwpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0KCdjb2x1bW5zJywgZmlsdGVyZWQpO1xuICB9Lm9uKCdpbml0JyksXG5cbiAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBkYXRhc2V0ID0gdGhpcy5nZXQoJ2RhdGFzZXQnKTtcbiAgICB2YXIgY29sdW1ucyA9IHRoaXMuZ2V0KCdjb2x1bW5zJyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciByZXN1bHQ7XG5cbiAgICBkYXRhc2V0ID0gRW1iZXIuaXNBcnJheShkYXRhc2V0KSA/IGRhdGFzZXQgOiBkYXRhc2V0LmdldCgnY29udGVudCcpO1xuXG4gICAgaWYgKCFFbWJlci5pc0FycmF5KGRhdGFzZXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGFzZXQgaW5wdXQgbXVzdCBiZSBhbiBhcnJheS4nKTtcbiAgICB9XG5cbiAgICByZXN1bHQgPSBkYXRhc2V0Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIHR5cGUgPSBpdGVtLmNvbnN0cnVjdG9yLnR5cGVLZXk7XG5cbiAgICAgIGlmIChjb2x1bW5zKSB7XG4gICAgICAgIHJldHVybiBFbWJlci5PYmplY3QuY3JlYXRlKHtcbiAgICAgICAgICByb3c6IHNlbGYuY29sdW1uQXR0cmlidXRlTWFwKGNvbHVtbnMsIGl0ZW0sIHR5cGUpLFxuICAgICAgICAgIG1vZGVsOiBpdGVtLFxuICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciByb3cgPSBpdGVtLmdldCgncm93Jyk7XG5cbiAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgdmFyIGFsbEVtcHR5ID0gcm93LmV2ZXJ5KGZ1bmN0aW9uIChjb2wpIHtcbiAgICAgICAgICByZXR1cm4gRW1iZXIuaXNFbXB0eShjb2wpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChhbGxFbXB0eSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gIXJvdy5pc0FueSgnQHRoaXMnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0ucHJvcGVydHkoJ2RhdGFzZXQnLCAnY29sdW1ucy5sZW5ndGgnKSxcblxuICBjb2x1bW5BdHRyaWJ1dGVNYXA6IGZ1bmN0aW9uIChjb2x1bW5zLCByb3csIGRhdGFUeXBlKSB7XG4gICAgaWYgKCFyb3cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICAvL2NvbHVtbnNCeVR5cGUgPSBjb2x1bW5zLmZpbHRlckJ5KCdhdHRyaWJ1dGUudHlwZScsIGRhdGFUeXBlKSxcbiAgICAgIHJvd0pzb24gPSByb3cudG9KU09OKCksXG4gICAgICByb3dLZXlzID0gRW1iZXIua2V5cyhyb3dKc29uKSxcbiAgICAgIGNvbCA9IDAsXG4gICAgICBkYXRhQWRkZWQgPSAwLFxuICAgICAgY29sdW1uc0FkZGVkID0gW10sXG4gICAgICBrZXksIGF0dHIsXG4gICAgICBoZWFkZXIsIHByb3AsIGF0dHI7XG5cbiAgICBmb3IgKDsgY29sIDwgY29sdW1ucy5sZW5ndGg7IGNvbCsrKSB7XG4gICAgICBoZWFkZXIgPSBjb2x1bW5zLm9iamVjdEF0KGNvbCk7XG5cbiAgICAgIGlmICghaGVhZGVyKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZGF0YUFkZGVkID0gcmVzdWx0LmdldCgnbGVuZ3RoJyk7XG5cbiAgICAgIGlmIChoZWFkZXIuZ2V0KCdpc0NvbXBvc2VkJykpIHtcbiAgICAgICAgaGVhZGVyLmdldCgnYXR0cmlidXRlcycpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICBrZXkgPSBpdGVtLmdldCgndHlwZScpICsgJzonICsgaXRlbS5nZXQoJ2F0dHJpYnV0ZScpO1xuICAgICAgICAgIHByb3AgPSBpdGVtLmdldCgnYXR0cmlidXRlJyk7XG5cbiAgICAgICAgICBpZiAocm93SnNvbi5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiAhY29sdW1uc0FkZGVkLmNvbnRhaW5zKGtleSkgJiYgZGF0YVR5cGUgPT09IGl0ZW0uZ2V0KCd0eXBlJykpIHtcbiAgICAgICAgICAgIGNvbHVtbnNBZGRlZC5wdXNoKGtleSk7XG4gICAgICAgICAgICByZXN1bHQuc3BsaWNlKGNvbCwgMCwgcm93SnNvbltwcm9wXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzdWx0LmdldCgnbGVuZ3RoJykgPT09IGRhdGFBZGRlZCkge1xuICAgICAgICAgIHJlc3VsdC5zcGxpY2UoY29sLCAwLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBrZXkgPSBoZWFkZXIuZ2V0KCdpZCcpO1xuICAgICAgICBhdHRyID0gaGVhZGVyLmdldCgnYXR0cmlidXRlJyk7XG4gICAgICAgIHByb3AgPSBoZWFkZXIuZ2V0KCdhdHRyaWJ1dGUuYXR0cmlidXRlJyk7XG5cbiAgICAgICAgaWYgKHJvd0pzb24uaGFzT3duUHJvcGVydHkocHJvcCkgJiYgIWNvbHVtbnNBZGRlZC5jb250YWlucyhrZXkpICYmIGRhdGFUeXBlID09PSBhdHRyLmdldCgndHlwZScpKSB7XG4gICAgICAgICAgY29sdW1uc0FkZGVkLnB1c2goa2V5KTtcbiAgICAgICAgICByZXN1bHQuc3BsaWNlKGNvbCwgMCwgcm93SnNvbltwcm9wXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmVzdWx0LnNwbGljZShjb2wsIDAsICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgZ2VuZXJhdGVDb2x1bW5zOiBmdW5jdGlvbiAoZGF0YXNldCkge1xuICAgIHZhciB0eXBlcyA9IHRoaXMuZ2V0KCd0eXBlcycpO1xuICAgIHZhciBhdXRvQ29tcG9zZSA9IHRoaXMuZ2V0KCdhdXRvQ29tcG9zZScpO1xuXG4gICAgaWYgKHR5cGVzKSB7XG4gICAgICByZXR1cm4gdHlwZXMucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgY3VycmVudCwgaW5kZXgsIGFycikge1xuICAgICAgICB2YXIgdHlwZSA9IGN1cnJlbnQuZ2V0KCd0eXBlJyk7XG5cbiAgICAgICAgY3VycmVudC5nZXQoJ2tleXMnKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgdmFyIGlkID0gdHlwZSArICc6JyArIGl0ZW07XG4gICAgICAgICAgdmFyIG5hbWUgPSBpdGVtLmNhcGl0YWxpemUoKTtcbiAgICAgICAgICB2YXIgY29sdW1uID0gcHJldmlvdXMuZmluZEJ5KCduYW1lJywgbmFtZSk7XG4gICAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IEVtYmVyLk9iamVjdC5jcmVhdGUoe1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZTogaXRlbVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmIChhdXRvQ29tcG9zZSAmJiBjb2x1bW4pIHtcbiAgICAgICAgICAgIGNvbHVtbi5zZXQoJ2lzQ29tcG9zZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChjb2x1bW4uZ2V0KCdhdHRyaWJ1dGVzJykuY29udGFpbnMoY29sdW1uLmdldCgnYXR0cmlidXRlJykpKSB7XG4gICAgICAgICAgICAgIGNvbHVtbi5nZXQoJ2F0dHJpYnV0ZXMnKS5wdXNoT2JqZWN0KGNvbHVtbi5nZXQoJ2F0dHJpYnV0ZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbHVtbi5nZXQoJ2F0dHJpYnV0ZXMnKS5wdXNoT2JqZWN0KGF0dHJpYnV0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHJldmlvdXMucHVzaE9iamVjdChFbWJlci5PYmplY3QuY3JlYXRlKHtcbiAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbYXR0cmlidXRlXSxcbiAgICAgICAgICAgICAgYXR0cmlidXRlOiBhdHRyaWJ1dGVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICAgIH0sIFtdKTtcbiAgICB9XG4gIH0sXG5cbiAgYWN0aW9uczoge1xuICAgIGNsZWFyU2VsZWN0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZ2V0KCdkYXRhJykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpdGVtLnNldCgnc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFUYWJsZUNvbXBvbmVudDtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBjb21waWxlciA9IEVtYmVyLkhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIGFub255bW91cyhIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbnRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBFbWJlci5IYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazEsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbiwgc2VsZj10aGlzO1xuXG5mdW5jdGlvbiBwcm9ncmFtMShkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazE7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gIFwiKTtcbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgXCJ2aWV3LnBhcmVudFZpZXcuY29sdW1uc0NvbXBvc2FibGVcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYucHJvZ3JhbSg0LCBwcm9ncmFtNCwgZGF0YSksZm46c2VsZi5wcm9ncmFtKDIsIHByb2dyYW0yLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuZnVuY3Rpb24gcHJvZ3JhbTIoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgaGVscGVyLCBvcHRpb25zO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgIFwiKTtcbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzWydkYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uJ10gfHwgKGRlcHRoMCAmJiBkZXB0aDBbJ2RhdGEtdGFibGUtY29tcG9zYWJsZS1jb2x1bW4nXSksb3B0aW9ucz17aGFzaDp7XG4gICAgJ2NvbnRlbnQnOiAoXCJ2aWV3LmNvbnRlbnRcIilcbiAgfSxoYXNoVHlwZXM6eydjb250ZW50JzogXCJJRFwifSxoYXNoQ29udGV4dHM6eydjb250ZW50JzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImRhdGEtdGFibGUtY29tcG9zYWJsZS1jb2x1bW5cIiwgb3B0aW9ucykpKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG5mdW5jdGlvbiBwcm9ncmFtNChkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBoZWxwZXIsIG9wdGlvbnM7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgXCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnNbJ2RhdGEtdGFibGUtY29sdW1uJ10gfHwgKGRlcHRoMCAmJiBkZXB0aDBbJ2RhdGEtdGFibGUtY29sdW1uJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb250ZW50JzogKFwidmlldy5jb250ZW50XCIpLFxuICAgICdjbGFzcyc6IChcImJ0biBidG4teHMgYnRuLWRlZmF1bHRcIilcbiAgfSxoYXNoVHlwZXM6eydjb250ZW50JzogXCJJRFwiLCdjbGFzcyc6IFwiU1RSSU5HXCJ9LGhhc2hDb250ZXh0czp7J2NvbnRlbnQnOiBkZXB0aDAsJ2NsYXNzJzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImRhdGEtdGFibGUtY29sdW1uXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cblxuICBzdGFjazEgPSBoZWxwZXJzWydpZiddLmNhbGwoZGVwdGgwLCBcInZpZXcuY29udGVudFwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5ub29wLGZuOnNlbGYucHJvZ3JhbSgxLCBwcm9ncmFtMSwgZGF0YSksY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJFbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZS9jb2xsZWN0aW9uLWl0ZW0nXSA9IHJlcXVpcmUoJy4vY29sbGVjdGlvbi1pdGVtLmhicycpO1xuXG52YXIgQ29sbGVjdGlvbkl0ZW1WaWV3ID0gRW1iZXIuVmlldy5leHRlbmQoe1xuICB0ZW1wbGF0ZU5hbWU6ICdjb21wb25lbnRzL2RhdGEtdGFibGUvY29sbGVjdGlvbi1pdGVtJyxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnZHJvcFNpZGUnLCAnY29sdW1uVHlwZSddLFxuICB0YWdOYW1lOiAndGgnLFxuICBkcm9wU2lkZTogbnVsbCxcbiAgdGFyZ2V0OiBFbWJlci5jb21wdXRlZC5hbGlhcygncGFyZW50VmlldycpLFxuXG4gIGNvbHVtblR5cGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWQgPSB0aGlzLmdldCgnY29udGVudC5pZCcpO1xuICAgIGlkID0gaWQgPyBpZC5zcGxpdCgnOicpLmpvaW4oJy0nKSA6IGlkO1xuICAgIHZhciBwb3N0Zml4ID0gJy1jb2x1bW4nO1xuICAgIHJldHVybiBpZCA/IChpZCArIHBvc3RmaXgpIDogJ3NlbGVjdGFibGUnICsgcG9zdGZpeDtcbiAgfS5wcm9wZXJ0eSgnY29udGVudCcpLFxuXG4gIGRyYWdPdmVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuZ2V0KCdjb250ZW50JykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBFbWJlci5ydW4udGhyb3R0bGUodGhpcywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQub2Zmc2V0WCA+ICh0aGlzLiQoKS53aWR0aCgpIC8gMikpIHtcbiAgICAgICAgdGhpcy5zZXQoJ2Ryb3BTaWRlJywgJ3JpZ2h0Jyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXQoJ2Ryb3BTaWRlJywgJ2xlZnQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXQoJ3BhcmVudFZpZXcub3ZlcicsIHRydWUpO1xuICAgIH0sIDMwMCk7XG4gIH0sXG5cbiAgZHJhZ0xlYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXQoJ2Ryb3BTaWRlJywgbnVsbCk7XG4gICAgdGhpcy5zZXQoJ3BhcmVudFZpZXcub3ZlcicsIGZhbHNlKTtcbiAgfSxcblxuICBkcm9wOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmdldCgnY29udGVudCcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNpZGVEcm9wcGVkID0gdGhpcy5nZXQoJ2Ryb3BTaWRlJyk7XG4gICAgdmFyIHJhd0RhdGEgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgaWYgKHJhd0RhdGEpIHtcbiAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyYXdEYXRhKTtcbiAgICAgIHZhciBjb2x1bW4gPSB0aGlzLmdldCgncGFyZW50Vmlldy5wYXJlbnRWaWV3LmF2YWlsYWJsZUNvbHVtbnMnKS5maW5kQnkoJ2lkJywgZGF0YS5pZCk7XG5cbiAgICAgIGlmIChzaWRlRHJvcHBlZCA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIHRoaXMuc2VuZCgnaW5zZXJ0QmVmb3JlJywgdGhpcy5nZXQoJ2NvbnRlbnQnKSwgY29sdW1uKTsgICBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnNlbmQoJ2luc2VydEFmdGVyJywgdGhpcy5nZXQoJ2NvbnRlbnQnKSwgY29sdW1uKTsgICBcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldCgnZHJvcFNpZGUnLCBudWxsKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvbkl0ZW1WaWV3O1xuIiwidmFyIENvbGxlY3Rpb25JdGVtVmlldyA9IHJlcXVpcmUoJy4vY29sbGVjdGlvbi1pdGVtJyk7XG5FbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZS9oZWFkZXInXSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUuaGJzJyk7XG5cbnZhciBEYXRhVGFibGVIZWFkZXJDb2xsZWN0aW9uID0gRW1iZXIuQ29sbGVjdGlvblZpZXcuZXh0ZW5kKHtcbiAgdGFnTmFtZTogJ3RyJyxcbiAgdGVtcGxhdGVOYW1lOiAnY29tcG9uZW50cy9kYXRhLXRhYmxlL2hlYWRlcicsXG4gIGNvbnRlbnQ6IEVtYmVyLmNvbXB1dGVkLmFsaWFzKCdwYXJlbnRWaWV3LmNvbHVtbnMnKSxcbiAgbGltaXQ6IEVtYmVyLmNvbXB1dGVkLmFsaWFzKCdwYXJlbnRWaWV3LmxpbWl0JyksXG4gIGNsYXNzTmFtZUJpbmRpbmdzOiBbJ292ZXInXSxcbiAgY29sdW1uc05vdEluSGVhZGVyOiBFbWJlci5jb21wdXRlZC5hbGlhcygncGFyZW50Vmlldy5iaW5Db21wb25lbnQuY29sdW1ucycpLFxuICBjb2x1bW5zQ29tcG9zYWJsZTogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ3BhcmVudFZpZXcuY29sdW1uc0NvbXBvc2FibGUnKSxcbiAgaXRlbVZpZXdDbGFzczogQ29sbGVjdGlvbkl0ZW1WaWV3LFxuXG4gIGRyYWdPdmVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9LFxuXG4gIGRyYWdFbnRlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgfSxcblxuICBkcmFnTGVhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfSxcblxuICBkcm9wOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCBmYWxzZSk7XG4gIH0sXG5cbiAgaW5zZXJ0QXQ6IGZ1bmN0aW9uIChleGlzdGluZywgZHJvcHBlZCwgYWRkKSB7XG4gICAgdmFyIGNvbHVtbnMgPSB0aGlzLmdldCgnY29udGVudCcpO1xuICAgIHZhciBjb2x1bW5zTm90SW5IZWFkZXIgPSB0aGlzLmdldCgnY29sdW1uc05vdEluSGVhZGVyJyk7XG4gICAgdmFyIGV4aXN0aW5nSW5kZXggPSBjb2x1bW5zLmluZGV4T2YoZXhpc3RpbmcpO1xuICAgIHZhciBkdXBsaWNhdGUgPSBjb2x1bW5zLmZpbmRCeSgnaWQnLCBkcm9wcGVkLmdldCgnaWQnKSk7XG4gICAgdmFyIHRvdGFsID0gdGhpcy5nZXQoJ2NvbnRlbnQubGVuZ3RoJyk7XG4gICAgdmFyIGxpbWl0ID0gdGhpcy5nZXQoJ2xpbWl0Jyk7XG4gICAgdmFyIG1vZGlmZWRJbmRleDtcbiAgICB2YXIgZHVwSW5kZXg7XG5cbiAgICBpZiAoZXhpc3RpbmcuZ2V0KCdpZCcpID09PSBkcm9wcGVkLmdldCgnaWQnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG1vZGlmaWVkSW5kZXggPSBleGlzdGluZ0luZGV4ICsgYWRkO1xuICAgIH1cblxuICAgIGlmIChjb2x1bW5zKSB7XG4gICAgICAvLyBtb3ZlIGNvbHVtbiB0byBuZXcgaW5kZXhcbiAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgZHVwSW5kZXggPSBjb2x1bW5zLmluZGV4T2YoZHVwbGljYXRlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBkdXBJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBjb2x1bW5zLmFycmF5Q29udGVudFdpbGxDaGFuZ2UoZHVwSW5kZXgsIDEsIDApO1xuICAgICAgICAgIGNvbHVtbnMuc3BsaWNlKGR1cEluZGV4LCAxKTtcbiAgICAgICAgICB0aGlzLnNldCgnY29udGVudCcsIGNvbHVtbnMpO1xuICAgICAgICAgIGNvbHVtbnMuYXJyYXlDb250ZW50RGlkQ2hhbmdlKGR1cEluZGV4LCAxLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAobGltaXQgJiYgdG90YWwgPT09IGxpbWl0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQWRkIHRvIGVuZCwgaW5zdGVhZCBvZiBzcGxpY2luZ1xuICAgICAgaWYgKG1vZGlmaWVkSW5kZXggPiBjb2x1bW5zLmxlbmd0aCkge1xuICAgICAgICBjb2x1bW5zLnB1c2hPYmplY3QoZHJvcHBlZCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29sdW1ucy5hcnJheUNvbnRlbnRXaWxsQ2hhbmdlKG1vZGlmaWVkSW5kZXgsIDAsIDEpO1xuICAgICAgICBjb2x1bW5zLnNwbGljZShtb2RpZmllZEluZGV4LCAwLCBkcm9wcGVkKTtcbiAgICAgICAgdGhpcy5zZXQoJ2NvbnRlbnQnLCBjb2x1bW5zKTtcbiAgICAgICAgY29sdW1ucy5hcnJheUNvbnRlbnREaWRDaGFuZ2UobW9kaWZpZWRJbmRleCwgMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkcm9wcGVkKSB7XG4gICAgICAgIHRoaXMuc2V0KCdjb2x1bW5zTm90SW5IZWFkZXInLCBjb2x1bW5zTm90SW5IZWFkZXIud2l0aG91dChkcm9wcGVkKSk7XG4gICAgICB9XG4gICAgfSBcbiAgfSxcblxuICBhY3Rpb25zOiB7XG4gICAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoZXhpc3RpbmcsIGRyb3BwZWQpIHtcbiAgICAgIHRoaXMuaW5zZXJ0QXQoZXhpc3RpbmcsIGRyb3BwZWQsIDApOyAgXG4gICAgfSxcblxuICAgIGluc2VydEFmdGVyOiBmdW5jdGlvbiAoZXhpc3RpbmcsIGRyb3BwZWQpIHtcbiAgICAgIHRoaXMuaW5zZXJ0QXQoZXhpc3RpbmcsIGRyb3BwZWQsIDEpOyAgXG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYXRhVGFibGVIZWFkZXJDb2xsZWN0aW9uO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJyc7XG5cblxuICByZXR1cm4gYnVmZmVyO1xuICBcbn0pO1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMSwgaGVscGVyLCBvcHRpb25zLCBoZWxwZXJNaXNzaW5nPWhlbHBlcnMuaGVscGVyTWlzc2luZywgZXNjYXBlRXhwcmVzc2lvbj10aGlzLmVzY2FwZUV4cHJlc3Npb24sIHNlbGY9dGhpcztcblxuZnVuY3Rpb24gcHJvZ3JhbTEoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgICAgPHRyPlxcbiAgICAgICAgXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzWydpZiddLmNhbGwoZGVwdGgwLCBcInNlbGVjdGFibGVcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYubm9vcCxmbjpzZWxmLnByb2dyYW0oMiwgcHJvZ3JhbTIsIGRhdGEpLGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuXFxuICAgICAgICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgXCJpdGVtLnJvd1wiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5ub29wLGZuOnNlbGYucHJvZ3JhbSg0LCBwcm9ncmFtNCwgZGF0YSksY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICA8L3RyPlxcbiAgICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cbmZ1bmN0aW9uIHByb2dyYW0yKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICAgICAgICA8dGQ+XCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnMuaW5wdXQgfHwgKGRlcHRoMCAmJiBkZXB0aDAuaW5wdXQpLG9wdGlvbnM9e2hhc2g6e1xuICAgICd0eXBlJzogKFwiY2hlY2tib3hcIiksXG4gICAgJ2NoZWNrZWQnOiAoXCJpdGVtLnNlbGVjdGVkXCIpXG4gIH0saGFzaFR5cGVzOnsndHlwZSc6IFwiU1RSSU5HXCIsJ2NoZWNrZWQnOiBcIklEXCJ9LGhhc2hDb250ZXh0czp7J3R5cGUnOiBkZXB0aDAsJ2NoZWNrZWQnOiBkZXB0aDB9LGNvbnRleHRzOltdLHR5cGVzOltdLGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiaW5wdXRcIiwgb3B0aW9ucykpKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCI8L3RkPlxcbiAgICAgICAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbmZ1bmN0aW9uIHByb2dyYW00KGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICAgICAgICA8dGQ+XCIpO1xuICBzdGFjazEgPSBoZWxwZXJzLl90cmlhZ2VNdXN0YWNoZS5jYWxsKGRlcHRoMCwgXCJcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIjwvdGQ+XFxuICAgICAgICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cblxuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnNbJ2RhdGEtdGFibGUtYmluJ10gfHwgKGRlcHRoMCAmJiBkZXB0aDBbJ2RhdGEtdGFibGUtYmluJ10pLG9wdGlvbnM9e2hhc2g6e1xuICAgICdjb2x1bW5zJzogKFwiY29sdW1uc05vdEluSGVhZGVyXCIpLFxuICAgICd2aWV3TmFtZSc6IChcImJpbkNvbXBvbmVudFwiKSxcbiAgICAnY29sdW1uc0NvbXBvc2FibGUnOiAoXCJjb2x1bW5zQ29tcG9zYWJsZVwiKVxuICB9LGhhc2hUeXBlczp7J2NvbHVtbnMnOiBcIklEXCIsJ3ZpZXdOYW1lJzogXCJTVFJJTkdcIiwnY29sdW1uc0NvbXBvc2FibGUnOiBcIklEXCJ9LGhhc2hDb250ZXh0czp7J2NvbHVtbnMnOiBkZXB0aDAsJ3ZpZXdOYW1lJzogZGVwdGgwLCdjb2x1bW5zQ29tcG9zYWJsZSc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJkYXRhLXRhYmxlLWJpblwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbjx0YWJsZSBjbGFzcz1cXFwidGFibGUgdGFibGUtcmVzcG9uc2l2ZSB0YWJsZS1ob3ZlciB0YWJsZS1jb25kZW5zZWRcXFwiPlxcbiAgPHRoZWFkPlxcbiAgICBcIik7XG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbihoZWxwZXJzLnZpZXcuY2FsbChkZXB0aDAsIFwiZGF0YVRhYmxlSGVhZGVyXCIsIHtoYXNoOntcbiAgICAndmlld05hbWUnOiAoXCJjb2x1bW5Db2xsZWN0aW9uXCIpXG4gIH0saGFzaFR5cGVzOnsndmlld05hbWUnOiBcIlNUUklOR1wifSxoYXNoQ29udGV4dHM6eyd2aWV3TmFtZSc6IGRlcHRoMH0sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgPC90aGVhZD5cXG4gIDx0Ym9keT5cXG4gICAgXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAsIFwiaXRlbVwiLCBcImluXCIsIFwiZGF0YVwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5ub29wLGZuOnNlbGYucHJvZ3JhbSgxLCBwcm9ncmFtMSwgZGF0YSksY29udGV4dHM6W2RlcHRoMCxkZXB0aDAsZGVwdGgwXSx0eXBlczpbXCJJRFwiLFwiSURcIixcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICA8L3Rib2R5PlxcbjwvdGFibGU+XFxuXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICBcbn0pO1xuIiwidmFyIERhdGFUYWJsZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vZGF0YS10YWJsZS9jb21wb25lbnQnKTtcbnZhciBEYXRhVGFibGVCaW5Db21wb25lbnQgPSByZXF1aXJlKCcuL2RhdGEtdGFibGUtYmluL2NvbXBvbmVudCcpO1xudmFyIERhdGFUYWJsZUNvbHVtbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vZGF0YS10YWJsZS1jb2x1bW4vY29tcG9uZW50Jyk7XG52YXIgRGF0YVRhYmxlQ29tcG9zYWJsZUNvbHVtbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbi9jb21wb25lbnQnKTtcblxuRW1iZXIuQXBwbGljYXRpb24uaW5pdGlhbGl6ZXIoe1xuICBuYW1lOiAnZGF0YS10YWJsZScsXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oY29udGFpbmVyLCBhcHBsaWNhdGlvbikge1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcignY29tcG9uZW50OmRhdGEtdGFibGUnLCBEYXRhVGFibGVDb21wb25lbnQsIHsgc2luZ2xldG9uOiBmYWxzZSB9KTtcbiAgICBjb250YWluZXIucmVnaXN0ZXIoJ2NvbXBvbmVudDpkYXRhLXRhYmxlLWJpbicsIERhdGFUYWJsZUJpbkNvbXBvbmVudCwgeyBzaW5nbGV0b246IGZhbHNlIH0pO1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcignY29tcG9uZW50OmRhdGEtdGFibGUtY29sdW1uJywgRGF0YVRhYmxlQ29sdW1uQ29tcG9uZW50LCB7IHNpbmdsZXRvbjogZmFsc2UgfSk7XG4gICAgY29udGFpbmVyLnJlZ2lzdGVyKCdjb21wb25lbnQ6ZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbicsIERhdGFUYWJsZUNvbXBvc2FibGVDb2x1bW5Db21wb25lbnQsIHsgc2luZ2xldG9uOiBmYWxzZSB9KTtcbiAgfVxufSk7XG4iXX0=
