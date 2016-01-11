(function(root) {
  'use strict';
  // Namespaces app under the symbol "º".
  var º = root.º = root.º || {};
  º.Collections = {};

  º.Collections.Items = Backbone.Collection.extend({
    model: º.Models.Item,
    // url: "api/items",

    sortedModels: function() {
      var yetToDo = [];
      var done = [];
      _(this.models).each(function(item){
        if (item.attributes.checked) {
          done.push(item);
        } else {
          yetToDo.push(item);
        }
      });
      return yetToDo.concat(done);
    },

    completeAll: function(e) {
      e.preventDefault();
      this.models.forEach(function(item){
        item.set({checked: true});
        // item.save;
      });
    },

    clearCompleted: function(e) {
      e.preventDefault();
      var checkedItems = [];
      this.models.forEach(function(item){
        if (item.attributes.checked) {
          checkedItems.push(item);
          // item.destroy;
        }
      }.bind(this));
      this.remove(checkedItems);
    },

    countLeft: function() {
      return _(this.models).inject(function(count, el) {
        if (!el.attributes.checked) {
          ++count;
        }
        return count;
      }, 0);
    }

  });



}(this));
