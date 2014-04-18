define([
		'text!templates/elections.html'], 
function(template){
	var electionListItemView = Backbone.View.extend({
		 template: _.template(template),
                 events: {
		    },
		initialize: function(){
                this.model.on('change',this.render,this);
		},
		render: function(){
		 this.$el.html(this.template(this.model.attributes));
                 
                 return this;
               
		}
              
	});

     return  electionListItemView;
});
