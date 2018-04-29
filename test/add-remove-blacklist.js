let expect = require("chai").expect;
let request = require("request");

let addOpt = {
    method: 'POST',
    url: 'http://localhost:3000/settings/add',
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/x-www-form-urlencoded' },
    form: { listType: 'blacklist', listWord: 'crappy' }
};
let deleteOpt = {
    method: 'POST',
    url: 'http://localhost:3000/settings/delete',
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'application/x-www-form-urlencoded' },
    form: { listType: 'blacklist', blacklistSelect: '5aad62b801515663ba916e45' }
};

describe("Add and Remove a Word from Blacklist", () => {

    describe("Add Word", () => {

        it("Adds word to blacklist collection in the database", (done) => {

            request(addOpt, (err, resp, body) => {
                let message = decodeURIComponent(body);

                expect(resp.statusCode).to.equal(302);
                expect(message).to.equal("Found. Redirecting to /settings?message=Added successfully.");
                done();

            });
        });
    });

    describe("Delete Word", () => {

        it("Deletes word from blacklist collection in the database", (done) => {

            request(deleteOpt, (err, resp, body) => {
                let message = decodeURIComponent(body);

                expect(resp.statusCode).to.equal(302);
                expect(message).to.equal("Found. Redirecting to /settings?message=Deleted successfully.");
                done();

            });
        });
    });
});




