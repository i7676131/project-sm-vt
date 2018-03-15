let socialSlide = angular.module('socialSlide', ['ngRoute']);

socialSlide.controller("SocialController", function ($scope, $http, $window, $interval) {
    let count = 5;

    getNextPost();
    count--;
    let speed = [];
    speed.push($http.get('/social-slide/api/get/slide-speed'));

    Promise.all(speed).then((speed) => {

        console.log('Speed: ' + speed[0].data);

        $interval(function () {
            console.log('Count = '+count);
            if(count === 0){
                $window.location = '/social-slide/stats'
            }
            getNextPost();
            count--;

        }, speed[0].data);
    });

    function getNextPost(){
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
    }
});


socialSlide.controller('StatController', function ($scope, $http) {

    $http.get('/social-slide/api/get/next-stat').then((res) => {

        console.log('Message: '+res.data.message);
        $scope.message = res.data.message;

    });


});
