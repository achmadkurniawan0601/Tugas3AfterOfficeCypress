describe('Reqres API Testing in Reqres and Gorest', () => {

  function randomEmail() {
    const randomString = Math.random().toString(36).substring(2, 10)
    const email = randomString + "@gmail.com"
    return email
  }

  function randomName() {
    const randomString = Math.random().toString(36).substring(2, 10)
    const name = randomString
    return name
  }
  
  let emailAddress = randomEmail()
  let bodyData = {
    "name": randomName(), 
    "gender": "male", 
    "email": emailAddress, 
    "status": "active"
  }

  it.only('Get list users in Reqres', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2'
    }).then((response) => {
      // expect(response.status).to.equal(200)
      // expect(response.body).to.have.property("page")
      console.log(response.body)
    })
  });

  it('Create users in Reqres', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: {
        "name": "morpheus",
        "job": "leader"
      }
    }).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body).to.have.property("id")
      expect(response.body).to.have.property("createdAt")
    })
  })

  it('Create users in Gorest', () => {
    cy.log('email: ' + emailAddress)
    cy.log('name: ' + bodyData.name)
    cy.request({
      method: 'POST',
      url: 'https://gorest.co.in/public/v2/users',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer bbadea3eb9901a6f403e2711cca24171a0b87b2a4a8f2ed0e42a586293d9ca72'
      },
      body: bodyData
    }).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body).to.have.property("id")
    })
  })
})
