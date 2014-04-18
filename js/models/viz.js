define([
], function() {

	var viz = Backbone.Model.extend({
                idAttribute: "_id",
		defaults: {
                   "_id":"0",
	           "title": "first title",
	           "subtitle": "first subtitle",
		   "description": "first description",
		   "about_data": "first about",
		   "methodology": "first methodology",
                   "learn":"Learn more"
		}
        
		
	});
     
	return viz;
});
