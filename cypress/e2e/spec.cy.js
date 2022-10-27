describe('hafele poc', () => {

  it('passes', () => {
    
    cy.visit('https://www.hafele.co.uk/en/info/services/contact-us/32254/')
    cy.wait(500)
    cy.setCookie('top_ticker_banner_hide', '1') 
    cy.get('#onetrust-accept-btn-handler').click()
    cy.wait(200)
    // disable orange banner
    // cy.get('#ticker-content > .stdButton > .icon').click()
    cy.setCookie('top_ticker_banner_hide', '1')     
    cy.get('#headerLoginLinkAction').click()
    cy.get('[data-testid="divShopLoginForm_LoginAsJointUser_headerItemLogin"]').click()
    cy.get('[data-testid="FlyoutLoginEditUser"]').type('310077')
    cy.get('[data-testid="FlyoutLoginUserName"]').type('grunt')
    cy.get('[data-testid="FlyoutLoginEditLogin"]').type('gruntgrunt')
    cy.get('[data-testid="ajaxAccountLoginFormBtn"]').click()
    cy.wait(2000)
    cy.get('#js-cart').click()
    cy.get('[data-testid="CartDirectOrderInputArticle"]').type('13439020')
    cy.get('[data-testid="CartDirectOrderInputQuantity"]').type('1')
    cy.get('[data-testid="CartDirectOrderButtonAdd"]').click()    
    cy.wait(1000)    
    // custom command to add csrf token to all forms on page
    // use this whenever submitting a form in this hafele.co.uk site
    cy.add_synctoken()
    cy.wait(500)    
    cy.get('[data-testid="divselectAllTop"]').click()
    cy.wait(500)    
    cy.get('[data-testid="CartDeleteSelectedItems"]').click()
  })
})