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


socialSlide.controller("StatController", function ($scope, $http, $window, $interval) {

    $http.get('/social-slide/api/get/next-stat').then((res) => {

        let dailyChart = res.data.dailyTotal;
        let weeklyChart = res.data.weeklyPosts;

        populateChart(dailyChart.labels, dailyChart.data, weeklyChart.labels, weeklyChart.data, weeklyChart.title)

    });

});

function populateChart(dailyLabels, dailyData, weeklyLabels, weeklyData, weeklyTitle){

    let ctx1 = document.getElementById('posts_of_week');
    let ctx2 = document.getElementById('total_daily_posts');

    let total_daily_chart = {
        labels: dailyLabels,
        datasets: [{
            backgroundColor: 'rgba(255,1,128,0.2)',
            borderColor: 'rgba(255,1,128,1)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255,1,128,0.5)',
            hoverBorderColor: 'rgba(255,1,128,1)',
            data: dailyData
        }]
    };
    let posts_of_week_chart = {
        labels: weeklyLabels,
        datasets: [{
            backgroundColor: 'rgba(255,1,128,0.2)',
            borderColor: 'rgba(255,1,128,1)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255,1,128,0.5)',
            hoverBorderColor: 'rgba(255,1,128,1)',
            data: weeklyData
        }]
    };

    let options2 = {
        title: {
            display: true,
            text: 'Total Daily Posts',
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

    let options1 = {
        title: {
            display: true,
            text: 'Top Weekly Posts - Week of Year '+weeklyTitle,
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

    let myChart1 = new Chart (ctx1, {
        type: 'bar',
        options: options1,
        data: posts_of_week_chart
    });

    let myChart2 = new Chart (ctx2, {
        type: 'line',
        options: options2,
        data: total_daily_chart
    });

}
