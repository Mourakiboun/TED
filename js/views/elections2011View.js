define([
		'views/electionListItemView','models/viz'], 
function(ItemView,viz){
	var election2011View = Backbone.View.extend({
		el:'#content',
		initialize: function(){
                   $(window).scrollTop(); 
                   this.render();	 
		},
		render: function(){
                  $(this.el).empty(); 
                  var electionItems = this.model.models;
        	  var len = electionItems.length;
                  for (var i = 0; i < len; i++) {
                    var currentItem= new ItemView({model:electionItems[i]});
                        currentItem.render();
		      $(this.el).append(currentItem.el);
		    } 
                 return this;
               
		} 
	});

     return  election2011View;
});
