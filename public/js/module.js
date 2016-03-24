'use strict';

angular.module('petApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl'
    })
    .state('pets', {
      url: '/pets',
      templateUrl: 'partials/pets.html',
      controller: 'petsCtrl',
      params: {"clientId":null}
    })
    .state('editPet', {
      url: '/editPet',
      templateUrl: 'partials/editPet.html',
      controller: 'petEditCtrl',
      params: {"pet":null}
    })
    .state('editClient', {
      url: '/editClient',
      templateUrl: 'partials/editClient.html',
      controller: 'clientEditCtrl',
      params: {"client":null}
    })
    .state('clients', {
      url: '/clients',
      templateUrl: 'partials/clients.html',
      controller: 'clientsCtrl'
    })
    .state('add', {
      url: '/add',
      templateUrl: 'partials/add.html',
      controller: 'addCtrl'
    })
});
