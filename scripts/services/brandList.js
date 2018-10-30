'use strict';

angular.module('sellingSystemApp')
  .factory('brandListService', function() {
    var brandList = [
      {
        "url" : "#/select-charms/Brand-Starwars",
        "image" : "images/starWarsLogo.jpg"
      },
      {
        "url" : "#/select-charms/Brand-JS",
        "image" : "images/openHeartsLogo.jpg"
      },
      {
        "url" : "#/select-charms/Glass",
        "image" : "images/muranoLogo.jpg"
      },
      {
        "url" : "#/select-charms/Timebeads",
        "image" : "images/timebeadsLogo.jpg"
      },
      {
        "url" : "#/select-charms/Bridal",
        "image" : "images/bridalLogo.jpg"
      },
      {
        "url" : "#/select-charms/Armed Forces",
        "image" : "images/armedForcesLogo.jpg"
      },
      {
        "url" : "#/select-charms/disney",
        "image" : "images/disneyLogo.jpg"
      },
      {
        "url" : "#/select-charms/Crystal",
        "image" : "images/crystalCharmLogo.jpg"
      },
      {
        "url" : "#/select-charms/Brand-MC",
        "image" : "images/motherChildLogo.jpg"
      },
      {
        "url" : "#/select-charms/NFL",
        "image" : "images/nflLogo.jpg"
      },
      {
        "url" : "#/select-charms/Collegiate",
        "image" : "images/collegiateLogo.jpg"
      },
      {
        "url" : "#/select-charms/Precious Pet",
        "image" : "images/preciousPetLogo.jpg"
      },
      {
        "url" : "#/select-charms/general",
        "image" : "images/otherLogo.jpg"
      },
    ];

    return brandList;
  });
