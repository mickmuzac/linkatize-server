var app = angular.module('pricex4', []);

app.controller('BaseController', ['$scope', '$http', function($scope, $http){

    $scope.data = {keywords: "road bike"};

    $scope.$watch('data.keywords', function(val, old){
        console.log("Update!");
        if(val && val != old){
            updateList();
        }
    });

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
        });
    }
}]);
