angular.module('app', ['picka'])
  .controller('PickaDemoCtrl', function($scope, $http) {
    this.foo = new Date()
    this.bar = function() {
      console.log(this.start, this.end)
    }
    
    this.start = new Date('1979-07-11T00:00:00.000+01:00')
    this.end = new Date()
  })
