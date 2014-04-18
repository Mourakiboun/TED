define([
		'text!templates/elections2013.html'], 
function(template){
	var HeaderView = Backbone.View.extend({
		 el: '#content',
		 template: _.template(template),
                 events: {
		    },
		initialize: function(){
                        $(this.el).empty(); 
                        $(window).scrollTop(); 
                        this.render(); 
                        this.model.on('change',this.render,this);
                        
		},
		render: function(){
		 this.$el.html(this.template(this.model.attributes));
                 return this;
		}
	});

     return  HeaderView;
});
