const Guid = require("guid");

describe("/user/register", () => {
    const registerEndpoint = "http://localhost:8000/api/user/register";
    const dummyEmail = Guid.raw() + "@test.com";
    it("Creates user with valid body", () => {
        const body = {
            name: "test test",
            email: dummyEmail,
            password: "testtest",
        };
        cy.request({
            method: "POST",
            url: registerEndpoint,
            failOnStatusCode: false,
            body,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.name).to.eq("test test");
            expect(res.body.email).to.eq(dummyEmail);
            expect(res.body.password).to.not.eq("testtest");
        });
    });

    it("prevent creation for bad user body", () => {
        const badBody = {
            name: "1",
            email: "test",
            password: "t",
        };
        cy.request({
            method: "POST",
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badBody,
        }).then((res) => {
            expect(res.status).to.eq(400);
        });
    });

    it("check invalid email", () => {
        const badBody = {
            name: "Valid Name",
            email: "invalidemail",
            password: "ValidPassword",
        };
        cy.request({
            method: "POST",
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badBody,
        }).then((res) => {
            expect(res.status).to.eq(400);
            expect(res.body).to.eq('"email" must be a valid email');
        });
    });

    it("returns 400 with no body", () => {
        cy.request({
            method: "POST",
            url: registerEndpoint,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(400);
        });
    });
});
