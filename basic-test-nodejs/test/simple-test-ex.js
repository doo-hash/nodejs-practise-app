const chai = require("chai");
const expect = chai.expect;

let CartSummary = require("../config/cart-summary.js");

describe("Cart-Summary", () => {
    it("getSubtotal() should return 0 if no items are passed in", () => {
        let cartSummary = new CartSummary([]);
        expect(cartSummary.getSubtotal()).to.equal(0);
    });

    it("getSubtotal() should return sum of the price*quantity for all items passed", () => {
        let cartSummary = new CartSummary([
            {
                id : 1,
                quantity : 4,
                price : 50 
            },
            {
                id : 2,
                quantity : 2,
                price : 20 
            },
            {
                id : 3,
                quantity : 1,
                price : 100 
            }
        ]);
        expect(cartSummary.getSubtotal()).to.equal(340);
    });
});