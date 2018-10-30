'use strict';

/**
 * @ngdoc function
 * @name sellingSystemApp.directive:sjCharm
 * @description
 * # sjCharm
 * Directive for a charm in the sellingSystemApp
 */

angular.module('sellingSystemApp')
  .directive('sjCharm', function(){
    return {
      restrict: 'E',
      replace: true,
      scope: {
        quantity: '@',
        charmInfo: '=', // link a charm object to the directive
        'toggleToFavorites': '&', // add a charm to the list of favorites
      },
      templateUrl: 'scripts/directives/sj-charm.html'
    };
  });
