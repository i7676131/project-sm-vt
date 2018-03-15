let socialSlide = angular.module('statSlide', ['ngRoute']);

socialSlide.controller("StatController", function ($scope, $http, $window, $interval) {


    function getstats(){
        $http.get('/social-slide/api/get/next-post').then((res) => {

        });
    }
});

function populateChart(graphData, labels){

}