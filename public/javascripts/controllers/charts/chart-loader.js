
let queries = ['Bournemouth','Ratio','Beach','Mr_Rone_','HeatherBrown','SiliconBeach','London','LadBible','Tech','Coffee'];
let queryData =[11,14,22,9,19,12,20,8,17,20];
let queryLabel = 'Posts of the Week';

let days = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'];
let dailyData =[109, 99, 123, 101, 98, 111, 121, 100, 90, 103];
let dailyLabel = 'Total Daily Posts';

let ctx1 = document.getElementById('social_chart1');
let ctx2 = document.getElementById('social_chart2');

let chartData1 = {
    labels: queries,
    datasets: [{
        backgroundColor: 'rgba(255,1,128,0.2)',
        borderColor: 'rgba(255,1,128,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255,1,128,0.5)',
        hoverBorderColor: 'rgba(255,1,128,1)',
        data: queryData
    }]
};

let chartData2 = {
    labels: days,
    datasets: [{
        backgroundColor: 'rgba(255,1,128,0.2)',
        borderColor: 'rgba(255,1,128,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255,1,128,0.5)',
        hoverBorderColor: 'rgba(255,1,128,1)',
        data: dailyData
    }]
};

let options1 = {
    title: {
        display: true,
        text: queryLabel,
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
let options2 = {
    title: {
        display: true,
        text: dailyLabel,
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

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

let myChart1 = new Chart (ctx1, {
    type: 'bar',
    options: options1,
    data: chartData1
});

let myChart2 = new Chart (ctx2, {
    type: 'line',
    options: options2,
    data: chartData2
});