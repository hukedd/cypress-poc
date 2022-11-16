describe('hafele poc', () => {

  it('passes', () => {

    cy.visit('https://www.hafele.co.uk/en/info/services/contact-us/32254/')
    cy.wait(500)
    cy.setCookie('top_ticker_banner_hide', '1')
    cy.get('#onetrust-accept-btn-handler').click({
      force: true
    })
    cy.wait(200)
    // disable orange banner
    // cy.get('#ticker-content > .stdButton > .icon').click()
    cy.setCookie('top_ticker_banner_hide', '1')
    cy.get('#headerLoginLinkAction').click({
      force: true
    })
    cy.get('[data-testid="divShopLoginForm_LoginAsJointUser_headerItemLogin"]').click({
      force: true
    })
    cy.get('[data-testid="FlyoutLoginEditUser"]').type('310077')
    cy.get('[data-testid="FlyoutLoginUserName"]').type('grunt')
    cy.get('[data-testid="FlyoutLoginEditLogin"]').type('gruntgrunt')
    cy.get('[data-testid="ajaxAccountLoginFormBtn"]').click({
      force: true
    })
    // cy.wait(3000)
    cy.get('[data-testid="HeaderLinkMyAccount"]').should('be.visible')
    // cy.get('#js-cart').click()
    cy.get('#cart-item-value > .hidden-md').should('be.visible').click({
      force: true
    })
    cy.get('[data-testid="CartDirectOrderInputArticle"]').type('13439020')
    cy.get('[data-testid="CartDirectOrderInputQuantity"]').type('1')
    cy.get('[data-testid="CartDirectOrderButtonAdd"]').should('be.visible')
    cy.wait(100)
    cy.get('[data-testid="CartDirectOrderButtonAdd"]').click({
      force: true
    })
    cy.get('[data-testid="OrderlineArticleNo_13439020"]').should('be.visible')
    // cy.wait(1000)    
    // custom command to add csrf token to all forms on page
    // use this whenever submitting a form in this hafele.co.uk site
    cy.add_synctoken()
    cy.wait(1000)
    cy.get('[data-testid="divselectAllTop"]').click({
      force: true
    })
    cy.wait(500)
    cy.get('[data-testid="CartDeleteSelectedItems"]').click({
      force: true
    })
    cy.get('.shoppingCartHeader').find('strong').first().should('have.text', 'Your basket is empty.')
    cy.get(".shoppingCartHeader").find('strong').first().invoke('text').then((text) => {
      expect(text.trim()).equal('Your basket is empty.')
    });
  })
})