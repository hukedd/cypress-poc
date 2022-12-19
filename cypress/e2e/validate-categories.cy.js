describe('cookie test', () => {

    it('passes', () => {
        // first visit site, set some cookies to dismiss the nonsense popups...
        cy.visit('https://www.hafele.co.uk/en/info/services/contact-us/32254/?hafref=testing123')
        cy.wait(200)
        cy.setCookie('top_ticker_banner_hide', '1')
        cy.wait(50)
        cy.setCookie('CustomerCountryRedirect', 'GB') // geosniffing 'is this your country?' dialog
        cy.wait(200)
        cy.visit('https://www.hafele.co.uk/en/info/services/32168/')
        cy.wait(50)
    
        cy.get('#onetrust-pc-btn-handler', { timeout: 20000 }).should('be.visible')
        cy.get('#onetrust-pc-btn-handler').click()
        cy.get('.save-preference-btn-handler').should('be.visible')
        cy.get('.save-preference-btn-handler').click()
        cy.wait(50)

        // first visit site, set some cookies to dismiss the nonsense popups...
        cy.visit('https://www.hafele.co.uk/en/products/handles-knobs/cabinet-handles-knobs/11/')
        cy.wait(200)

        cy.get('.resultCount')
            .invoke('text')
            .then((resultText) => {
                // do more work here
                var text = resultText;                
                var resultCount = 0;
                var minCount = 400;
                var textArray = text.split(" ");
                if (text.includes("Results")) {
                    resultCount = textArray[0];
                } else {
                    resultCount = textArray[4];
                }
                expect(Number(resultCount)).to.be.gt(minCount)
            })
    })
})