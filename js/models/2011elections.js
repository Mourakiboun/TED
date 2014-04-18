
define(['models/viz'
], function(viz) {

	var elections2011= Backbone.Collection.extend({
		model:viz,
		initialize: function(){	

                 lang=window.tnelec.router.language;
                 if(typeof lang != 'undefined')
                 this.load(lang);
                 else
                 this.load("en");
                 
 		},
                load: function (lang) {
		 this.fetch({ 
                    async:false,
		    url: "data/" + lang + "/2011.json", 
		    success: function() {
			  console.log("JSON file load was successful", this);
                          
		      },
		    error: function(){
		       console.log('There was some error in loading and processing the JSON file');
		    }
		  });
                },
                 goToFrench: function() {
                  this.fetch({ 
                    async:false,
		    url: "data/fr/2011.json", 
		    success: function() {
			  console.log("French file load was successful", this);
                        
		      },
		    error: function(){
		       console.log('There was some error in loading and processing the JSON file');
		    }
		  });

           
		}, 
		goToArabic: function() {
		  this.fetch({ 
                    async:false,
		    url: "data/ar/2011.json", 
		    success: function() {
			  console.log("Arabic file load was successful", this);
		      },
		    error: function(){
		       console.log('There was some error in loading and processing the JSON file');
		    }
		  });

		      
	        },
		goToEnglish: function() {
		 this.fetch({ 
                    async:false,
		    url: "data/en/2011.json", 
		    success: function() {
			  console.log("English file load was successful", this);
		      },
		    error: function(){
		       console.log('There was some error in loading and processing the JSON file');
		    }
		  });
		      
	      }
       	
	});
           
	return elections2011;
});
