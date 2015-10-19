var app = angular.module('pricex4', []);

app.controller('BaseController', ['$scope', '$http', function($scope, $http){

    $scope.data = [];
    $scope.guess;

    $scope.$watch('data.keywords', function(val, old){
        console.log("Update!");
        if(val && val != old){
        //    updateList();
        }
    });

    $scope.getRandom = function(){
        var randCat = Math.floor(Math.random() * $scope.data.length);
        var randItem = Math.floor(Math.random() * $scope.data[randCat].items.length);
        $scope.guess =  $scope.data[randCat].items[randItem];
    }

    updateData();

    function updateList(){
        $http.get('/fetch/' + $scope.data.keywords).then(function(res){
            updateData();
        });
    }

    function updateData(){
        $http.get('/out.json').then(function(res){
            console.log(res, res.data);
            $scope.data = res.data;
            $scope.getRandom();
        });
    }
}]);
