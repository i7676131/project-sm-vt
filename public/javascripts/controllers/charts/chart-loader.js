
let queries = [];
let queryData =[];

let weeks = [];
let weekData =[];

let ctx1 = document.getElementById('social_chart1');
let ctx2 = document.getElementById('social_chart2');

let chartData1 = {
    labels: queries,
    datasets: [{
        backgroundColor: '',
        borderColor: '',
        borderWidth: '',
        hoverBackgroundColor: '',
        hoverBorderColor: '',
        data: queryData
    }]
};

let chartData2 = {
    labels: weeks,
    datasets: [{
        backgroundColor: '',
        borderColor: '',
        borderWidth: '',
        hoverBackgroundColor: '',
        hoverBorderColor: '',
        data: weekData
    }]
};
