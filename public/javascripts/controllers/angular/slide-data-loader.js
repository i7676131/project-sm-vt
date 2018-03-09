var socialSlide = angular.module('socialSlide', []);
var counter = 10;

socialSlide.controller("mainCtrl", function ($scope, $http, $interval) {

    $interval(function () {
        $http.get('/social-slide/api/get/next-post').then((res) => {
            var post = res.data;
            $scope.postImageSrc = post.smImageUrl;
            $scope.postAvatarUrl = post.smAvatarUrl;
            $scope.postPlatformLogo = post.smPlatform;
            $scope.postName = post.smName;
            $scope.postUserName = post.smUserName;
            $scope.postContent = post.smContent;
            $scope.postDate = post.smDate;
        });
    }, 10000);
});