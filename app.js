angular.module('app', [])
.controller('PickaDemoCtrl', function($scope, $http) {
  $scope.start = new Date(2014, 6, 11)
  $scope.end = new Date()
})
.directive('picka', function() {
  return {
    scope: {
      date: '=ngModel',
    },
    link: function(scope, element, attrs, controller, transcludeFn) {
      function getDate() {
        return scope.date ? scope.date : (scope.date = new Date())
      }
      
      Object.defineProperty(scope, 'year', {
        get: function() { if (scope.date) return scope.date.getFullYear() },
        set: function(v) { if (v !== undefined) getDate().setFullYear(v) },
      })
      
      Object.defineProperty(scope, 'month', {
        get: function() { if (scope.date) return scope.date.getMonth() + 1 },
        set: function(v) { if (v !== undefined) getDate().setMonth(v - 1) },
      })
      
      Object.defineProperty(scope, 'day', {
        get: function() { if (scope.date) return scope.date.getDate() },
        set: function(v) { if (v !== undefined) getDate().setDate(v) },
      })
      
      scope.today = function() {
        scope.date = new Date()
      }
      
      scope.clear = function() {
        scope.date = null
      }
    },
    templateUrl: 'picka.html'
  }
})