var personsList = angular.module('personsList', ['ui.bootstrap']);

personsList.directive('personsTable', function() {
  return {
    restrict: 'E',
    templateUrl: 'personstable.html'
  };
});

personsList.factory('Config', function() {
  return {
    filePath: '../../persons.json'
  };
});

personsList.factory('ListService', function(Config, $http) {
  return {
    getPersons: function() {
      return $http.get(Config.filePath);
    }
  };
});

personsList.controller('MainCtrl', function($scope, $http, $uibModal, $log, ListService) {
  $scope.persons = [];
  $scope.formatted;
  $scope.preformat = '';
  $scope.animationsEnabled = true;

  $scope.open = function(size) {
    var addPersonForm = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'addperson.html',
      controller: 'AddFormCtrl',
      size: size,
      resolve: {
        persons: function() {
          return $scope.persons;
        }
      }
    });

    addPersonForm.result.then(function() {
      $scope.getFormatted($scope.persons);
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

  $scope.deletePerson = function(person) {
    var indexToDel = $scope.persons.indexOf(person);
    $scope.persons.splice(indexToDel, 1);
    $scope.getFormatted($scope.persons);
  };

  $scope.getFormatted = function(object) {
    $scope.preFormat = JSON.stringify(object, undefined, '');
    $scope.formatted = $scope.preFormat.replace(/,(?=[a-z]*{)/g, ',\n');
    return $scope.formatted;
  };

  ListService.getPersons().success(function(persons) {
    $scope.persons = persons;
    $scope.getFormatted(persons);
  });
});

personsList.controller('AddFormCtrl', function($scope, $uibModalInstance, persons) {
  $scope.persons = persons;
  $scope.submitForm = function(newPerson) {
    $uibModalInstance.close(newPerson);
    $scope.checkPersonEmployee(newPerson);
  };

  $scope.checkPersonEmployee = function(person) {
    if (!person.employee) {
      person.employee = false;
    }
    $scope.persons.push(person);
  };

  $scope.cancelForm = function() {
    $uibModalInstance.dismiss('cancel');
  };
});
