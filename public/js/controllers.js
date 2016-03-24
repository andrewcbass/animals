'use strict';

var app = angular.module('petApp');

app.controller('mainCtrl', function($scope) {
});

app.controller('homeCtrl', function($scope) {
});

app.controller("petsCtrl", function($scope, $state, PetService) {

  var clientId = $state.params.clientId;

  $scope.showAll = true;
  $scope.showAdopted = false;
  $scope.showAvail = false;

  $scope.showAllNow = function() {
    //get ALL pets
    PetService.getPets()
    .then(function(res) {
      $scope.pets = res.data;
    }, function(err) {
      console.log('err', err)
    });
    $scope.showAll = true;
    $scope.showAdopted = false;
    $scope.showAvail = false;
  };

  $scope.showAdoptedNow = function() {
    //get adopted pets
    PetService.getAdoptedPets()
    .then(function(res) {
      $scope.petsAdopted = res.data;
    }, function(err) {
      console.log('err', err)
    });
    $scope.showAll = false;
    $scope.showAdopted = true;
    $scope.showAvail = false;
  };

  $scope.showAvailNow = function() {
    //get available pets
    PetService.getAvailPets()
    .then(function(res) {
      $scope.petsAvail = res.data;
    }, function(err) {
      console.log('err', err)
    });
    $scope.showAll = false;
    $scope.showAdopted = false;
    $scope.showAvail = true;
  }

  $scope.likePet = function(petId) {
    if(!clientId) {
      console.log("Choose client first!");
    }

    PetService.addClientInterest(petId, clientId)
      .then(function(res) {
        $scope.showAvailNow();
      }, function(err) {
        console.log('ERR', err);
      });

  }

  $scope.buyPet = function(petId) {
    if(!clientId) {
      console.log("Choose client first!");
    }

    PetService.addOwner(petId, clientId)
      .then(function(res) {
        $scope.showAdoptedNow();
      }, function(err) {
        console.log('ERR', err);
      });
  }

  $scope.deletePet = function(pet) {
    var id = pet._id;
    PetService.deletePet(id)
      .then(function(res) {
        var index = $scope.pets.indexOf(pet);
        $scope.pets.splice(index, 1);
      }, function(err) {
        console.log('ERR', err);
      });
  }
});

app.controller("clientsCtrl", function($scope, $state, ClientService) {

  ClientService.getClients()
    .then(function(res) {
      $scope.clients = res.data;

    }, function(err) {
      console.log('ERR', err);
    });

  $scope.shopAs = function(clientId) {
    $state.go("pets", {'clientId': clientId});
  }

  $scope.deleteClient = function(client) {
    var id = client._id;
    ClientService.deleteClient(id)
      .then(function(res) {
        var index = $scope.clients.indexOf(client);
        $scope.clients.splice(index, 1);
      }, function(err) {
        console.log('ERR', err);
      });
  };

});
app.controller("addCtrl", function($scope, $state, ClientService, PetService) {
  $scope.addClientShow = false;
  $scope.addPetShow = false;

  $scope.addPetPls = function() {
    $scope.addClientShow = false;
    $scope.addPetShow = true;
  }

  $scope.addClientPls = function() {
    $scope.addClientShow = true;
    $scope.addPetShow = false;
  }

  $scope.saveNewClient = function(valid) {
    if(!valid) return;
    var newClient = $scope.newClient;
    ClientService.addClient(newClient)
      .then(function(res) {
        $scope.newClient = {};
        $state.go("clients");
      }, function(err) {
        console.log('ERR', err);
      });
  };

  $scope.saveNewPet = function(valid) {
    if(!valid) return;
    var newPet = $scope.newPet;
    PetService.addPet(newPet)
      .then(function(res) {
        $scope.newPet = {};
        $state.go("pets");
      }, function(err) {
        console.log('ERR', err);
      });
  };

  $scope.cancelAll = function() {
    $scope.addClientShow = false;
    $scope.addPetShow = false;
  }
});
