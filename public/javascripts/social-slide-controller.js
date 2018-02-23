var socialSlide = angular.module('socialSlide', []);

function mainController($scope, $http){

    $http.get('/api/test')
        .success(function(data){
            $scope.socialPost = data;
        })
        .error(function(data){
            console.log('Error: '+data);
        });
};