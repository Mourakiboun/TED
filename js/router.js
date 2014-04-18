define(['views/home','views/about','views/header','models/home','models/about','views/elections2011View','models/elections2013','models/viz','models/2011elections','views/vizDetailItemView','views/elections2013'], function(HomeView,AboutView,HeaderView,HomeModel,AboutModel,Election2011View,Election2013Model,Viz,Elections2011Model,VizDetailItemView,Elections2013View) {
var Router = Backbone.Router.extend({
    language:"en",
    routes: {
        "2011"   :"elections2011",
        "2011/:_id"   :"visDetails",
        "2013"     : "elections2013",
        "2013p"    : "pelections2013",
        "about" : "about",
        ''    :'home'
  
    },
     visDetails: function(id) {
      console.log("details" + id);
      this.vizid=id;
      this.detailModel =  this.election2011Model.get(id);
      console.log(this.election2011Model);
      console.log(this.detailModel);
      this.vizdetailView= new VizDetailItemView({model:this.detailModel});
      this.vizdetailView.render();
      this.headerview.selectMenuItem('menu-2011','e_2011',-25);
      if(this.language=='en'){
          $(".lang-en").show();
          $(".lang-fr").hide();
          $(".lang-ar").hide();

       }
      if(this.language=='fr'){
          $(".lang-fr").show();
          $(".lang-en").hide();
          $(".lang-ar").hide();

       }
       if(this.language=='ar'){
          $(".lang-ar").show();
          $(".lang-en").hide();
          $(".lang-fr").hide();

       }
      window.scrollTo(0,0);

     },
    elections2011: function () {
    this.election2011Model = new Elections2011Model();
    this.elections2011View= new Election2011View({model:this.election2011Model});

    this.headerview.selectMenuItem('menu-2011','e_2011',0);

    },
    home: function () {
      console.log('touchdown');
     if(!this.homeView){
       this.homeView = new HomeView({model: HomeModel});}
         $(this.homeView.el).empty();
         if(this.language=='fr')
          this.homeModel.goToFrench();
         if(this.language=='ar')
        this.homeModel.goToArabic();
        if(this.language=='en')
        this.homeModel.goToEnglish();
       this.homeView.render();
    },about: function () {
      console.log('about');
      this.aboutModel = new AboutModel();
     if(!this.aboutView){
       this.aboutView = new AboutView({model:this.aboutModel});}
         $(this.aboutView.el).empty();
         if(this.language=='fr')
          this.aboutModel.goToFrench();
         if(this.language=='ar')
        this.aboutModel.goToArabic();
        if(this.language=='en')
        this.aboutModel.goToEnglish();
       this.aboutView.render();
    },
    elections2013: function () {
      this.elections2013model=new Election2013Model()
        this.elections2013View= new Elections2013View({model:this.elections2013model});
          if(this.language=='fr')
          this.elections2013model.goToFrench();
         if(this.language=='ar')
        this.elections2013model.goToArabic();
        if(this.language=='en')
        this.elections2013model.goToEnglish();
         this.elections2013View.render();
	this.headerview.selectMenuItem('menu-2013','e_2013',0);
     
    },
    initialize: function(options) {
       this.language = options.language;
       this.homeModel= new HomeModel();
       this.headerview= new HeaderView();
       this.homeView = new HomeView({model:this.homeModel});
       this.homeView.render();
       $(".lang-fr").hide();
       $(".lang-ar").hide();
     
    }
  });
  Backbone.history.start();
  return Router;
});

