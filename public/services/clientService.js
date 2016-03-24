'use strict'

angular.module('petApp')
.factory('ClientService', function($http) {

  function getClients() {
    return $http.get("/clients")
  };

  function addClient(newClient) {
    return $http.post("/clients", newClient)
  };

  function editClient(client, id) {
    return $http.put(`/clients/${id}`, client)
  };

  function deleteClient(id) {
    return $http.delete(`clients/${id}`)
  };

  return {
    getClients: getClients,
    addClient: addClient,
    editClient: editClient,
    deleteClient: deleteClient
  }
})
