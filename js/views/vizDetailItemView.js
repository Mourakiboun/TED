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
     if(document.URL.indexOf("intro") > -1) 
      {
           document.getElementById('viz-detail').innerHTML = "<div id='intro-holder'><p>Tunisia’s Oct. 23 2011 elections chose the members of the National Constituent Assembly, the body tasked with drafting Tunisia’s new con¬stitution and forming its transitional government. These elections were the result of a popu¬lar revolution through which Tunisians overthrew the existing authori¬tarian regime and sought to democratically elect a new government. </p></br><h3>Post-Revolution </h3><p>The speed of events that culminated in Tunisia’s January 2011 regime change left little time to create a government to manage the transition. The Tunisian Constitution was suspended in March 2011, as existing laws were deemed inadequate in the post-revolution context. A new legal frame¬work was promulgated for the National Constituent Assembly (NCA) elections, and in April the Independent High Authority for the Elections, or Instance Supérieure Independante pour les Elections (ISIE), was created to organize Tunisia’s first competitive elections. The ISIE was composed of a central commission based in Tunis and 33 Regional Independent Commissions for Elections (IRIE) offices covering 27 constituencies in Tunisia and six con¬stituencies abroad. </p></br><h3>Electoral law</h3><p>Electoral law stipulated that the NCA elections were to be conducted in one round using a closed-list proportional representation system. To allocate seats, the total number of valid votes was divided by the number of seats in each constituency to produce a quotient. Seats were allocated to each list that reached this threshold, and remaining seats were allocated to the political parties or independent lists with the largest remainders. </p><p>Seats are allocated to candidates in the order in which they appear on the list, providing political parties and independent heads of lists signifi¬cant leverage to decide the ordering of candidate lists. Tunisian elec¬toral law stipulates that lists shall be established in such a way as to alternate between men and women. While this gender parity clause was respected as a requirement during the candidate nomination process, only 7 percent of the lists were headed by female candidates, reducing the number of women that were actually elected. </p></br><h3>Voter Registration </h3><p>Tunisia’s new electoral law stipulated a mixed voter registration system, whereby citizens can choose to actively register to vote or be automatically added to the voter register via the national identity cards database. The voter registration exercise began on July 11 for an initial period of three weeks and was later extended through August 14. At the August closing of the registration process, the ISIE estimated that 3,882,727 citizens registered in Tunisia, approximately 47 percent of the estimated voting population. Because more than 4 million prospective vot¬ers did not update their data or select a polling sta¬tion, the ISIE offered unregistered voters September 4-20 to select a polling station within the governorate mentioned on their ID cards. By October 15, a total of 4,439,527 voters, approxi¬mately 54 percent of total estimated 8.2 million eli¬gible voters in Tunisia and abroad, had actively registered to vote. </p></br><h3>Boundary delimitation</h3><p>The electoral districts were revised in advance of the 2011 polls. Tunisia’s cur¬rent governmental boundaries were maintained for the governorates, and a new law was devised for constituencies. Building on the existing formula for seats per district (one seat for every 60,000 inhabitants), the new law included a provision for positive discrimi¬nation in favor of underdeveloped governor¬ates. The law stipulated that two addi¬tional seats were assigned to governorates with fewer than 270,000 inhabitants, and one additional seat was assigned to governorates with 270,000 to 500,000 inhabitants. </p><p>Three governorates — Tunis, Nabeul, and Sfax — had more than 630,000 inhabitants, and each was divided into two electoral districts. As a result, 27 constituencies were created, ranging from four to a maximum of 10 seats each. For the first time, six overseas constituencies (France I and II, Italy, Germany, Europe and the Americas, and Arab countries and the rest of the world) were created for eligible Tunisian voters resid¬ing abroad. The total number of seats in the National Constituent Assembly was 217, with 199 seats in 27 constituencies in Tunisia and 18 seats in six out-of-country constituencies for eligible Tunisian voters residing abroad. </p></br><h3>Nominations and Campaigning</h3><p>The candidate nomination period was conducted Sept. 1–7. The ISIE registered 1,519 candidate lists, 54.6 per¬cent of which were presented by political parties, 43.3 percent by independent candidates, and 2.4 percent by coalitions. </p><p>The campaign period opened on Oct. 1 and closed on Oct. 21, two days before the elections. The ISIE banned commercial political advertising during the pre-campaign period from September 12th to October 1st. </p></br><h3>Results </h3><p>According to the ISIE, 7,993,924 citizens were eligible to vote in the 2011 elections. On October 23, 51 percent of these eligible voters cast their ballots, including actively and passively registered voters. The ISIE announced preliminary results on Oct. 27 and published results at the district level by the number of seats won by parties and independent lists; final results were released on November 14. The Administrative Tribunal received a total of 104 requests for appeal on the preliminary results; 50 percent of the appeals filed to challenge the pre¬liminary elections results were dismissed on the basis of procedural shortcomings. </p></div>";

      }
     else {
                   this.map = L.mapbox.map('map', this.model.get("map"))
                  .setView([34.5, 10.7], 7)
                  .addControl(L.mapbox.shareControl());
                  this.showDash();}

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
