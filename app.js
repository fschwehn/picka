angular.module('app', [])

.directive('picka', function() {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: {},
    link: function(scope, element, attrs, ngModel) {
      ngModel.$viewChangeListeners.push(function() {
        scope.$eval(attrs.ngChange);
      })
      
      ngModel.$render = function() {
        scope.date = ngModel.$modelValue
      }
      
      function getDate() {
        return scope.date ? scope.date : (scope.date = new Date())
      }
      
      Object.defineProperty(scope, 'year', {
        get: function() { if (scope.date) return scope.date.getFullYear() },
        set: function(v) { if (angular.isNumber(v)) ngModel.$setViewValue(new Date(getDate().setFullYear(v))) },
      })
      
      Object.defineProperty(scope, 'month', {
        get: function() { if (scope.date) return scope.date.getMonth() + 1 },
        set: function(v) { if (angular.isNumber(v)) ngModel.$setViewValue(new Date(getDate().setMonth(v - 1))) },
      })
      
      Object.defineProperty(scope, 'day', {
        get: function() { if (scope.date) return scope.date.getDate() },
        set: function(v) { if (angular.isNumber(v)) ngModel.$setViewValue(new Date(getDate().setDate(v))) },
      })
      
      Object.defineProperty(scope, 'hour', {
        get: function() { if (scope.date) return scope.date.getHours() },
        set: function(v) { if (angular.isNumber(v)) ngModel.$setViewValue(new Date(getDate().setHours(v))) },
      })
      
      Object.defineProperty(scope, 'minute', {
        get: function() { if (scope.date) return scope.date.getMinutes() },
        set: function(v) { if (angular.isNumber(v)) ngModel.$setViewValue(new Date(getDate().setMinutes(v))) },
      })
      
      scope.now = function() {
        ngModel.$setViewValue(scope.date = new Date())
      }
      
      scope.today = function() {
        var d = new Date()
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate())
        ngModel.$setViewValue(scope.date = d)
      }
      
      scope.clear = function() {
        ngModel.$setViewValue(scope.date = undefined)
      }
    },
    // templateUrl: 'picka.html'
    template: function(tElem, tAttrs) {
      var format = angular.isString(tAttrs.format) ? tAttrs.format : '%Y / %M / %D - %h : %m %t %n %c'
      var template = ''
      var rx = /%./g
      var matches = []
      var match

      while (match = rx.exec(format))
        matches.push(match)

      var fillIndex = 0

      for (var match of matches) {
        var expr = match[0]
        var fillLength = match.index - fillIndex
        template += format.substr(fillIndex, fillLength)
        
        switch(expr.substr(1)) {
          case 'Y': {
            template += '<input type="number" class="picka-comp picka-comp-year" ng-model="year">'
            break
          }
          case 'M': {
            template += '<input type="number" class="picka-comp picka-comp-month" ng-model="month">'
            break
          }
          case 'D': {
            template += '<input type="number" class="picka-comp picka-comp-day" ng-model="day">'
            break
          }
          case 'h': {
            template += '<input type="number" class="picka-comp picka-comp-hour" ng-model="hour">'
            break
          }
          case 'm': {
            template += '<input type="number" class="picka-comp picka-comp-minute" ng-model="minute">'
            break
          }
          case 'n': {
            template += '<button class="btn btn-xs btn-default" ng-click="now()">now</button>'
            break
          }
          case 't': {
            template += '<button class="btn btn-xs btn-default" ng-click="today()">today</button>'
            break
          }
          case 'c': {
            template += '<button class="btn btn-xs btn-default" ng-click="clear()">✕</button>'
            break
          }
        }
        
        fillIndex = match.index + expr.length
      }

      template += format.substr(fillIndex)
      
      
      tElem.addClass('picka')
      tElem.append(template)
    }
  }
})
.controller('PickaDemoCtrl', function($scope, $http) {
  this.foo = new Date()
  this.bar = function() {
    console.log(this.start, this.end)
  }
  
  this.start = new Date('1979-07-11T00:00:00.000+01:00')
  this.end = new Date()
})
