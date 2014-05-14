define([
		'views/electionListItemView','models/viz'], 
function(ItemView,viz){
	var election2011View = Backbone.View.extend({
		el:'#content',
		initialize: function(){
                   
                   this.render();
                   this.model.on('change',this.render,this);
                   $(window).scrollTop(); 	

		},
		render: function(){
      console.log("ahlmaaaa");
          var desc = '<div class="story-main-space lang-en"  style="min-height: 100px;"><div class="col-lg-12 col-md-12 col-sm-12"><span style="font-size:30;font-family: Arial;color: white;vertical-align:-35px;">2011 Tunisian Elections Summary</span><a style="float:right" class="button" href="#2011/14"><h4>Learn more</h4></a></div></div>' ;
          var desc_fr = '<div class="story-main-space lang-fr"  style="min-height: 100px;"><div class="col-lg-12 col-md-12 col-sm-12"><span style="font-size:30;font-family: Arial;color: white;vertical-align:-35px;">Résumé des élections tunisiennes de 2011</span><a style="float:right" class="button" href="#2011/14"><h4>Lire la suite</h4></a></div></div>' ;
          var desc_ar = '<div class="story-main-space lang-ar"  style="min-height: 100px;"><div class="col-lg-12 col-md-12 col-sm-12"><span style="font-size:30;font-family: Helve;color: white;vertical-align:-35px;">ملخص كذا خذا كذا خذا ...</span><a style="float:left" class="button" href="#2011/14"><h4>المزيد</h4></a></div></div>' ;
                  
                  $(this.el).empty(); 
                  if (window.tnelec.router.language=="fr") 
                    $(this.el).append(desc_fr);
                  else if (window.tnelec.router.language=="ar") 
                  $(this.el).append(desc_ar);
                  else
                  $(this.el).append(desc);
                  
                  

                  var electionItems = this.model.models;
        	  var len = electionItems.length;
                  for (var i = 1; i < len; i++) {
                    var currentItem= new ItemView({model:electionItems[i]});
                        currentItem.render();
		      $(this.el).append(currentItem.el);
		    } 
                 return this;
               
		} 
	});

     return  election2011View;
});
