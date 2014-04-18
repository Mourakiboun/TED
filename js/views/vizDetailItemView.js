define([
		'text!templates/vizDetail.html'], 
function(template){
	var VizDetailItemView = Backbone.View.extend({
		 el: '#content',
		 template: _.template(template),
                 events: {
                     //"click #showDash": "showDash",
                     "click #showDash": "hideDash"
		    },
		initialize: function(){

                         $(window).scrollTop(); 
                  	  this.render();
                          this.model.on('change',this.render,this);


		},
		render: function(){
                  $(this.el).empty();
		 this.$el.html(this.template(this.model.attributes));
                   this.map = L.mapbox.map('map', this.model.get("map"))
                  .setView([34.5, 10.7], 7)
                  .addControl(L.mapbox.shareControl());
                  this.showDash();

                 return this;
               
		},
                showDash: function() {
                var showDashButton=document.getElementById( 'showDash' ),
                  mapZone=document.getElementById( 'viz-detail' ),
                  descriptionDash=document.getElementById('description-dash');
                  
                  $('#description-dash').addClass("dash-right-open");
                  //$('#showDash').removeClass("showdash-right");
                  $('#showDash').hide();
                  //$("#overlay").addClass("overlay_bk");
                  },

                hideDash: function() {
                 console.log("description dash clicked by event");
                 var showDashButton=document.getElementById( 'showDash' ),
                 mapZone=document.getElementById( 'viz-detail' ),
                 descriptionDash=document.getElementById('description-dash');
                 //  $('#viz-detail').removeClass("dash-right-push-toleft");
                   $('#description-dash').removeClass("dash-right-open");

                    $('#showDash').addClass("showdash-right");
                    $('#showDash').show();
               // $("#overlay").removeClass("overlay_bk");
                }
              
	});

     return  VizDetailItemView;
});
