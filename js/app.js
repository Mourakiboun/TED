define(['router'], function(router){
	
       var init = function(){
		this.router = new router("en");
	};

	return { init: init};
   
});

