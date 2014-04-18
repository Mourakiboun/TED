define([
		'text!templates/header.html','views/vizDetailItemView'], 
function(template,VizDetailItemView){
	var HeaderView = Backbone.View.extend({
		 el: '#header',
		 template: _.template(template),
                 events: {
                     "click #fr-menu": "showFrench",
                     "click #ar-menu": "showArabic",
                     "click #en-menu": "showEnglish",
		    },
		initialize: function(){
                        this.render();   
		},
		render: function(){
		 this.$el.html(this.template);
                 return this;
		},
                showFrench: function(){
                  if(window.tnelec.router.language!="fr"){
		    window.tnelec.router.language="fr";
                    //Static labels 
		   
		    if(Backbone.history.fragment=='')
		      window.tnelec.router.homeModel.goToFrench();
                     if(Backbone.history.fragment=='about')
		      window.tnelec.router.aboutModel.goToFrench();
		    if(Backbone.history.fragment=='2011' ){
		      window.tnelec.router.election2011Model.goToFrench();
		      window.tnelec.router.elections2011View.render();
		    }
		    if(Backbone.history.fragment=='2013' )
		      window.tnelec.router.elections2013model.goToFrench();
		    if(Backbone.history.fragment.length>5 ){
		      window.tnelec.router.election2011Model.goToFrench();
		      vizdetailView= new VizDetailItemView({model:window.tnelec.router.election2011Model.get(window.tnelec.router.vizid)});
		      vizdetailView.render();
		    }
                    $(".lang-fr").show();
		    $(".lang-en").hide();
		    $(".lang-ar").hide();
		}
                },
                showEnglish: function(){
                if(window.tnelec.router.language!="en"){
		    window.tnelec.router.language="en";
		    if(Backbone.history.fragment=='')
		      window.tnelec.router.homeModel.goToEnglish();
                    if(Backbone.history.fragment=='about')
		      window.tnelec.router.aboutModel.goToEnglish();
		    if(Backbone.history.fragment=='2011' ){
		      window.tnelec.router.election2011Model.goToEnglish();
		      window.tnelec.router.elections2011View.render();
		    }
		    if(Backbone.history.fragment=='2013' )
		      window.tnelec.router.elections2013model.goToEnglish();
		    if(Backbone.history.fragment.length>5 ){
		      window.tnelec.router.election2011Model.goToEnglish();
		      vizdetailView= new VizDetailItemView({model:window.tnelec.router.election2011Model.get(window.tnelec.router.vizid)});
		      vizdetailView.render();
		    }
                    $(".lang-en").show();
		    $(".lang-fr").hide();
		    $(".lang-ar").hide();                                                          
		}
                },
                showArabic: function(){
                if(window.tnelec.router.language!="ar"){
		    window.tnelec.router.language="ar";
		    if(Backbone.history.fragment=='')
		      window.tnelec.router.homeModel.goToArabic();
 		 if(Backbone.history.fragment=='about')
		      window.tnelec.router.aboutModel.goToArabic();
		    if(Backbone.history.fragment=='2011' ){
		      window.tnelec.router.election2011Model.goToArabic();
		      window.tnelec.router.elections2011View.render();
		    }
		    if(Backbone.history.fragment=='2013' )
		      window.tnelec.router.elections2013model.goToArabic();
		    if(Backbone.history.fragment.length>5 ){
		      window.tnelec.router.election2011Model.goToArabic();
		      vizdetailView= new VizDetailItemView({model:window.tnelec.router.election2011Model.get(window.tnelec.router.vizid)});
		      vizdetailView.render();
		    }  
                    $(".lang-ar").show();
		    $(".lang-en").hide();
		    $(".lang-fr").hide();                                                        
		}
                },
                selectMenuItem: function (menuItem,target,offset) {
                  $('#smoothmenu ul li a').removeClass('selected');
			if (menuItem) {
                      
			    $('#' + menuItem).addClass('selected');
                   
			}
	       }
	});

     return  HeaderView;
});
