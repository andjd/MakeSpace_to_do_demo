(function(root) {
  'use strict';
  // Namespaces app under the symbol "º".
  var º = root.º = root.º || {};
  º.Views = {};

  // template for each to do item.  Template is embedded here for brevity.
  var _template =  _.template(
    '<% for (var i = 0; i < items.length; i++) { %>' +
    '  <li id="<%= items[i].cid %>">' +
    '    <input class="checkbox" type="checkbox" <%= (items[i].attributes.checked) ? "checked" : "" %> />' +
    '    <%- items[i].attributes.body %>' + // Underscore .template HTML-escapes this text.
    '    <button class="delete-item text-btn-danger">✕</button>' +
    '  </li>' +
    '<% } %>'
  );

  º.Views.Items = Backbone.View.extend({

    initialize: function(options){
      this.el = '.items';
      this.$el = $(".items");
      this.listenTo(this.collection, "all", this.render);
      this.delegateEvents();
    },

    template: function () {
      return _template({items: this.collection.models});
    },

    events: {
      "click li": "toggleChecked",
      "click .delete-item": "deleteItem"
    },

    toggleChecked: function(e) {
      e.preventDefault();
      var item = this.collection.get(e.currentTarget.id);
      item.toggleChecked();
    },

    deleteItem: function(e) {

      e.stopPropagation();
      e.preventDefault();
      var item = this.collection.get(e.currentTarget.parentElement.id);
      // item.delete;
      this.collection.remove(item);

    },

    render: function(){
      var content = this.template();
      this.$el.html(content);
      $(".items-left").html(String(this.collection.countLeft()));
      return this;
    }

  });



}(this));
