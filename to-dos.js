(function(root) {
  'use strict';
  // Namespaces app under the symbol "º".
  var º = root.º = root.º || {};

  º.begin = function(){
    º.itemColl = new º.Collections.Items();
    º.itemView = new º.Views.Items({collection: º.itemColl});

    // Seed to-do list with a welcome message.
    var firstItem = new º.Models.Item({body: "Make your first to-do!", checked: false});
    º.itemColl.push(firstItem);

    // Add jQuery listeners to DOM objects ouside the backbone-managed
    $("#add-to-do").on("submit", function(e){
      º.Models.newItem(e);
      // clear out text box.
      $("#add-to-do > input").val("");
    });
    $(".complete-all").on("click", º.itemColl.completeAll.bind(º.itemColl));
    $(".clear-completed").on("click", º.itemColl.clearCompleted.bind(º.itemColl));

    // Optimizes display for smaller screens (e.g. smartphones)
    var $window = $(window);
    if ($window.width() <= 500) {
      $(".content").addClass("mobile").removeClass("content");
    }
    // To make this more robust, we would extract this into its own function
    // and set a listener to call this function whenever the window size changes.


    // render initial to dos
    º.itemView.render();
  };



}(this));
  $(º.begin);
