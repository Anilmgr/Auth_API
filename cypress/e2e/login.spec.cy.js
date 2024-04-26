const Guid = require('guid');

describe("/user/login", () => {
  const loginEndpoint = "http://localhost:8000/api/user/login";
  const dummyEmail = Guid.raw() + '@test.com';
  it("Email doesn't exist", () => {
    const body = {
      email: dummyEmail,
      password: "testtest",
    };
    cy.request({
      method: "POST",
      url: loginEndpoint,
      failOnStatusCode: false,
      body
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.eq("Email not registered");
    });
  });

});
