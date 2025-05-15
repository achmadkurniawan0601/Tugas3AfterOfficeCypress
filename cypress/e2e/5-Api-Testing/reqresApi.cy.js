describe("API Reqres", () => {
  beforeEach(() => {
    // cy.visit('https://reqres.in/')
  });

  it.only("TC01_ListUsers", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
    }).then((response) => {
      // expect(response.status).to.equal(200)
      // expect(response.body).to.have.property('per_page')
      cy.log(response.body);
    });
  });

  it("TC02_Create", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "morpheus",
        job: "leader",
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.name).to.eq("morpheus");
      console.log(response.body);
    });
  });

  it("TC03_Update", () => {
    cy.request({
      method: "PUT",
      url: "https://reqres.in/api/users/2",
      body: {
        name: "morpheus",
        job: "zion resident",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.job).to.eq("zion resident");
    });
  });

  it("TC04_Delete", () => {
    cy.request({
      method: "DELETE",
      url: "https://reqres.in/api/users/2",
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });
});
