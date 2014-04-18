define([
		'text!templates/home.html','models/home'], 
function(template,home){
	var HomeView = Backbone.View.extend({
		 el: '#content',
		 template: _.template(template),
                 events: {
		    },
		initialize: function(){
                     $(this.el).empty(); 
                         $(window).scrollTop(); 
                     if(this.model) {
		      this.model.on('change',this.render,this);
		  }	 
		},
		render: function(){
		 this.$el.html(this.template(this.model.attributes));
                  
                 
                 return this;
               
		}
              
	});

     return  HomeView;
});
