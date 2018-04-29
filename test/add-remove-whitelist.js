let expect = require("chai").expect;
let request = require("request");

let addOpt = {
    method: 'POST',
    url: 'http://localhost:3000/settings/add',
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/x-www-form-urlencoded' },
    form: { listType: 'whitelist', listWord: '#UnitTestingIsFun', geoCode: '' }
};
let deleteOpt = {
    method: 'POST',
    url: 'http://localhost:3000/settings/delete',
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/x-www-form-urlencoded' },
    form: { listType: 'whitelist', whitelistSelect: '5aad4c061355335026ff5aae' }
};

describe("Add and Remove a Word from Whitelist", () => {

    describe("Add Word", () => {

        it("Adds word to whitelist collection in the database", (done) => {

            request(addOpt, (err, resp, body) => {
                let message = decodeURIComponent(body);

                expect(resp.statusCode).to.equal(302);
                expect(message).to.equal("Found. Redirecting to /settings?message=Added successfully.");
                done();

            });
        });
    });

    describe("Delete Word", () => {

        it("Deletes word from whitelist collection in the database", (done) => {

            request(deleteOpt, (err, resp, body) => {
                let message = decodeURIComponent(body);

                expect(resp.statusCode).to.equal(302);
                expect(message).to.equal("Found. Redirecting to /settings?message=Deleted successfully.");
                done();

            });
        });
    });
});




