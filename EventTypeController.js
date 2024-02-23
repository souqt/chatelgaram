angular.module('app', []).controller('YourController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {

    $scope.value = '';
    var query;

    $scope.init = function() {
        // Check if we already have an active interval in the scope
        if(angular.isDefined(query)) 
            return;

        // Setup query interval
        query = $interval(function() {
            // Call the endpoint where you will retrieve data from
            $http.get('/query')
            .success(function(data) {
                // Handle data, you could 
                // update one or both values
                $scope.value = data;
            })
            .error(function(err) {
                // Handle errors
            });
        }, 100); // Execute every 100 milliseconds
    };

    $scope.cancel = function() { 
        if(angular.isDefined(query)) {
            $interval.cancel(query);
            query = undefined;
        }
    });

    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $scope.cancel();
    });
}]);
