'use strict';

/**
 * @ngdoc function
 * @name sellingSystemApp.controller:BrandCtrl
 * @description
 * # BrandCtrl
 * Controller of the sellingSystemApp
 */

 angular.module('sellingSystemApp')
   .controller('BrandCtrl', ['$scope', '$log', 'brandListService', function($scope, $log, brandListService){

     $scope.brandLists = brandListService;

     //$log.log($scope.brandLists);
   }]);
