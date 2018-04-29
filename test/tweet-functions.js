let expect = require("chai").expect;
let tweetHandler = require("../public/javascripts/apis/platforms/twitter/twitter-api");

describe("Tweet Retrieval and Storage", () => {

    describe("Array Converter", () => {

        let doubleArray = [
                        [{name:'John'},{name:'Ty'},{name:'Joe'}],
                        [{name:'Jane'},{name:'Mel'},{name:'Amy'}],
                        [{name:'Tom'},{name:'Jim'},{name:'Dan'}]];

        it("Converts double array to single array", () => {

            let result = tweetHandler.doubleArrToSingleArr(doubleArray);

            expect(result).to.deep.equal([{name:'John'}, {name:'Ty'}, {name:'Joe'},
                                          {name:'Jane'}, {name:'Mel'}, {name:'Amy'},
                                          {name:'Tom'}, {name:'Jim'}, {name:'Dan'}]);
        });
    });

    describe("Null Filter", () => {

        let mixedArray = [null, 2, 5, 1, null, null];

        it("Converts double array to single array", () => {

            let result = tweetHandler.nullFilter(mixedArray);

            expect(result).to.deep.equal([2, 5, 1]);
        });
    });
});




