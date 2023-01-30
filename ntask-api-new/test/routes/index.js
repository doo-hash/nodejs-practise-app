console.log("test for index.js")
describe("Routes: Index", () => {
    describe("GET /", () => {
        it("returns the API status", done => {
            request.get("/")
                .expect(200)
                .end((err, res) => {
                    console.log(res.body)
                    const expected = {status : "All Good Right NoW!!!!"};
                    expect(res.body).to.eql(expected);
                    done(err);
                });
        });
    });
});