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

  initialColumns: function () {
    var defaultColumns = this.get('defaultColumns');
    var availableColumns = this.get('availableColumns');
    var counter = 0;
    var limit = this.get('limit');
    var hasDefaults = (defaultColumns && defaultColumns.length);

    var filtered = availableColumns.filter(function (item) {
      var id = item.get('id');
      var result;

      if (hasDefaults) {
        result = defaultColumns.contains(id);
      }
      else {
        result = (!limit || counter < limit ? true : false);
        counter++;
      }

      return result;
    });

    return filtered;
  }.property('availableColumns'),

  prePopulateColumns: function () {
    var selectable = this.get('selectable');
    var filtered = this.get('initialColumns');

    if (selectable && filtered) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1iaW4vY29tcG9uZW50LmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWJpbi90ZW1wbGF0ZS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUtY29sdW1uL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1jb2x1bW4vdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL2NvbXBvbmVudC5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbi9uYW1lL2luZGV4LmpzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL25hbWUvdGVtcGxhdGUuaGJzIiwiL1VzZXJzL2lyYWRjaGVua28vc2FuZGJveC9kYXRhLXRhYmxlL3NyYy9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL3RlbXBsYXRlLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9jb21wb25lbnQuanMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUvaGVhZGVyL2NvbGxlY3Rpb24taXRlbS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUvaGVhZGVyL2NvbGxlY3Rpb24taXRlbS5qcyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS9oZWFkZXIvaW5kZXguanMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2RhdGEtdGFibGUvaGVhZGVyL3RlbXBsYXRlLmhicyIsIi9Vc2Vycy9pcmFkY2hlbmtvL3NhbmRib3gvZGF0YS10YWJsZS9zcmMvZGF0YS10YWJsZS90ZW1wbGF0ZS5oYnMiLCIvVXNlcnMvaXJhZGNoZW5rby9zYW5kYm94L2RhdGEtdGFibGUvc3JjL2luaXRpYWxpemVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlLWJpbiddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUJpbkNvbXBvbmVudCA9IEVtYmVyLkNvbXBvbmVudC5leHRlbmQoe1xuICBjbGFzc05hbWVzOiBbJ2hlYWRlci1pdGVtLWJpbiddLFxuICBjbGFzc05hbWVCaW5kaW5nczogWydvdmVyJ10sXG5cbiAgZHJhZ092ZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHRoaXMuc2V0KCdvdmVyJywgdHJ1ZSk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSxcblxuICBkcm9wOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2FwcGxpY2F0aW9uL2pzb24nKSk7XG4gICAgdmFyIGNvbHVtbnMgPSB0aGlzLmdldCgnY29sdW1ucycpO1xuICAgIHZhciBoZWFkZXJDb2x1bW5zID0gdGhpcy5nZXQoJ3BhcmVudFZpZXcuY29sdW1ucycpO1xuICAgIHZhciBkZWZhdWx0Q29sdW1ucyA9IHRoaXMuZ2V0KCdwYXJlbnRWaWV3LmRlZmF1bHRDb2x1bW5zJyk7XG4gICAgdmFyIGNvbHVtbjtcblxuICAgIGlmICghY29sdW1ucy5maW5kQnkoJ2lkJywgZGF0YS5pZCkgJiYgaGVhZGVyQ29sdW1ucy53aXRob3V0KGhlYWRlckNvbHVtbnMuZmluZEJ5KCdpZCcsIGRhdGEuaWQpKS5jb21wYWN0KCkubGVuZ3RoID49IDEpIHtcbiAgICAgIGNvbHVtbiA9IHRoaXMuZ2V0KCdwYXJlbnRWaWV3LmF2YWlsYWJsZUNvbHVtbnMnKS5maW5kQnkoJ2lkJywgZGF0YS5pZCk7XG5cbiAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgdGhpcy5nZXQoJ2NvbHVtbnMnKS5wdXNoT2JqZWN0KGNvbHVtbik7XG4gICAgICAgIHRoaXMuc2V0KCdwYXJlbnRWaWV3LmNvbHVtbnMnLCBoZWFkZXJDb2x1bW5zLndpdGhvdXQoY29sdW1uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXQoJ292ZXInLCBmYWxzZSk7XG4gIH0sXG5cbiAgZHJhZ0VudGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXQoJ292ZXInLCB0cnVlKTtcbiAgfSxcblxuICBkcmFnTGVhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVRhYmxlQmluQ29tcG9uZW50O1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMSwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBzZWxmPXRoaXM7XG5cbmZ1bmN0aW9uIHByb2dyYW0xKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnNbJ2lmJ10uY2FsbChkZXB0aDAsIFwiY29sdW1uc0NvbXBvc2FibGVcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxpbnZlcnNlOnNlbGYucHJvZ3JhbSg0LCBwcm9ncmFtNCwgZGF0YSksZm46c2VsZi5wcm9ncmFtKDIsIHByb2dyYW0yLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5mdW5jdGlvbiBwcm9ncmFtMihkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBoZWxwZXIsIG9wdGlvbnM7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICA8bGk+XCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnNbJ2RhdGEtdGFibGUtY29tcG9zYWJsZS1jb2x1bW4nXSB8fCAoZGVwdGgwICYmIGRlcHRoMFsnZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbiddKSxvcHRpb25zPXtoYXNoOntcbiAgICAnY29udGVudCc6IChcImNvbHVtblwiKVxuICB9LGhhc2hUeXBlczp7J2NvbnRlbnQnOiBcIklEXCJ9LGhhc2hDb250ZXh0czp7J2NvbnRlbnQnOiBkZXB0aDB9LGNvbnRleHRzOltdLHR5cGVzOltdLGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtblwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIjwvbGk+XFxuICAgIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG5mdW5jdGlvbiBwcm9ncmFtNChkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBoZWxwZXIsIG9wdGlvbnM7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCIgXFxuICAgICAgPGxpPlwiKTtcbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKChoZWxwZXIgPSBoZWxwZXJzWydkYXRhLXRhYmxlLWNvbHVtbiddIHx8IChkZXB0aDAgJiYgZGVwdGgwWydkYXRhLXRhYmxlLWNvbHVtbiddKSxvcHRpb25zPXtoYXNoOntcbiAgICAnY29udGVudCc6IChcImNvbHVtblwiKSxcbiAgICAnY2xhc3MnOiAoXCJidG4gYnRuLXhzIGJ0bi1kZWZhdWx0XCIpXG4gIH0saGFzaFR5cGVzOnsnY29udGVudCc6IFwiSURcIiwnY2xhc3MnOiBcIlNUUklOR1wifSxoYXNoQ29udGV4dHM6eydjb250ZW50JzogZGVwdGgwLCdjbGFzcyc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJkYXRhLXRhYmxlLWNvbHVtblwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIjwvbGk+XFxuICAgIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG5mdW5jdGlvbiBwcm9ncmFtNihkZXB0aDAsZGF0YSkge1xuICBcbiAgXG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgPGxpPjxzcGFuIGNsYXNzPVxcXCJ0ZXh0LW11dGVkXFxcIj5ObyBhdHRyaWJ1dGVzIGF2YWlsYWJsZS48L3NwYW4+PC9saT5cXG4gIFwiKTtcbiAgfVxuXG4gIGRhdGEuYnVmZmVyLnB1c2goXCI8dWwgY2xhc3M9XFxcIndlbGwgd2VsbC1zbSBsaXN0LXVuc3R5bGVkIGxpc3QtaW5saW5lXFxcIj5cXG4gIFwiKTtcbiAgc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwLCBcImNvbHVtblwiLCBcImluXCIsIFwiY29sdW1uc1wiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5wcm9ncmFtKDYsIHByb2dyYW02LCBkYXRhKSxmbjpzZWxmLnByb2dyYW0oMSwgcHJvZ3JhbTEsIGRhdGEpLGNvbnRleHRzOltkZXB0aDAsZGVwdGgwLGRlcHRoMF0sdHlwZXM6W1wiSURcIixcIklEXCIsXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbjwvdWw+XFxuXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICBcbn0pO1xuIiwiRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUtY29sdW1uJ10gPSByZXF1aXJlKCcuL3RlbXBsYXRlLmhicycpO1xuXG52YXIgRGF0YVRhYmxlQ29sdW1uQ29tcG9uZW50ID0gRW1iZXIuQ29tcG9uZW50LmV4dGVuZCh7XG4gIGNsYXNzTmFtZXM6IFsnZHQtdHlwZSddLFxuICBhdHRyaWJ1dGVCaW5kaW5nczogWydkcmFnZ2FibGUnXSxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnZGF0YVR5cGUnXSxcbiAgZHJhZ2dhYmxlOiAndHJ1ZScsXG4gIGRhdGFUeXBlOiBFbWJlci5jb21wdXRlZC5hbGlhcygnY29udGVudC5hdHRyaWJ1dGUudHlwZScpLFxuXG4gIGRyYWdTdGFydDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBpZDogdGhpcy5nZXQoJ2NvbnRlbnQuaWQnKVxuICAgIH07XG5cbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnYXBwbGljYXRpb24vanNvbicsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVRhYmxlQ29sdW1uQ29tcG9uZW50O1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMTtcblxuXG4gIHN0YWNrMSA9IGhlbHBlcnMuX3RyaWFnZU11c3RhY2hlLmNhbGwoZGVwdGgwLCBcImNvbnRlbnQubmFtZVwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiIFxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsInZhciBOYW1lVmlldyA9IHJlcXVpcmUoJy4vbmFtZScpO1xudmFyIENvbHVtbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2RhdGEtdGFibGUtY29sdW1uL2NvbXBvbmVudCcpO1xuRW1iZXIuVEVNUExBVEVTWydjb21wb25lbnRzL2RhdGEtdGFibGUtY29tcG9zYWJsZS1jb2x1bW4nXSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUuaGJzJyk7XG5cbnZhciBEYXRhVGFibGVDb21wb3NhYmxlQ29sdW1uQ29tcG9uZW50ID0gQ29sdW1uQ29tcG9uZW50LmV4dGVuZCh7XG4gIGNsYXNzTmFtZXM6IFsnYnRuLWdyb3VwJ10sXG4gIE5hbWVWaWV3Q2xhc3M6IE5hbWVWaWV3LFxuXG4gIGZvY3VzT3V0OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgJG5hbWUgPSBFbWJlci4kKGV2ZW50LnRhcmdldCk7XG4gICAgaWYgKCRuYW1lLmhhc0NsYXNzKCduYW1lJykpIHtcbiAgICAgIHRoaXMuc2V0KCdjb250ZW50Lm5hbWUnLCAkbmFtZS50ZXh0KCkpOyBcbiAgICAgICRuYW1lLmF0dHIoJ2NvbnRlbnRlZGl0YWJsZScsIGZhbHNlKTtcbiAgICB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSxcblxuICBkcmFnU3RhcnQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBkYXRhID0ge1xuICAgICAgaWQ6IHRoaXMuZ2V0KCdjb250ZW50LmlkJyksXG4gICAgICBhdHRyaWJ1dGVzOiB0aGlzLmdldCgnY29udGVudC5hdHRyaWJ1dGVzJylcbiAgICB9O1xuXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ2FwcGxpY2F0aW9uL2pzb24nLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH0sXG5cbiAgZHJvcDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIHJhd0RhdGEgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgaWYgKHJhd0RhdGEpIHtcbiAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyYXdEYXRhKTtcbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5nZXQoJ2NvbnRlbnQuYXR0cmlidXRlcycpO1xuICAgICAgdmFyIGNvbHVtbnMgPSB0aGlzLmdldCgncGFyZW50Vmlldy5jb2x1bW5zJyk7XG4gICAgICB2YXIgZHJvcHBlZENvbHVtbiA9IGNvbHVtbnMuZmluZEJ5KCdpZCcsIGRhdGEuaWQpO1xuXG4gICAgICB0aGlzLnNldCgnY29udGVudC5hdHRyaWJ1dGVzJywgYXR0cmlidXRlcy5jb25jYXQoZGF0YS5hdHRyaWJ1dGVzKS51bmlxKCkpO1xuICAgIH1cbiAgfSxcblxuICBhY3Rpb25zOiB7XG4gICAgZWRpdE5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZ2V0KCduYW1lVmlldycpLnNlbmQoJ21ha2VFZGl0YWJsZScpO1xuICAgIH1cbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVRhYmxlQ29tcG9zYWJsZUNvbHVtbkNvbXBvbmVudDtcbiIsIkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL25hbWUnXSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUuaGJzJyk7XG5cbnZhciBOYW1lVmlldyA9IEVtYmVyLlZpZXcuZXh0ZW5kKHtcbiAgdGVtcGxhdGVOYW1lOiAnY29tcG9uZW50cy9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL25hbWUnLFxuICB0YWdOYW1lOiAnc3BhbicsXG4gIGNsYXNzTmFtZXM6IFsnYnRuJywgJ2J0bi14cycsICdidG4tZGVmYXVsdCcsICduYW1lJ10sXG4gIGF0dHJpYnV0ZUJpbmRpbmdzOiBbJ2NvbnRlbnRlZGl0YWJsZSddLFxuICBjb250ZW50ZWRpdGFibGU6ICdmYWxzZScsXG4gIG5hbWU6IG51bGwsXG5cbiAga2V5RG93bjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgLy8gT24gRW50ZXIvUmV0dXJuXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICB2YXIgbmV3TmFtZSA9IHRoaXMuJCgpLnRleHQoKTtcbiAgICAgIHRoaXMuc2V0TmFtZShuZXdOYW1lKTtcbiAgICB9XG4gIH0sXG5cbiAgbWFkZUVkaXRhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVkaXRhYmxlID0gdGhpcy5nZXQoJ2NvbnRlbnRlZGl0YWJsZScpO1xuXG4gICAgaWYgKGVkaXRhYmxlKSB7XG4gICAgICBFbWJlci5ydW4uc2NoZWR1bGUoJ2FmdGVyUmVuZGVyJywgdGhpcywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiQoKS5mb2N1cygpO1xuICAgICAgICBzZWxlY3RUZXh0KHRoaXMuJCgpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfS5vYnNlcnZlcygnY29udGVudGVkaXRhYmxlJyksXG5cbiAgZm9jdXNPdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV3TmFtZSA9IHRoaXMuJCgpLnRleHQoKTtcbiAgICB0aGlzLnNldE5hbWUobmV3TmFtZSk7XG4gIH0sXG5cbiAgc2V0TmFtZTogZnVuY3Rpb24gKG5ld05hbWUpIHtcbiAgICBpZiAoIUVtYmVyLmlzRW1wdHkobmV3TmFtZSkpIHtcbiAgICAgIHRoaXMuc2V0UHJvcGVydGllcyh7XG4gICAgICAgIG5hbWU6IG5ld05hbWUsXG4gICAgICAgIGNvbnRlbnRlZGl0YWJsZTogJ2ZhbHNlJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy4kKCkudGV4dCh0aGlzLmdldCgnbmFtZScpKTtcbiAgICAgIHRoaXMuc2V0KCdjb250ZW50ZWRpdGFibGUnLCAnZmFsc2UnKTtcbiAgICB9XG4gIH0sXG5cbiAgYWN0aW9uczoge1xuICAgIG1ha2VFZGl0YWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXQoJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyk7XG4gICAgfVxuICB9IFxufSk7XG5cbmZ1bmN0aW9uIHNlbGVjdFRleHQoZWxlbWVudCkge1xuICB2YXIgZG9jID0gZG9jdW1lbnQsXG4gICAgbm9kZSA9IGVsZW1lbnQuZ2V0KDApLFxuICAgIHJhbmdlLCBzZWxlY3Rpb247XG4gIFxuICBpZiAoZG9jLmJvZHkuY3JlYXRlVGV4dFJhbmdlKSB7IC8vbXNcbiAgICByYW5nZSA9IGRvYy5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgIHJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KG5vZGUpO1xuICAgIHJhbmdlLnNlbGVjdCgpO1xuICB9IGVsc2UgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHsgLy9hbGwgb3RoZXJzXG4gICAgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpOyAgICAgICAgXG4gICAgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMobm9kZSk7XG4gICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOYW1lVmlldztcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBjb21waWxlciA9IEVtYmVyLkhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIGFub255bW91cyhIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbnRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBFbWJlci5IYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazE7XG5cblxuICBzdGFjazEgPSBoZWxwZXJzLl90cmlhZ2VNdXN0YWNoZS5jYWxsKGRlcHRoMCwgXCJ2aWV3Lm5hbWVcIiwge2hhc2g6e30saGFzaFR5cGVzOnt9LGhhc2hDb250ZXh0czp7fSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBjb21waWxlciA9IEVtYmVyLkhhbmRsZWJhcnM7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVyLnRlbXBsYXRlKGZ1bmN0aW9uIGFub255bW91cyhIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbnRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBFbWJlci5IYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazEsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBzZWxmPXRoaXM7XG5cbmZ1bmN0aW9uIHByb2dyYW0xKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICA8bGk+PGEgaHJlZj1cXFwiI1xcXCI+PHNwYW4gXCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oaGVscGVyc1snYmluZC1hdHRyJ10uY2FsbChkZXB0aDAsIHtoYXNoOntcbiAgICAnY2xhc3MnOiAoXCI6c3F1YXJlLWljb24gdHlwZVwiKSxcbiAgICAndGl0bGUnOiAoXCJ0eXBlXCIpXG4gIH0saGFzaFR5cGVzOnsnY2xhc3MnOiBcIlNUUklOR1wiLCd0aXRsZSc6IFwiU1RSSU5HXCJ9LGhhc2hDb250ZXh0czp7J2NsYXNzJzogZGVwdGgwLCd0aXRsZSc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIj48L3NwYW4+IFwiKTtcbiAgc3RhY2sxID0gaGVscGVycy5fdHJpYWdlTXVzdGFjaGUuY2FsbChkZXB0aDAsIFwiYXR0cmlidXRlXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCI8L2E+PC9saT5cXG4gIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbihoZWxwZXJzLnZpZXcuY2FsbChkZXB0aDAsIFwiTmFtZVZpZXdDbGFzc1wiLCB7aGFzaDp7XG4gICAgJ25hbWUnOiAoXCJjb250ZW50Lm5hbWVcIiksXG4gICAgJ3ZpZXdOYW1lJzogKFwibmFtZVZpZXdcIilcbiAgfSxoYXNoVHlwZXM6eyduYW1lJzogXCJJRFwiLCd2aWV3TmFtZSc6IFwiU1RSSU5HXCJ9LGhhc2hDb250ZXh0czp7J25hbWUnOiBkZXB0aDAsJ3ZpZXdOYW1lJzogZGVwdGgwfSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuXFxuPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXhzIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVxcXCIgZGF0YS10b2dnbGU9XFxcImRyb3Bkb3duXFxcIj5cXG4gIDxzcGFuIGNsYXNzPVxcXCJjYXJldFxcXCI+PC9zcGFuPlxcbiAgPHNwYW4gY2xhc3M9XFxcInNyLW9ubHlcXFwiPlRvZ2dsZSBEcm9wZG93bjwvc3Bhbj5cXG48L2J1dHRvbj5cXG5cXG48dWwgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnVcXFwiIHJvbGU9XFxcIm1lbnVcXFwiPlxcbiAgXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAsIFwiY29udGVudC5hdHRyaWJ1dGVzXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgPGxpIGNsYXNzPVxcXCJkaXZpZGVyXFxcIj48L2xpPlxcbiAgPGxpPjxhIGhyZWY9XFxcIiNcXFwiIFwiKTtcbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKGhlbHBlcnMuYWN0aW9uLmNhbGwoZGVwdGgwLCBcImVkaXROYW1lXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30sY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiU1RSSU5HXCJdLGRhdGE6ZGF0YX0pKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCI+RWRpdCBOYW1lPC9hPjwvbGk+XFxuPC91bD5cXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJ2YXIgRGF0YVRhYmxlSGVhZGVyVmlldyA9IHJlcXVpcmUoJy4vaGVhZGVyJyk7XG5FbWJlci5URU1QTEFURVNbJ2NvbXBvbmVudHMvZGF0YS10YWJsZSddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUNvbXBvbmVudCA9IEVtYmVyLkNvbXBvbmVudC5leHRlbmQoe1xuICBsaW1pdDogbnVsbCxcbiAgYXV0b0NvbXBvc2U6IHRydWUsXG4gIGNvbHVtbnM6IEVtYmVyLkEoKSxcbiAgZGF0YXNldDogRW1iZXIuQSgpLFxuICBjb2x1bW5zQ29tcG9zYWJsZTogZmFsc2UsXG4gIGRhdGFUYWJsZUhlYWRlcjogRGF0YVRhYmxlSGVhZGVyVmlldyxcbiAgc2VsZWN0ZWRSb3dzOiBFbWJlci5jb21wdXRlZC5maWx0ZXJCeSgnZGF0YScsICdzZWxlY3RlZCcsIHRydWUpLCBcblxuICBzZWxlY3RlZENoYW5nZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLmdldCgnc2VsZWN0ZWRSb3dzJyk7XG4gICAgXG4gICAgaWYgKHNlbGVjdGVkICYmIHNlbGVjdGVkLmdldCgnbGVuZ3RoJykpIHtcbiAgICAgIHRoaXMuc2VuZEFjdGlvbignYWN0aW9uJywgc2VsZWN0ZWQpO1xuICAgIH1cbiAgfS5vYnNlcnZlcygnc2VsZWN0ZWRSb3dzJyksXG5cbiAgc2VsZWN0YWJsZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmdldCgnYWN0aW9uJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0ucHJvcGVydHkoKSxcblxuICB0eXBlczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdldCgnZGF0YXNldCcpLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXMsIGN1cnJlbnQpIHtcbiAgICAgIGlmICghcHJldmlvdXMuZmluZEJ5KCd0eXBlJywgY3VycmVudC5jb25zdHJ1Y3Rvci50eXBlS2V5KSkge1xuICAgICAgICBwcmV2aW91cy5wdXNoT2JqZWN0KEVtYmVyLk9iamVjdC5jcmVhdGUoe1xuICAgICAgICAgIHR5cGU6IGN1cnJlbnQuY29uc3RydWN0b3IudHlwZUtleSxcbiAgICAgICAgICBrZXlzOiBFbWJlci5rZXlzKGN1cnJlbnQudG9KU09OKCkpXG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgIH0sIFtdKTtcbiAgfS5wcm9wZXJ0eSgnZGF0YXNldCcpLFxuXG4gIGF2YWlsYWJsZUNvbHVtbnM6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYWxpYXNlcyA9IHRoaXMuZ2V0KCdjb2x1bW5BbGlhc2VzJyk7XG5cbiAgICBpZiAoYWxpYXNlcyAmJiAhRW1iZXIuaXNFbXB0eShhbGlhc2VzKSkge1xuICAgICAgcmV0dXJuIGFsaWFzZXM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIGRhdGFzZXQgPSB0aGlzLmdldCgnZGF0YXNldCcpO1xuICAgICAgdmFyIGdlbmVyYXRlZCA9IHRoaXMuZ2VuZXJhdGVDb2x1bW5zKGRhdGFzZXQpO1xuICAgICAgcmV0dXJuIGdlbmVyYXRlZDtcbiAgICB9XG4gIH0ucHJvcGVydHkoKSxcblxuICBjb2x1bW5zTm90SW5IZWFkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXZhaWxhYmxlID0gdGhpcy5nZXQoJ2F2YWlsYWJsZUNvbHVtbnMnKTtcbiAgICB2YXIgZGlzcGxheWVkID0gdGhpcy5nZXQoJ2NvbHVtbnMnKTtcblxuICAgIHJldHVybiBhdmFpbGFibGUucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgaXRlbSkge1xuICAgICAgaWYgKCFkaXNwbGF5ZWQuZmluZEJ5KCdpZCcsIGl0ZW0uZ2V0KCdpZCcpKSkge1xuICAgICAgICBwcmV2aW91cy5wdXNoT2JqZWN0KGl0ZW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXM7XG4gICAgfSwgW10pO1xuICB9LnByb3BlcnR5KCdhdmFpbGFibGVDb2x1bW5zJywgJ2NvbHVtbnMnKSxcblxuICBpbml0aWFsQ29sdW1uczogZnVuY3Rpb24gKCkge1xuICAgIHZhciBkZWZhdWx0Q29sdW1ucyA9IHRoaXMuZ2V0KCdkZWZhdWx0Q29sdW1ucycpO1xuICAgIHZhciBhdmFpbGFibGVDb2x1bW5zID0gdGhpcy5nZXQoJ2F2YWlsYWJsZUNvbHVtbnMnKTtcbiAgICB2YXIgY291bnRlciA9IDA7XG4gICAgdmFyIGxpbWl0ID0gdGhpcy5nZXQoJ2xpbWl0Jyk7XG4gICAgdmFyIGhhc0RlZmF1bHRzID0gKGRlZmF1bHRDb2x1bW5zICYmIGRlZmF1bHRDb2x1bW5zLmxlbmd0aCk7XG5cbiAgICB2YXIgZmlsdGVyZWQgPSBhdmFpbGFibGVDb2x1bW5zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGlkID0gaXRlbS5nZXQoJ2lkJyk7XG4gICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICBpZiAoaGFzRGVmYXVsdHMpIHtcbiAgICAgICAgcmVzdWx0ID0gZGVmYXVsdENvbHVtbnMuY29udGFpbnMoaWQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9ICghbGltaXQgfHwgY291bnRlciA8IGxpbWl0ID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgICAgY291bnRlcisrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbHRlcmVkO1xuICB9LnByb3BlcnR5KCdhdmFpbGFibGVDb2x1bW5zJyksXG5cbiAgcHJlUG9wdWxhdGVDb2x1bW5zOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGVjdGFibGUgPSB0aGlzLmdldCgnc2VsZWN0YWJsZScpO1xuICAgIHZhciBmaWx0ZXJlZCA9IHRoaXMuZ2V0KCdpbml0aWFsQ29sdW1ucycpO1xuXG4gICAgaWYgKHNlbGVjdGFibGUgJiYgZmlsdGVyZWQpIHtcbiAgICAgIGZpbHRlcmVkLnVuc2hpZnQobnVsbCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXQoJ2NvbHVtbnMnLCBmaWx0ZXJlZCk7XG4gIH0ub24oJ2luaXQnKSxcblxuICBkYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRhdGFzZXQgPSB0aGlzLmdldCgnZGF0YXNldCcpO1xuICAgIHZhciBjb2x1bW5zID0gdGhpcy5nZXQoJ2NvbHVtbnMnKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHJlc3VsdDtcblxuICAgIGRhdGFzZXQgPSBFbWJlci5pc0FycmF5KGRhdGFzZXQpID8gZGF0YXNldCA6IGRhdGFzZXQuZ2V0KCdjb250ZW50Jyk7XG5cbiAgICBpZiAoIUVtYmVyLmlzQXJyYXkoZGF0YXNldCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YXNldCBpbnB1dCBtdXN0IGJlIGFuIGFycmF5LicpO1xuICAgIH1cblxuICAgIHJlc3VsdCA9IGRhdGFzZXQubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgdHlwZSA9IGl0ZW0uY29uc3RydWN0b3IudHlwZUtleTtcblxuICAgICAgaWYgKGNvbHVtbnMpIHtcbiAgICAgICAgcmV0dXJuIEVtYmVyLk9iamVjdC5jcmVhdGUoe1xuICAgICAgICAgIHJvdzogc2VsZi5jb2x1bW5BdHRyaWJ1dGVNYXAoY29sdW1ucywgaXRlbSwgdHlwZSksXG4gICAgICAgICAgbW9kZWw6IGl0ZW0sXG4gICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIHJvdyA9IGl0ZW0uZ2V0KCdyb3cnKTtcblxuICAgICAgaWYgKHJvdykge1xuICAgICAgICB2YXIgYWxsRW1wdHkgPSByb3cuZXZlcnkoZnVuY3Rpb24gKGNvbCkge1xuICAgICAgICAgIHJldHVybiBFbWJlci5pc0VtcHR5KGNvbClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGFsbEVtcHR5KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiAhcm93LmlzQW55KCdAdGhpcycsICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfS5wcm9wZXJ0eSgnZGF0YXNldCcsICdjb2x1bW5zLmxlbmd0aCcpLFxuXG4gIGNvbHVtbkF0dHJpYnV0ZU1hcDogZnVuY3Rpb24gKGNvbHVtbnMsIHJvdywgZGF0YVR5cGUpIHtcbiAgICBpZiAoIXJvdykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBbXSxcbiAgICAgIC8vY29sdW1uc0J5VHlwZSA9IGNvbHVtbnMuZmlsdGVyQnkoJ2F0dHJpYnV0ZS50eXBlJywgZGF0YVR5cGUpLFxuICAgICAgcm93SnNvbiA9IHJvdy50b0pTT04oKSxcbiAgICAgIHJvd0tleXMgPSBFbWJlci5rZXlzKHJvd0pzb24pLFxuICAgICAgY29sID0gMCxcbiAgICAgIGRhdGFBZGRlZCA9IDAsXG4gICAgICBjb2x1bW5zQWRkZWQgPSBbXSxcbiAgICAgIGtleSwgYXR0cixcbiAgICAgIGhlYWRlciwgcHJvcCwgYXR0cjtcblxuICAgIGZvciAoOyBjb2wgPCBjb2x1bW5zLmxlbmd0aDsgY29sKyspIHtcbiAgICAgIGhlYWRlciA9IGNvbHVtbnMub2JqZWN0QXQoY29sKTtcblxuICAgICAgaWYgKCFoZWFkZXIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBkYXRhQWRkZWQgPSByZXN1bHQuZ2V0KCdsZW5ndGgnKTtcblxuICAgICAgaWYgKGhlYWRlci5nZXQoJ2lzQ29tcG9zZWQnKSkge1xuICAgICAgICBoZWFkZXIuZ2V0KCdhdHRyaWJ1dGVzJykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIGtleSA9IGl0ZW0uZ2V0KCd0eXBlJykgKyAnOicgKyBpdGVtLmdldCgnYXR0cmlidXRlJyk7XG4gICAgICAgICAgcHJvcCA9IGl0ZW0uZ2V0KCdhdHRyaWJ1dGUnKTtcblxuICAgICAgICAgIGlmIChyb3dKc29uLmhhc093blByb3BlcnR5KHByb3ApICYmICFjb2x1bW5zQWRkZWQuY29udGFpbnMoa2V5KSAmJiBkYXRhVHlwZSA9PT0gaXRlbS5nZXQoJ3R5cGUnKSkge1xuICAgICAgICAgICAgY29sdW1uc0FkZGVkLnB1c2goa2V5KTtcbiAgICAgICAgICAgIHJlc3VsdC5zcGxpY2UoY29sLCAwLCByb3dKc29uW3Byb3BdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXN1bHQuZ2V0KCdsZW5ndGgnKSA9PT0gZGF0YUFkZGVkKSB7XG4gICAgICAgICAgcmVzdWx0LnNwbGljZShjb2wsIDAsICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGtleSA9IGhlYWRlci5nZXQoJ2lkJyk7XG4gICAgICAgIGF0dHIgPSBoZWFkZXIuZ2V0KCdhdHRyaWJ1dGUnKTtcbiAgICAgICAgcHJvcCA9IGhlYWRlci5nZXQoJ2F0dHJpYnV0ZS5hdHRyaWJ1dGUnKTtcblxuICAgICAgICBpZiAocm93SnNvbi5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiAhY29sdW1uc0FkZGVkLmNvbnRhaW5zKGtleSkgJiYgZGF0YVR5cGUgPT09IGF0dHIuZ2V0KCd0eXBlJykpIHtcbiAgICAgICAgICBjb2x1bW5zQWRkZWQucHVzaChrZXkpO1xuICAgICAgICAgIHJlc3VsdC5zcGxpY2UoY29sLCAwLCByb3dKc29uW3Byb3BdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXN1bHQuc3BsaWNlKGNvbCwgMCwgJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBnZW5lcmF0ZUNvbHVtbnM6IGZ1bmN0aW9uIChkYXRhc2V0KSB7XG4gICAgdmFyIHR5cGVzID0gdGhpcy5nZXQoJ3R5cGVzJyk7XG4gICAgdmFyIGF1dG9Db21wb3NlID0gdGhpcy5nZXQoJ2F1dG9Db21wb3NlJyk7XG5cbiAgICBpZiAodHlwZXMpIHtcbiAgICAgIHJldHVybiB0eXBlcy5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzLCBjdXJyZW50LCBpbmRleCwgYXJyKSB7XG4gICAgICAgIHZhciB0eXBlID0gY3VycmVudC5nZXQoJ3R5cGUnKTtcblxuICAgICAgICBjdXJyZW50LmdldCgna2V5cycpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgaWQgPSB0eXBlICsgJzonICsgaXRlbTtcbiAgICAgICAgICB2YXIgbmFtZSA9IGl0ZW0uY2FwaXRhbGl6ZSgpO1xuICAgICAgICAgIHZhciBjb2x1bW4gPSBwcmV2aW91cy5maW5kQnkoJ25hbWUnLCBuYW1lKTtcbiAgICAgICAgICB2YXIgYXR0cmlidXRlID0gRW1iZXIuT2JqZWN0LmNyZWF0ZSh7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgYXR0cmlidXRlOiBpdGVtXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGF1dG9Db21wb3NlICYmIGNvbHVtbikge1xuICAgICAgICAgICAgY29sdW1uLnNldCgnaXNDb21wb3NlZCcsIHRydWUpO1xuICAgICAgICAgICAgaWYgKGNvbHVtbi5nZXQoJ2F0dHJpYnV0ZXMnKS5jb250YWlucyhjb2x1bW4uZ2V0KCdhdHRyaWJ1dGUnKSkpIHtcbiAgICAgICAgICAgICAgY29sdW1uLmdldCgnYXR0cmlidXRlcycpLnB1c2hPYmplY3QoY29sdW1uLmdldCgnYXR0cmlidXRlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29sdW1uLmdldCgnYXR0cmlidXRlcycpLnB1c2hPYmplY3QoYXR0cmlidXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcmV2aW91cy5wdXNoT2JqZWN0KEVtYmVyLk9iamVjdC5jcmVhdGUoe1xuICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFthdHRyaWJ1dGVdLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGU6IGF0dHJpYnV0ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzO1xuICAgICAgfSwgW10pO1xuICAgIH1cbiAgfSxcblxuICBhY3Rpb25zOiB7XG4gICAgY2xlYXJTZWxlY3RlZDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5nZXQoJ2RhdGEnKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uc2V0KCdzZWxlY3RlZCcsIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YVRhYmxlQ29tcG9uZW50O1xuIiwiLy8gaGJzZnkgY29tcGlsZWQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxudmFyIGNvbXBpbGVyID0gRW1iZXIuSGFuZGxlYmFycztcbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZXIudGVtcGxhdGUoZnVuY3Rpb24gYW5vbnltb3VzKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xudGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEVtYmVyLkhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMSwgaGVscGVyTWlzc2luZz1oZWxwZXJzLmhlbHBlck1pc3NpbmcsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uLCBzZWxmPXRoaXM7XG5cbmZ1bmN0aW9uIHByb2dyYW0xKGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIHN0YWNrMTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgXCIpO1xuICBzdGFjazEgPSBoZWxwZXJzWydpZiddLmNhbGwoZGVwdGgwLCBcInZpZXcucGFyZW50Vmlldy5jb2x1bW5zQ29tcG9zYWJsZVwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5wcm9ncmFtKDQsIHByb2dyYW00LCBkYXRhKSxmbjpzZWxmLnByb2dyYW0oMiwgcHJvZ3JhbTIsIGRhdGEpLGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5mdW5jdGlvbiBwcm9ncmFtMihkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBoZWxwZXIsIG9wdGlvbnM7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgXCIpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKGVzY2FwZUV4cHJlc3Npb24oKGhlbHBlciA9IGhlbHBlcnNbJ2RhdGEtdGFibGUtY29tcG9zYWJsZS1jb2x1bW4nXSB8fCAoZGVwdGgwICYmIGRlcHRoMFsnZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtbiddKSxvcHRpb25zPXtoYXNoOntcbiAgICAnY29udGVudCc6IChcInZpZXcuY29udGVudFwiKVxuICB9LGhhc2hUeXBlczp7J2NvbnRlbnQnOiBcIklEXCJ9LGhhc2hDb250ZXh0czp7J2NvbnRlbnQnOiBkZXB0aDB9LGNvbnRleHRzOltdLHR5cGVzOltdLGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiZGF0YS10YWJsZS1jb21wb3NhYmxlLWNvbHVtblwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgXCIpO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbmZ1bmN0aW9uIHByb2dyYW00KGRlcHRoMCxkYXRhKSB7XG4gIFxuICB2YXIgYnVmZmVyID0gJycsIGhlbHBlciwgb3B0aW9ucztcbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICBcIik7XG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVyc1snZGF0YS10YWJsZS1jb2x1bW4nXSB8fCAoZGVwdGgwICYmIGRlcHRoMFsnZGF0YS10YWJsZS1jb2x1bW4nXSksb3B0aW9ucz17aGFzaDp7XG4gICAgJ2NvbnRlbnQnOiAoXCJ2aWV3LmNvbnRlbnRcIiksXG4gICAgJ2NsYXNzJzogKFwiYnRuIGJ0bi14cyBidG4tZGVmYXVsdFwiKVxuICB9LGhhc2hUeXBlczp7J2NvbnRlbnQnOiBcIklEXCIsJ2NsYXNzJzogXCJTVFJJTkdcIn0saGFzaENvbnRleHRzOnsnY29udGVudCc6IGRlcHRoMCwnY2xhc3MnOiBkZXB0aDB9LGNvbnRleHRzOltdLHR5cGVzOltdLGRhdGE6ZGF0YX0saGVscGVyID8gaGVscGVyLmNhbGwoZGVwdGgwLCBvcHRpb25zKSA6IGhlbHBlck1pc3NpbmcuY2FsbChkZXB0aDAsIFwiZGF0YS10YWJsZS1jb2x1bW5cIiwgb3B0aW9ucykpKSk7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG4gIHN0YWNrMSA9IGhlbHBlcnNbJ2lmJ10uY2FsbChkZXB0aDAsIFwidmlldy5jb250ZW50XCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcblwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgXG59KTtcbiIsIkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlL2NvbGxlY3Rpb24taXRlbSddID0gcmVxdWlyZSgnLi9jb2xsZWN0aW9uLWl0ZW0uaGJzJyk7XG5cbnZhciBDb2xsZWN0aW9uSXRlbVZpZXcgPSBFbWJlci5WaWV3LmV4dGVuZCh7XG4gIHRlbXBsYXRlTmFtZTogJ2NvbXBvbmVudHMvZGF0YS10YWJsZS9jb2xsZWN0aW9uLWl0ZW0nLFxuICBjbGFzc05hbWVCaW5kaW5nczogWydkcm9wU2lkZScsICdjb2x1bW5UeXBlJ10sXG4gIHRhZ05hbWU6ICd0aCcsXG4gIGRyb3BTaWRlOiBudWxsLFxuICB0YXJnZXQ6IEVtYmVyLmNvbXB1dGVkLmFsaWFzKCdwYXJlbnRWaWV3JyksXG5cbiAgY29sdW1uVHlwZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBpZCA9IHRoaXMuZ2V0KCdjb250ZW50LmlkJyk7XG4gICAgaWQgPSBpZCA/IGlkLnNwbGl0KCc6Jykuam9pbignLScpIDogaWQ7XG4gICAgdmFyIHBvc3RmaXggPSAnLWNvbHVtbic7XG4gICAgcmV0dXJuIGlkID8gKGlkICsgcG9zdGZpeCkgOiAnc2VsZWN0YWJsZScgKyBwb3N0Zml4O1xuICB9LnByb3BlcnR5KCdjb250ZW50JyksXG5cbiAgZHJhZ092ZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICghdGhpcy5nZXQoJ2NvbnRlbnQnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIEVtYmVyLnJ1bi50aHJvdHRsZSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudC5vZmZzZXRYID4gKHRoaXMuJCgpLndpZHRoKCkgLyAyKSkge1xuICAgICAgICB0aGlzLnNldCgnZHJvcFNpZGUnLCAncmlnaHQnKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnNldCgnZHJvcFNpZGUnLCAnbGVmdCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldCgncGFyZW50Vmlldy5vdmVyJywgdHJ1ZSk7XG4gICAgfSwgMzAwKTtcbiAgfSxcblxuICBkcmFnTGVhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnZHJvcFNpZGUnLCBudWxsKTtcbiAgICB0aGlzLnNldCgncGFyZW50Vmlldy5vdmVyJywgZmFsc2UpO1xuICB9LFxuXG4gIGRyb3A6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuZ2V0KCdjb250ZW50JykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2lkZURyb3BwZWQgPSB0aGlzLmdldCgnZHJvcFNpZGUnKTtcbiAgICB2YXIgcmF3RGF0YSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICBpZiAocmF3RGF0YSkge1xuICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJhd0RhdGEpO1xuICAgICAgdmFyIGNvbHVtbiA9IHRoaXMuZ2V0KCdwYXJlbnRWaWV3LnBhcmVudFZpZXcuYXZhaWxhYmxlQ29sdW1ucycpLmZpbmRCeSgnaWQnLCBkYXRhLmlkKTtcblxuICAgICAgaWYgKHNpZGVEcm9wcGVkID09PSAnbGVmdCcpIHtcbiAgICAgICAgdGhpcy5zZW5kKCdpbnNlcnRCZWZvcmUnLCB0aGlzLmdldCgnY29udGVudCcpLCBjb2x1bW4pOyAgIFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2VuZCgnaW5zZXJ0QWZ0ZXInLCB0aGlzLmdldCgnY29udGVudCcpLCBjb2x1bW4pOyAgIFxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0KCdkcm9wU2lkZScsIG51bGwpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0aW9uSXRlbVZpZXc7XG4iLCJ2YXIgQ29sbGVjdGlvbkl0ZW1WaWV3ID0gcmVxdWlyZSgnLi9jb2xsZWN0aW9uLWl0ZW0nKTtcbkVtYmVyLlRFTVBMQVRFU1snY29tcG9uZW50cy9kYXRhLXRhYmxlL2hlYWRlciddID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS5oYnMnKTtcblxudmFyIERhdGFUYWJsZUhlYWRlckNvbGxlY3Rpb24gPSBFbWJlci5Db2xsZWN0aW9uVmlldy5leHRlbmQoe1xuICB0YWdOYW1lOiAndHInLFxuICB0ZW1wbGF0ZU5hbWU6ICdjb21wb25lbnRzL2RhdGEtdGFibGUvaGVhZGVyJyxcbiAgY29udGVudDogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ3BhcmVudFZpZXcuY29sdW1ucycpLFxuICBsaW1pdDogRW1iZXIuY29tcHV0ZWQuYWxpYXMoJ3BhcmVudFZpZXcubGltaXQnKSxcbiAgY2xhc3NOYW1lQmluZGluZ3M6IFsnb3ZlciddLFxuICBjb2x1bW5zTm90SW5IZWFkZXI6IEVtYmVyLmNvbXB1dGVkLmFsaWFzKCdwYXJlbnRWaWV3LmJpbkNvbXBvbmVudC5jb2x1bW5zJyksXG4gIGNvbHVtbnNDb21wb3NhYmxlOiBFbWJlci5jb21wdXRlZC5hbGlhcygncGFyZW50Vmlldy5jb2x1bW5zQ29tcG9zYWJsZScpLFxuICBpdGVtVmlld0NsYXNzOiBDb2xsZWN0aW9uSXRlbVZpZXcsXG5cbiAgZHJhZ092ZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG5cbiAgZHJhZ0VudGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIHRydWUpO1xuICB9LFxuXG4gIGRyYWdMZWF2ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0KCdvdmVyJywgZmFsc2UpO1xuICB9LFxuXG4gIGRyb3A6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCgnb3ZlcicsIGZhbHNlKTtcbiAgfSxcblxuICBpbnNlcnRBdDogZnVuY3Rpb24gKGV4aXN0aW5nLCBkcm9wcGVkLCBhZGQpIHtcbiAgICB2YXIgY29sdW1ucyA9IHRoaXMuZ2V0KCdjb250ZW50Jyk7XG4gICAgdmFyIGNvbHVtbnNOb3RJbkhlYWRlciA9IHRoaXMuZ2V0KCdjb2x1bW5zTm90SW5IZWFkZXInKTtcbiAgICB2YXIgZXhpc3RpbmdJbmRleCA9IGNvbHVtbnMuaW5kZXhPZihleGlzdGluZyk7XG4gICAgdmFyIGR1cGxpY2F0ZSA9IGNvbHVtbnMuZmluZEJ5KCdpZCcsIGRyb3BwZWQuZ2V0KCdpZCcpKTtcbiAgICB2YXIgdG90YWwgPSB0aGlzLmdldCgnY29udGVudC5sZW5ndGgnKTtcbiAgICB2YXIgbGltaXQgPSB0aGlzLmdldCgnbGltaXQnKTtcbiAgICB2YXIgbW9kaWZlZEluZGV4O1xuICAgIHZhciBkdXBJbmRleDtcblxuICAgIGlmIChleGlzdGluZy5nZXQoJ2lkJykgPT09IGRyb3BwZWQuZ2V0KCdpZCcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbW9kaWZpZWRJbmRleCA9IGV4aXN0aW5nSW5kZXggKyBhZGQ7XG4gICAgfVxuXG4gICAgaWYgKGNvbHVtbnMpIHtcbiAgICAgIC8vIG1vdmUgY29sdW1uIHRvIG5ldyBpbmRleFxuICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICBkdXBJbmRleCA9IGNvbHVtbnMuaW5kZXhPZihkdXBsaWNhdGUpO1xuICAgICAgICBpZiAodHlwZW9mIGR1cEluZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGNvbHVtbnMuYXJyYXlDb250ZW50V2lsbENoYW5nZShkdXBJbmRleCwgMSwgMCk7XG4gICAgICAgICAgY29sdW1ucy5zcGxpY2UoZHVwSW5kZXgsIDEpO1xuICAgICAgICAgIHRoaXMuc2V0KCdjb250ZW50JywgY29sdW1ucyk7XG4gICAgICAgICAgY29sdW1ucy5hcnJheUNvbnRlbnREaWRDaGFuZ2UoZHVwSW5kZXgsIDEsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChsaW1pdCAmJiB0b3RhbCA9PT0gbGltaXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBBZGQgdG8gZW5kLCBpbnN0ZWFkIG9mIHNwbGljaW5nXG4gICAgICBpZiAobW9kaWZpZWRJbmRleCA+IGNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbHVtbnMucHVzaE9iamVjdChkcm9wcGVkKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb2x1bW5zLmFycmF5Q29udGVudFdpbGxDaGFuZ2UobW9kaWZpZWRJbmRleCwgMCwgMSk7XG4gICAgICAgIGNvbHVtbnMuc3BsaWNlKG1vZGlmaWVkSW5kZXgsIDAsIGRyb3BwZWQpO1xuICAgICAgICB0aGlzLnNldCgnY29udGVudCcsIGNvbHVtbnMpO1xuICAgICAgICBjb2x1bW5zLmFycmF5Q29udGVudERpZENoYW5nZShtb2RpZmllZEluZGV4LCAwLCAxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRyb3BwZWQpIHtcbiAgICAgICAgdGhpcy5zZXQoJ2NvbHVtbnNOb3RJbkhlYWRlcicsIGNvbHVtbnNOb3RJbkhlYWRlci53aXRob3V0KGRyb3BwZWQpKTtcbiAgICAgIH1cbiAgICB9IFxuICB9LFxuXG4gIGFjdGlvbnM6IHtcbiAgICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIChleGlzdGluZywgZHJvcHBlZCkge1xuICAgICAgdGhpcy5pbnNlcnRBdChleGlzdGluZywgZHJvcHBlZCwgMCk7ICBcbiAgICB9LFxuXG4gICAgaW5zZXJ0QWZ0ZXI6IGZ1bmN0aW9uIChleGlzdGluZywgZHJvcHBlZCkge1xuICAgICAgdGhpcy5pbnNlcnRBdChleGlzdGluZywgZHJvcHBlZCwgMSk7ICBcbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFUYWJsZUhlYWRlckNvbGxlY3Rpb247XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJztcblxuXG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgY29tcGlsZXIgPSBFbWJlci5IYW5kbGViYXJzO1xubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlci50ZW1wbGF0ZShmdW5jdGlvbiBhbm9ueW1vdXMoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG50aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgRW1iZXIuSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxLCBoZWxwZXIsIG9wdGlvbnMsIGhlbHBlck1pc3Npbmc9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBlc2NhcGVFeHByZXNzaW9uPXRoaXMuZXNjYXBlRXhwcmVzc2lvbiwgc2VsZj10aGlzO1xuXG5mdW5jdGlvbiBwcm9ncmFtMShkZXB0aDAsZGF0YSkge1xuICBcbiAgdmFyIGJ1ZmZlciA9ICcnLCBzdGFjazE7XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gICAgICA8dHI+XFxuICAgICAgICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnNbJ2lmJ10uY2FsbChkZXB0aDAsIFwic2VsZWN0YWJsZVwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGludmVyc2U6c2VsZi5ub29wLGZuOnNlbGYucHJvZ3JhbSgyLCBwcm9ncmFtMiwgZGF0YSksY29udGV4dHM6W2RlcHRoMF0sdHlwZXM6W1wiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG5cXG4gICAgICAgIFwiKTtcbiAgc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwLCBcIml0ZW0ucm93XCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDQsIHByb2dyYW00LCBkYXRhKSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBkYXRhLmJ1ZmZlci5wdXNoKHN0YWNrMSk7IH1cbiAgZGF0YS5idWZmZXIucHVzaChcIlxcbiAgICAgIDwvdHI+XFxuICAgIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuZnVuY3Rpb24gcHJvZ3JhbTIoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgaGVscGVyLCBvcHRpb25zO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgICAgICAgIDx0ZD5cIik7XG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVycy5pbnB1dCB8fCAoZGVwdGgwICYmIGRlcHRoMC5pbnB1dCksb3B0aW9ucz17aGFzaDp7XG4gICAgJ3R5cGUnOiAoXCJjaGVja2JveFwiKSxcbiAgICAnY2hlY2tlZCc6IChcIml0ZW0uc2VsZWN0ZWRcIilcbiAgfSxoYXNoVHlwZXM6eyd0eXBlJzogXCJTVFJJTkdcIiwnY2hlY2tlZCc6IFwiSURcIn0saGFzaENvbnRleHRzOnsndHlwZSc6IGRlcHRoMCwnY2hlY2tlZCc6IGRlcHRoMH0sY29udGV4dHM6W10sdHlwZXM6W10sZGF0YTpkYXRhfSxoZWxwZXIgPyBoZWxwZXIuY2FsbChkZXB0aDAsIG9wdGlvbnMpIDogaGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCwgXCJpbnB1dFwiLCBvcHRpb25zKSkpKTtcbiAgZGF0YS5idWZmZXIucHVzaChcIjwvdGQ+XFxuICAgICAgICBcIik7XG4gIHJldHVybiBidWZmZXI7XG4gIH1cblxuZnVuY3Rpb24gcHJvZ3JhbTQoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSAnJywgc3RhY2sxO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICAgICAgICAgIDx0ZD5cIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuX3RyaWFnZU11c3RhY2hlLmNhbGwoZGVwdGgwLCBcIlwiLCB7aGFzaDp7fSxoYXNoVHlwZXM6e30saGFzaENvbnRleHRzOnt9LGNvbnRleHRzOltkZXB0aDBdLHR5cGVzOltcIklEXCJdLGRhdGE6ZGF0YX0pO1xuICBpZihzdGFjazEgfHwgc3RhY2sxID09PSAwKSB7IGRhdGEuYnVmZmVyLnB1c2goc3RhY2sxKTsgfVxuICBkYXRhLmJ1ZmZlci5wdXNoKFwiPC90ZD5cXG4gICAgICAgIFwiKTtcbiAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG4gIGRhdGEuYnVmZmVyLnB1c2goZXNjYXBlRXhwcmVzc2lvbigoaGVscGVyID0gaGVscGVyc1snZGF0YS10YWJsZS1iaW4nXSB8fCAoZGVwdGgwICYmIGRlcHRoMFsnZGF0YS10YWJsZS1iaW4nXSksb3B0aW9ucz17aGFzaDp7XG4gICAgJ2NvbHVtbnMnOiAoXCJjb2x1bW5zTm90SW5IZWFkZXJcIiksXG4gICAgJ3ZpZXdOYW1lJzogKFwiYmluQ29tcG9uZW50XCIpLFxuICAgICdjb2x1bW5zQ29tcG9zYWJsZSc6IChcImNvbHVtbnNDb21wb3NhYmxlXCIpXG4gIH0saGFzaFR5cGVzOnsnY29sdW1ucyc6IFwiSURcIiwndmlld05hbWUnOiBcIlNUUklOR1wiLCdjb2x1bW5zQ29tcG9zYWJsZSc6IFwiSURcIn0saGFzaENvbnRleHRzOnsnY29sdW1ucyc6IGRlcHRoMCwndmlld05hbWUnOiBkZXB0aDAsJ2NvbHVtbnNDb21wb3NhYmxlJzogZGVwdGgwfSxjb250ZXh0czpbXSx0eXBlczpbXSxkYXRhOmRhdGF9LGhlbHBlciA/IGhlbHBlci5jYWxsKGRlcHRoMCwgb3B0aW9ucykgOiBoZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLCBcImRhdGEtdGFibGUtYmluXCIsIG9wdGlvbnMpKSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuPHRhYmxlIGNsYXNzPVxcXCJ0YWJsZSB0YWJsZS1yZXNwb25zaXZlIHRhYmxlLWhvdmVyIHRhYmxlLWNvbmRlbnNlZFxcXCI+XFxuICA8dGhlYWQ+XFxuICAgIFwiKTtcbiAgZGF0YS5idWZmZXIucHVzaChlc2NhcGVFeHByZXNzaW9uKGhlbHBlcnMudmlldy5jYWxsKGRlcHRoMCwgXCJkYXRhVGFibGVIZWFkZXJcIiwge2hhc2g6e1xuICAgICd2aWV3TmFtZSc6IChcImNvbHVtbkNvbGxlY3Rpb25cIilcbiAgfSxoYXNoVHlwZXM6eyd2aWV3TmFtZSc6IFwiU1RSSU5HXCJ9LGhhc2hDb250ZXh0czp7J3ZpZXdOYW1lJzogZGVwdGgwfSxjb250ZXh0czpbZGVwdGgwXSx0eXBlczpbXCJJRFwiXSxkYXRhOmRhdGF9KSkpO1xuICBkYXRhLmJ1ZmZlci5wdXNoKFwiXFxuICA8L3RoZWFkPlxcbiAgPHRib2R5PlxcbiAgICBcIik7XG4gIHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCwgXCJpdGVtXCIsIFwiaW5cIiwgXCJkYXRhXCIsIHtoYXNoOnt9LGhhc2hUeXBlczp7fSxoYXNoQ29udGV4dHM6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxjb250ZXh0czpbZGVwdGgwLGRlcHRoMCxkZXB0aDBdLHR5cGVzOltcIklEXCIsXCJJRFwiLFwiSURcIl0sZGF0YTpkYXRhfSk7XG4gIGlmKHN0YWNrMSB8fCBzdGFjazEgPT09IDApIHsgZGF0YS5idWZmZXIucHVzaChzdGFjazEpOyB9XG4gIGRhdGEuYnVmZmVyLnB1c2goXCJcXG4gIDwvdGJvZHk+XFxuPC90YWJsZT5cXG5cIik7XG4gIHJldHVybiBidWZmZXI7XG4gIFxufSk7XG4iLCJ2YXIgRGF0YVRhYmxlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9kYXRhLXRhYmxlL2NvbXBvbmVudCcpO1xudmFyIERhdGFUYWJsZUJpbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vZGF0YS10YWJsZS1iaW4vY29tcG9uZW50Jyk7XG52YXIgRGF0YVRhYmxlQ29sdW1uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9kYXRhLXRhYmxlLWNvbHVtbi9jb21wb25lbnQnKTtcbnZhciBEYXRhVGFibGVDb21wb3NhYmxlQ29sdW1uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9kYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uL2NvbXBvbmVudCcpO1xuXG5FbWJlci5BcHBsaWNhdGlvbi5pbml0aWFsaXplcih7XG4gIG5hbWU6ICdkYXRhLXRhYmxlJyxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbihjb250YWluZXIsIGFwcGxpY2F0aW9uKSB7XG4gICAgY29udGFpbmVyLnJlZ2lzdGVyKCdjb21wb25lbnQ6ZGF0YS10YWJsZScsIERhdGFUYWJsZUNvbXBvbmVudCwgeyBzaW5nbGV0b246IGZhbHNlIH0pO1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcignY29tcG9uZW50OmRhdGEtdGFibGUtYmluJywgRGF0YVRhYmxlQmluQ29tcG9uZW50LCB7IHNpbmdsZXRvbjogZmFsc2UgfSk7XG4gICAgY29udGFpbmVyLnJlZ2lzdGVyKCdjb21wb25lbnQ6ZGF0YS10YWJsZS1jb2x1bW4nLCBEYXRhVGFibGVDb2x1bW5Db21wb25lbnQsIHsgc2luZ2xldG9uOiBmYWxzZSB9KTtcbiAgICBjb250YWluZXIucmVnaXN0ZXIoJ2NvbXBvbmVudDpkYXRhLXRhYmxlLWNvbXBvc2FibGUtY29sdW1uJywgRGF0YVRhYmxlQ29tcG9zYWJsZUNvbHVtbkNvbXBvbmVudCwgeyBzaW5nbGV0b246IGZhbHNlIH0pO1xuICB9XG59KTtcbiJdfQ==
