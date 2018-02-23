var socialSlide = angular.module('socialSldie', []);

function mainController($scope, $http){

    $scope.formData = {};

    $http.get('/api/test')
        .success(function(data){
            $scope.smPostModel = data;
            console.log('Data: '+data);
        })
        .error(function(data){
            console.log('Error: '+data);
        });
};