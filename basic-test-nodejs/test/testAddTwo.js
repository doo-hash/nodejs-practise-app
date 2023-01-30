const addTwo = require("../config/addTwo.js");
let expect = require("chai").expect;
let assert = require("assert");

describe("addTwo", () => {
    context("Not Paasing any arguments", () => {
        it("should return 0", () => {
            assert.equal(addTwo(),0);
        })
    })

    context("Paasing proper arguments", () => {
        it("should add 2", () => {
            assert.equal(addTwo(2),4);
        })
    })

    context("Paasing array of numbers as arguments", () => {
        it("should add 2", () => {
            assert.deepEqual(addTwo(1,2,3), [3,4,5]);
        })
    })

    context("Paasing non-number arguments", () => {
        it("should throw error", () => {
            expect(()=> {
                addTwo(1, "as", 2)
            }).to.throw(TypeError,'addTwo() expects only numbers or array of numbers');
        })
    })
})