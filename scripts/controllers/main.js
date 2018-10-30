'use strict';

/**
 * @ngdoc function
 * @name sellingSystemApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sellingSystemApp
 */
angular.module('sellingSystemApp')
  .controller('MainCtrl', ['$scope', '$routeParams', '$filter', '$http', '$location', '$window', 'filteredCharmService', function ($scope, $routeParams, $filter, $http, $location, $window, filteredCharmService) {

      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

      $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
      });

      $scope.charms = filteredCharmService.charmData; // list of charms from JSON file
      $scope.isCharm = false; // flag to filter out chains
      $scope.totalPrice = 0.0;
      $scope.selectedCharms = [];
      $scope.quantity = 1;
      $scope.userName = '';
      $scope.email = '';

      if($routeParams.charmType) {
        //First clear out the selected charms
        $scope.currentCategory = [];

        if($routeParams.charmType === "Brand-MC"){
          $routeParams.charmType = "Brand-M/C";
        }

        switch($routeParams.charmType) {
          case 'starter': $scope.currentCategory = $filter('filter')($scope.charms, {'$': 'STARTER BR'}, false);
            $scope.isCharm = false;
            break;
          case 'bolo': $scope.currentCategory = $filter('filter')($scope.charms, {'$': 'bolo'}, false);
            $scope.isCharm = false;
            break;
          case 'necklaces': $scope.currentCategory = $filter('filter')($scope.charms, {'$': 'necklaces'}, false);
            $scope.isCharm = false;
            break;
          case 'bangles': $scope.currentCategory = $filter('filter')($scope.charms, {'$': 'bangle'}, false);
            $scope.isCharm = false;
            break;
          case 'traditional': $scope.currentCategory = $filter('filter')($scope.charms, function(value, index, array){
            if((value.Theme === 'Bracelets') && (value.Description.indexOf('STARTER') < 0) && (value.Description.indexOf('Bangle') < 0) && (value.Description.indexOf('Bolo') < 0)) {
              return true;
            }
          }, false);
            $scope.isCharm = false;
            break;
          case 'spacer': $scope.currentCategory = $filter('filter')($scope.charms, {'$': 'spacer'}, false);
            $scope.isCharm = false;
            break;
          case 'stopper': $scope.currentCategory = $filter('filter')($scope.charms, {'$': 'stopper'}, false);
            $scope.isCharm = false;
            break;
          case 'general': $scope.currentCategory = $filter('filter')($scope.charms, function(value, index, array){
            if ((value.Theme === "Family") || (value.Theme === "Initials") || (value.Theme === "Inspirational") || (value.Theme === "Lifestyles") || (value.Theme === "Love") || (value.Theme === "Animals") || (value.Theme === "Cause & Awareness") || (value.Theme === "Charity")){
              return true;
            }
          }, false);
            $scope.isCharm = true;
            break;
          default:
            $scope.currentCategory = $filter('filter')($scope.charms, {'Theme': $routeParams.charmType}, false);
            $scope.isCharm = true;
            break;
        }
      }

      $scope.toggleToFavorites = function(charm){

        if(_.indexOf(filteredCharmService.favoriteCharms, charm) >= 0) {
          filteredCharmService.totalPrice -= (charm.Retail * (charm.quantity === undefined ? 1 : charm.quantity));
          charm.isFavorite = !charm.isFavorite;
          filteredCharmService.favoriteCharms = _.without(filteredCharmService.favoriteCharms, charm);
        } else {
          filteredCharmService.favoriteCharms.push(charm);
          charm.isFavorite = !charm.isFavorite;
          filteredCharmService.totalPrice += (charm.Retail * (charm.quantity === undefined ? 1 : charm.quantity));
        }

      };

      $scope.totalCharms = function(){
        $scope.total = 0;

        for(var i = 0; i < filteredCharmService.favoriteCharms.length; i++) {
          $scope.total += filteredCharmService.favoriteCharms[i].quantity;
        }

        return $scope.total;
      };

      $scope.$watch(function(){
        $scope.selectedCharms = filteredCharmService.favoriteCharms;
        $scope.totalPrice = filteredCharmService.totalPrice;

        $scope.totalPrice = 0.0;

        for(var i = 0; i < filteredCharmService.favoriteCharms.length; i++) {
          $scope.totalPrice += filteredCharmService.favoriteCharms[i].Retail * filteredCharmService.favoriteCharms[i].quantity;
        }
      });

      $scope.clearFavorites = function(){
        for(var i = 0; i < filteredCharmService.favoriteCharms.length; i++) {
          filteredCharmService.favoriteCharms[i].isFavorite = false;
          filteredCharmService.favoriteCharms[i].quantity = 1;
        }

        filteredCharmService.favoriteCharms = [];
      };

      $scope.sendFavorites = function() {
        var favoriteData = {};

        favoriteData.userName = $scope.userName;
        favoriteData.email = $scope.email;
        favoriteData.totalQuantity = $scope.totalCharms();
        favoriteData.totalPrice = filteredCharmService.totalPrice;
        favoriteData.data = $filter('json')(filteredCharmService.favoriteCharms);

        $http.post(
          'sendCharms.php',
          $.param(favoriteData)
        ).
        success(function(data, status, headers){
          $window.ga('send', 'event', 'Selling System Action', 'Email List');

          if(data === "true") {
            jQuery('#modalSend').on('hidden.bs.modal', function(e){
              if(data === 'true') {
                jQuery('#emailModal').delay(2000).modal('show');
              }
            });

            jQuery('#modalSend').modal('hide');
          }
          else {
            console.log(data);
          }
        }).
        error(function(data, status, headers){
          //console.log("ERROR!!! -----> " + status);
        });

        $scope.userName = '';
        $scope.email = '';
        favoriteData = {};

        $scope.form.$setPristine();
      }

      $scope.printFavorites = function(){
        var favoriteData = {};
        favoriteData.totalQuantity = $scope.totalCharms();
        favoriteData.totalPrice = filteredCharmService.totalPrice;
        favoriteData.data = $filter('json')(filteredCharmService.favoriteCharms);

        $http.post('printCharms.php', $.param(favoriteData)).
        success(function(data, status, headers){
          // data should be the contents of the page to print
          if(data !== "") {
            $window.ga('send', 'event', 'Selling System Action', 'Print List');

            var pageContents = data;
            window.location = pageContents;
          }
          else {
            //console.log(data);
          }
        }).
        error(function(data, status, headers){
          //console.log("ERROR!!! -----> " + status);
        });

        $scope.userName = '';
        $scope.email = '';
        favoriteData = {};
      }
  }]);
