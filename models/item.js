(function(root) {
  'use strict';
  // Namespaces app under the symbol "º".
  var º = root.º = root.º || {};
  º.Models = {};

  º.Models.newItem = function (e) {
    e.preventDefault();
    var text = e.currentTarget.children[0].value;
    if (text !== "") {
      var item = new º.Models.Item({body: e.currentTarget.children[0].value, checked: false});
      º.itemColl.push(item);
    }
  };

  º.Models.Item = Backbone.Model.extend({
    // urlRoot: 'api/items',

    toggleChecked: function(){
      this.set({checked: (this.attributes.checked) ? false : true});
    },
  });



}(this));
