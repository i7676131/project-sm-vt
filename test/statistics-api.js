let expect = require("chai").expect;
let request = require("request");
let formatDate = require('../public/javascripts/helpers/format-date');

describe("Statistics API Calls", () => {

    describe("Next Statistics Data", () => {

        let urlNextSlide = 'http://localhost:3000/social-slide/api/get/next-stat';

        it("Gets statistic data from database", (done) => {

            request(urlNextSlide, (err, resp, body) => {
                let obj = JSON.parse(body);

                expect(resp.statusCode).to.equal(200);
                expect(obj.dailyTotal.title).to.equal('Total Daily Posts');
                expect(obj.dailyTotal.data).to.deep.equal([72,207,779,218,0,80,146,207]);
                expect(obj.dailyTotal.labels).to.deep.equal(['11th','17th','18th','19th','20th','22nd','27th','29th']);
                expect(obj.weeklyPosts.title).to.equal('Popular Posts of Week No. 10');
                expect(obj.weeklyPosts.data).to.deep.equal([0]);
                expect(obj.weeklyPosts.labels).to.deep.equal(['#beach  ']);
                done();
            });
        });
    });

    describe("Get day suffix", () => {

        it("Return day suffix based on days of month", () => {

            let day1 = formatDate.getDaySuffix('10');
            let day2 = formatDate.getDaySuffix('21');
            let day3 = formatDate.getDaySuffix('3');

            expect(day1).to.equal('10th');
            expect(day2).to.equal('21st');
            expect(day3).to.equal('3rd');
        });
    });

    describe("Get Week of Year", () => {

        it("Returns current week of year ", () => {

            let currWeek = formatDate.getWeek();

            expect(currWeek).to.equal(10);
        });
    });
});




