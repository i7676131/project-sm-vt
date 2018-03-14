let socialSlide = angular.module('socialSlide', ['ngRoute']);

socialSlide.config(function($routeProvider){

    $routeProvider
        .when('/next-stat', {
            templateUrl: 'social-stat.pug'
        })
        .when('/next-post', {
        templateUrl: 'social-post.pug'
    });


});

socialSlide.controller("mainCtrl", function ($scope, $http, $location, $interval) {

    let speed = [];

    speed.push($http.get('/social-slide/api/get/slide-speed'));

    Promise.all(speed).then((speed) => {

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

            $location.path('/api/get/next-stat');


        }, speed[0].data);

    });
});
