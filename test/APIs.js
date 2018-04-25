let expect = require("chai").expect;
let request = require("request");

describe("API Calls", () => {

    describe("Settings API", () => {

        let url = 'localhost:3000/settings/';

        it("Gets settings from database", () => {

            request(url, (err, resp, body) => {
                expect(body).to.equal(200);
            });
        });

    });

    describe("Social Slide API", () => {

        let urlNextSlide = 'localhost:3000/social-slide/api/get/next-slide';

        it("Gets next tweet from database", () => {

            request(urlNextSlide, (err, resp, body) => {
                expect(body).to.equal(200);
            });
        });

        let urlSlideSpeed = 'localhost:3000/social-slide/api/get/slide-speed';

        it("Gets slide speed from database", () => {

            request(urlSlideSpeed, (err, resp, body) => {
                expect(body).to.equal(200);

            });
        });

    });

    describe("Statistics API", () => {

        let url = 'localhost:3000/social-slide/api/get/next-slide';

        it("Gets next statistic from database", () => {

            request(url, (err, resp, body) => {
                expect(body).to.equal(200);

            });
        });

    });
});




