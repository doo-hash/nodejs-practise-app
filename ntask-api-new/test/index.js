const { expect } = require("chai");
describe("Routes: Index", () => {
    describe("GET /", () => {
        it("returns the API status", done => {
            request.get("/")
                .expect(200)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.status).to.equal("All Good Right NoW!!!!");
                    done(err);
                });
        });
    });
});