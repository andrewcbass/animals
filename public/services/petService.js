'use strict'

angular.module('petApp')
.factory('PetService', function($http) {

  function getPets() {
    return $http.get("/pets")
  };

  function getAvailPets() {
    return $http.get("/pets/available")
  };

  function getAdoptedPets() {
    return $http.get("/pets/adopted")
  };

  function addPet(newPet) {
    return $http.post("/pets", newPet)
  };

  function addClientInterest(petId, clientId) {
    return $http.put(`/pets/${petId}/addClient/${clientId}`)
  };

  function addOwner(petId, clientId) {
    return $http.put(`/pets/${petId}/addOwner/${clientId}`)
  }

  function editPet(pet, id) {
    return $http.put(`/pets/${id}`, pet)
  };

  function deletePet(id) {
    return $http.delete(`pets/${id}`)
  };

  return {
    getPets: getPets,
    getAvailPets: getAvailPets,
    getAdoptedPets: getAdoptedPets,
    addPet: addPet,
    addClientInterest: addClientInterest,
    addOwner: addOwner,
    editPet: editPet,
    deletePet: deletePet
  }
})
