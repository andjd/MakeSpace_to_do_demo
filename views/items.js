(function(root) {
  'use strict';
  // Namespaces app under the symbol "º".
  var º = root.º = root.º || {};
  º.Views = {};

  // template for each to do item.  Template is embedded here for brevity.
  var _template =  _.template(
    '<% for (var i = 0; i < items.length; i++) { %>' +
    '  <li id="<%= items[i].cid %>" class="<%= (items[i].attributes.checked) ? "checked" : "unchecked" %>">' +
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
      this.listenTo(this.collection, "all", this.animateAndRender);
      this.delegateEvents();
    },

    template: function () {
      return _template({items: this.collection.sortedModels()});
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

    animateAndRender: function() {
      var currentItems = _(this.$el.children()).map(function(domItem){
        return domItem.id;
      });
      var nextItems = _(this.collection.sortedModels()).map(function(item){
        return item.cid;
      });

      var animating = false;

      _(currentItems).each(function(itemID, currentIndex){
        var nextIndex = nextItems.indexOf(itemID);
        var animatingItem = this.animateItem(itemID, currentIndex, nextIndex);
        if (animatingItem) {animating = true;}
      }.bind(this));

      // Delays re-render if animations are happening
      setTimeout(this.render.bind(this), (animating) ? 355 : 0);
    },

    animateItem: function(itemID, prev, next) {
      var $item = $("#" + itemID);
      // item is being deleated
      if (next === -1) {
        $item.addClass("remove behind");
        return true;
      }
      var difference = next - prev;
      switch (difference) {
        case 1:
          $item.addClass("going-down behind");
          return true;
        case -1:
          $item.addClass("going-up");
          return true;
        case 0:
          // returns false if item is not being animated
          return false;
        default:
          if (difference > 1) {
            $item.addClass("behind");
          }
          $item.css({"top": String(difference * 40) + "px"});
          return true;
      }

    },

    render: function(){
      var content = this.template();
      this.$el.html(content);
      $(".items-left").html(String(this.collection.countLeft()));
      return this;
    }

  });



}(this));
