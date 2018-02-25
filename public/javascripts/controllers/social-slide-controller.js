var socialSlide = angular.module('socialSlide', []);

socialSlide.controller("mainCtrl", function($scope, $http, $interval) {

    $interval(function(){
        $http({
            method: 'GET',
            url: 'social-slide/api/get/next-post'
        }).then(function (res) {
            var post = res.data;
            $scope.postImageSrc = post.smImageUrl;
            $scope.postAvatarUrl = post.smAvatarUrl;
            $scope.postPlatformLogo = post.smPlatform;
            $scope.postName = post.smName;
            $scope.postUserName = post.smUserName;
            $scope.postContent = post.smContent;
            $scope.postDate = post.smDate;
        }), function (error) {
            throw error;
        }
    }, 10000);
});
