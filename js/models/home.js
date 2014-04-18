define([
], function() {

	var home = Backbone.Model.extend({
		defaults: {
	           "title": "Tunisia elections",
	           "subtitle": "A project exploring open data",
		   "description": "English description"
		},
                events: {
                     "click #fr-menu": "goToFrench"/*,
                       "click #ar-menu": "showArabic",*/
		    },
            goToFrench: function() {
              this.set({"title": "Elections Tunisiennes",
			"subtitle": "Navigateur des données ouvertes",
		        "description": "Description française" 
		});

           
             }, 
            goToArabic: function() {
              this.set({"title": "الإنتخابات التونسية",
			"subtitle": "متصفح البيانات المفتوحة",
		        "description": "Description arabe" 
		});
	      
            },
            goToEnglish: function() {
              this.set({"title": "Tunisia elections",
			"subtitle": "A project exploring open data",
		        "description": "A project exploring open data" 
		});
	      
            }
         
		
	});
      
	return home;
});
