'use strict';

/**
 * @ngdoc overview
 * @name sellingSystemApp
 * @description
 * # sellingSystemApp
 *
 * Main module of the application.
 */
angular
  .module('sellingSystemApp', [
    'ngAnimate',
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'angularUtils.directives.dirPagination'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/start-bracelet', {
        templateUrl: 'views/start-bracelet.html',
        controller: 'MainCtrl'
      })
      .when('/start-bracelet/:charmType', {
        templateUrl: 'views/charms.html',
        controller: 'MainCtrl'
      })
      .when('/select-charms', {
        templateUrl: 'views/brand-select.html',
        controller: 'BrandCtrl'
      })
      .when('/select-charms/:charmType', {
        templateUrl: 'views/charms.html',
        controller: 'MainCtrl'
      })
      .when('/finish-charms', {
        templateUrl: 'views/stoppers-select.html',
        controller: 'MainCtrl'
      })
      .when('/finish-charms/:spacers', {
        templateUrl: 'views/stoppers-select.html',
        controller: 'MainCtrl'
      })
      .when('/view-charms', {
        templateUrl: 'views/final-selection.html',
        controller: 'MainCtrl'
      })
      .otherwise('/');
  });
