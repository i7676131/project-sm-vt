let socialSlide = angular.module('socialSlide', ['ngRoute']);

socialSlide.config(function ($routeProvider) {
    $routeProvider
        .when('/stat', {
            templateUrl: '/views/statistics',
            controller: 'StatController'
        });
});

socialSlide.controller('StatController', function ($scope, $http, $window) {



});

socialSlide.controller("MainController", function ($scope, $http, $window, $interval) {

    let speed = [];

    speed.push($http.get('/social-slide/api/get/slide-speed'));

    Promise.all(speed).then((speed) => {

        let count = 5;

        console.log('Speed: ' + speed[0].data);

        $interval(function () {

            $http.get('/social-slide/api/get/next-post').then((res) => {
                let post = res.data;
                $scope.postImageSrc = post.smImageUrl;
                $scope.postAvatarUrl = post.smAvatarUrl;
                $scope.postPlatformLogo = post.smPlatform;
                $scope.postName = post.smName;
                $scope.postUserName = post.smUserName;
                $scope.postContent = post.smContent;
                $scope.postDate = post.smDate;
            });
            count--;

            if(count === 0){
                $window.location = '#/stat'
            }

        }, speed[0].data);

    });
});

socialSlide.controller('SocialStats', function ($scope, $http) {

    $http.get('/social-slide/api/get/next-stat').then((res) => {

        $scope.message = res.data.message;

    });


});
