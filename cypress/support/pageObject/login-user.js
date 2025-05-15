class LoginPage {
    username    = '[name="username"]'
    pass        = '[name="password"]'
    loginButton = '.oxd-button'
    errorMsg    = '.oxd-alert-content'
    successMsg  = '.oxd-topbar-header-breadcrumb > .oxd-text'

    inputUsername(username){
        cy.get(this.username).type(username)
    }

    inputPassword(password){
        cy.get(this.pass).type(password)
    }

    clickBtnLogin(){
        cy.get(this.loginButton).click()
    }

    verifyLoginSuccess(){
        cy.get(this.successMsg).should('have.text', 'Dashboard')
    }
}

export default new LoginPage()