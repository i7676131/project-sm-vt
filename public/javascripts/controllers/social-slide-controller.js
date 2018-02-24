var socialSlide = angular.module('socialSlide', []);

socialSlide.controller("mainCtrl", function($scope, $http) {

    console.log('Inside mainCtrl...');

    $http({
        method: 'GET',
        url: 'social-slide/api/get/next-post'
    }).then(function (res) {
        console.log('API response: '+res.data);
        var post = res.data;

        $scope.imageSrc = post.smImageUrl;
        $scope.postAvatarUrl = post.smAvatarUrl;
        $scope.postPlatformLogo = post.smPlatformLogo;
        $scope.postName = post.smName;
        $scope.postUserName = post.smUserName;
        $scope.postContent = post.smContent;
        $scope.postDate = post.smDate;
    }), function (error) {
        console.log(error)
    }
})
