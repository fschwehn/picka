angular.module('app', [])
.controller('PickaDemoCtrl', function($scope, $http) {
  $scope.start = new Date('1979-07-11T00:00:00.000+01:00')
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
      
      Object.defineProperty(scope, 'hour', {
        get: function() { if (scope.date) return scope.date.getHours() },
        set: function(v) { if (v !== undefined) getDate().setHours(v) },
      })
      
      Object.defineProperty(scope, 'minute', {
        get: function() { if (scope.date) return scope.date.getMinutes() },
        set: function(v) { if (v !== undefined) getDate().setMinutes(v) },
      })
      
      scope.today = function() {
        scope.date = new Date()
      }
      
      scope.clear = function() {
        delete scope.date
      }
    },
    // templateUrl: 'picka.html'
    template: function(tElem, tAttrs) {
      var format = angular.isString(tAttrs.format) ? tAttrs.format : 'Y / M / D - h : m'
      var inner = ''
      
      for (var c of format) {
        switch(c) {
          case 'Y': {
            inner += '<input type="number" class="picka-comp picka-comp-year" ng-model="year">'
            break
          }
          case 'M': {
            inner += '<input type="number" class="picka-comp picka-comp-month" ng-model="month">'
            break
          }
          case 'D': {
            inner += '<input type="number" class="picka-comp picka-comp-day" ng-model="day">'
            break
          }
          case 'h': {
            inner += '<input type="number" class="picka-comp picka-comp-hour" ng-model="hour">'
            break
          }
          case 'm': {
            inner += '<input type="number" class="picka-comp picka-comp-minute" ng-model="minute">'
            break
          }
          default: {
            inner += c
          }
        }
      }
      
      tElem.addClass('picka')
      tElem.append(inner)
    }
  }
})