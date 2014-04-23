Ember.TEMPLATES["components/data-table-header-bin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    <li>");
  data.buffer.push(escapeExpression((helper = helpers['data-table-header-item'] || (depth0 && depth0['data-table-header-item']),options={hash:{
    'content': ("")
  },hashTypes:{'content': "ID"},hashContexts:{'content': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "data-table-header-item", options))));
  data.buffer.push("</li>\n  ");
  return buffer;
  }

  data.buffer.push("<ul class=\"well well-sm list-unstyled\">\n  ");
  stack1 = helpers.each.call(depth0, "columns", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});
Ember.TEMPLATES["components/data-table-header-collection-item"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers['data-table-header-item'] || (depth0 && depth0['data-table-header-item']),options={hash:{
    'content': ("view.content")
  },hashTypes:{'content': "ID"},hashContexts:{'content': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "data-table-header-item", options))));
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["components/data-table-header-item"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "content.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["components/data-table-header"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});
Ember.TEMPLATES["components/data-table"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <tr>\n      ");
  stack1 = helpers.each.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </tr>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <td>");
  stack1 = helpers._triageMustache.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n      ");
  return buffer;
  }

  data.buffer.push("<thead>\n  ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "data-table-header", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n</thead>\n<tbody>\n  ");
  stack1 = helpers.each.call(depth0, "data", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</tbody>\n");
  return buffer;
  
});