describe('hafele poc', () => {

  it('passes', () => {
    // first visit site, set some cookies to dismiss the nonsense popups...
    cy.visit('https://www.hafele.co.uk/en/info/services/contact-us/32254/')
    cy.wait(200)
    cy.setCookie('top_ticker_banner_hide', '1')
    cy.wait(50)
    cy.setCookie('CustomerCountryRedirect', 'GB') // geosniffing 'is this your country?' dialog
    cy.wait(200)
    cy.visit('https://www.hafele.co.uk/en/info/services/32168/')
    cy.wait(50)
    // cy.get('#onetrust-accept-btn-handler').should('be.visible')
    // cy.get('#onetrust-accept-btn-handler').click()
    cy.get('#onetrust-pc-btn-handler', { timeout: 20000 }).should('be.visible')
    cy.get('#onetrust-pc-btn-handler').click()
    cy.get('.save-preference-btn-handler').should('be.visible')
    cy.get('.save-preference-btn-handler').click()
    
    // now we're ready to start...
    cy.wait(200)
    // ensure login link visible
    cy.get('#headerLoginLinkAction', { timeout: 20000 }).should('be.visible')
    cy.get('#headerLoginLinkAction').click()
    cy.get('[data-testid="divShopLoginForm_LoginAsJointUser_headerItemLogin"]').click()
    // login details
    cy.get('[data-testid="FlyoutLoginEditUser"]').type('310077')
    cy.get('[data-testid="FlyoutLoginUserName"]').type('grunt')
    cy.get('[data-testid="FlyoutLoginEditLogin"]').type('gruntgrunt')
    cy.get('[data-testid="ajaxAccountLoginFormBtn"]').click({ force: true })
    // wait for my account to be visible (indicates we've logged in OK)
    cy.get('[data-testid="HeaderLinkMyAccount"]', { timeout: 20000 }).should('be.visible')
    // now we can click on cart link
    cy.get('#js-cart', { timeout: 20000 }).should('be.visible').click()
    // cy.get('#cart-item-value > .hidden-md').should('be.visible').click({ force: true })
    // wait for cart elements to be available & then enter item details
    cy.get('[data-testid="CartDirectOrderInputArticle"]').should('be.visible')
    cy.get('[data-testid="CartDirectOrderInputArticle"]').type('13439020')
    cy.get('[data-testid="CartDirectOrderInputQuantity"]').type('1')
    cy.add_synctoken()
    cy.get('[data-testid="CartDirectOrderButtonAdd"]', { timeout: 20000 }).should('be.visible')
    cy.wait(200)
    cy.get('[data-testid="CartDirectOrderButtonAdd"]').click()
    cy.wait(500)
    cy.get('[data-testid="OrderlineArticleNo_13439020"]', { timeout: 20000 }).should('be.visible')
    // custom command to add csrf token to all forms on page
    // use this whenever submitting a form in this hafele.co.uk site
    cy.add_synctoken()
    cy.wait(20)
    cy.get('[data-testid="divselectAllTop"]').should('be.visible', { timeout: 20000 }).click({ force: true })
    cy.wait(100)
    cy.get('[data-testid="CartDeleteSelectedItems"]').click({ force: true })
    cy.wait(200)
    cy.get('.shoppingCartHeader').find('strong').first().should('have.text', 'Your basket is empty.')
    cy.get(".shoppingCartHeader").find('strong').first().invoke('text').then((text) => {
      expect(text.trim()).equal('Your basket is empty.')
    });
  })
})