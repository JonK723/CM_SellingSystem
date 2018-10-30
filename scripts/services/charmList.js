'use strict';

angular.module('sellingSystemApp')
  .factory('charmService', ['$resource', function($resource) {
    return $resource('data/charmData.json', { } ,{
      getData: {method: 'GET', isArray: true}
    });
  }]);

angular.module('sellingSystemApp')
  .service('filteredCharmService', ['charmService', function(charmService){
    var that = this;

    that.favoriteCharms = [];
    that.totalPrice = 0.0;

    charmService.getData(function(data){
      that.charmData = data.filter(function(charm){
        charm.quantity = 1;

        if(charm.SKU === 'TBD' || charm.SKU === 'JEWELRY') {
          return false;
        }
        return true;
      });
    });
  }]);
