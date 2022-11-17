describe('hafele poc', () => {

  it('passes', () => {
    // first visit site, set some cookies to dismiss the nonsense popups...
    cy.visit('https://www.hafele.co.uk/en/info/services/contact-us/32254/')
    cy.wait(20)
    cy.setCookie('top_ticker_banner_hide', '1')
    cy.wait(20)
    cy.setCookie('CustomerCountryRedirect', 'GB') // geosniffing 'is this your country?' dialog
    // cy.get('#onetrust-accept-btn-handler').click({ force: true })
    cy.wait(20)
    cy.setCookie('OptanonAlertBoxClosed', new Date(Date.now() - 86400000).toISOString())
    cy.wait(20)
    cy.setCookie('OptanonConsent', 'isIABGlobal=false&datestamp=Thu+Nov+17+2022+09%3A02%3A02+GMT%2B0000+(Greenwich+Mean+Time)&version=6.10.0&hosts=&consentId=208760b0-5e70-4021-a28c-dd5bd1f6ffce&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0003%3A1%2CC0004%3A1%2CC0002%3A1&geolocation=GB%3BENG&AwaitingReconsent=false')
    cy.wait(20)
    cy.visit('https://www.hafele.co.uk/en/info/services/contact-us/32254/')

    cy.wait(100)
    cy.get('#headerLoginLinkAction').should('be.visible')
    cy.get('#headerLoginLinkAction').click({ force: true })
    cy.get('[data-testid="divShopLoginForm_LoginAsJointUser_headerItemLogin"]').click({ force: true })
    cy.get('[data-testid="FlyoutLoginEditUser"]').type('310077')
    cy.get('[data-testid="FlyoutLoginUserName"]').type('grunt')
    cy.get('[data-testid="FlyoutLoginEditLogin"]').type('gruntgrunt')
    cy.get('[data-testid="ajaxAccountLoginFormBtn"]').click({ force: true })
    cy.get('[data-testid="HeaderLinkMyAccount"]').should('be.visible')
    cy.get('#js-cart').should('be.visible').click()
    // cy.get('#cart-item-value > .hidden-md').should('be.visible').click({ force: true })
    cy.get('[data-testid="CartDirectOrderInputArticle"]').type('13439020')
    cy.get('[data-testid="CartDirectOrderInputQuantity"]').type('1')
    cy.get('[data-testid="CartDirectOrderButtonAdd"]').should('be.visible')
    cy.wait(100)
    cy.get('[data-testid="CartDirectOrderButtonAdd"]').click({ force: true })
    cy.get('[data-testid="OrderlineArticleNo_13439020"]').should('be.visible')
    // custom command to add csrf token to all forms on page
    // use this whenever submitting a form in this hafele.co.uk site
    cy.add_synctoken()
    cy.wait(20)
    cy.get('[data-testid="divselectAllTop"]').should('be.visible').click({ force: true })
    cy.wait(100)
    cy.get('[data-testid="CartDeleteSelectedItems"]').click({ force: true })
    cy.get('.shoppingCartHeader').find('strong').first().should('have.text', 'Your basket is empty.')
    cy.get(".shoppingCartHeader").find('strong').first().invoke('text').then((text) => {
      expect(text.trim()).equal('Your basket is empty.')
    });
  })
})