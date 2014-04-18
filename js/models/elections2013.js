define([
], function() {

	var elections2013 = Backbone.Model.extend({
		defaults: {
	           "title": "Upcoming elections",
	           "subtitle": "Revisit us soon for data on the upcoming elections.",
		},
                events: {
                
		    },
            goToFrench: function() {
              this.set({"title": "Les prochaines élections",
			"subtitle": "Les données sur les prochaines élections seront disponibles dès que possible"

		});

           
             }, 
            goToArabic: function() {
              this.set({"title": "الإنتخابات التونسية",
			"subtitle": ""
		});
	      
            },
            goToEnglish: function() {
              this.set({"title": "Upcoming elections",
			"subtitle": "Revisit us soon for data on the upcoming elections."
		});
	      
            }
         
		
	});
      
	return elections2013;
});
