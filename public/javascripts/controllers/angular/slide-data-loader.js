let socialSlide = angular.module('socialSlide', ['ngRoute']);

socialSlide.directive('fadeIn', function($timeout){

    return{
        restrict: 'A',
        link: function($scope, $element, attrs){

            $element.addClass("ng-hide-remove");
            $element.on('load', function(){
                $element.addClass("ng-hide-add");
            });
            attrs.$observe("ngSrc", function () {
                $element.removeClass("ng-hide-add");
                $element.addClass("ng-hide-remove");
            })
        }
    }

});

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
            }else{
                getNextPost();
            }
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


socialSlide.controller("StatController", function ($scope, $http, $window) {

    $http.get('/social-slide/api/get/next-stat').then((res) => {

        let dailyChart = res.data.dailyTotal;
        let weeklyChart = res.data.weeklyPosts;

        populateChart(dailyChart, weeklyChart)

    });

    function nextPost(){
        $window.location = '/social-slide';
    }

    setTimeout(nextPost, 30000);

});

function populateChart(dailyChartData, weeklyChartData){

    /*
        1. Get the graphs by ID from the web page (statistics.pug).
        2. Inject each graph with their corresponding data and labels.
        3. Construct the options and settings for each graph.
        4. Create chart objects and assign options and data.
    */

    // 1.
    let ctx1 = document.getElementById('total_daily_posts');
    let ctx2 = document.getElementById('posts_of_week');

    // 2.
    let total_daily_chart = getChartData(dailyChartData.data, dailyChartData.labels);
    let posts_of_week_chart = getChartData(weeklyChartData.data, weeklyChartData.labels);

    // 3.
    let ctxOptions1 = {
        title: {
            display: true,
            text: dailyChartData.title,
            fontSize: 30,
            padding: 12
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                gridLines: {
                    display: true,
                    color: "rgba(255,1,128,0.2)"
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false
                }
            }]
        },
        legend: {
            display: false
        }
    };
    let ctxOptions2 = {
        title: {
            display: true,
            text: weeklyChartData.title,
            fontSize: 30,
            padding: 12
        },
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                stacked: true,
                gridLines: {
                    display: true,
                    color: "rgba(255,1,128,0.2)"
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false
                }
            }]
        },
        legend: {
            display: false
        }
    };

    Chart.defaults.global.defaultFontColor = 'black';
    Chart.defaults.global.defaultFontSize = 16;

    // 4.
    let myChart1 = new Chart (ctx1, {
        type: 'line',
        options: ctxOptions1,
        data: total_daily_chart
    });
    let myChart2 = new Chart (ctx2, {
        type: 'bar',
        options: ctxOptions2,
        data: posts_of_week_chart
    });

}

function getChartData(chartData, chartLabel){
    return {
        labels: chartLabel,
        datasets: [{
            backgroundColor: 'rgba(255,1,128,0.2)',
            borderColor: 'rgba(255,1,128,1)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255,1,128,0.5)',
            hoverBorderColor: 'rgba(255,1,128,1)',
            data: chartData
        }]
    }
}
