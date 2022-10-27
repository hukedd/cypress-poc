// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('add_synctoken', () => {

    cy.getCookie('synchronizerToken')
        .should('have.property', 'value')
        .then((cookie) => {
            cy.task('log', 'cookieValue: ' + cookie)
            // YOU SHOULD CONSUME `cookieValue` here
            // .. go ahead inside this `then` callback    
            cy.get('form').then(function ($forms) {
                for (let i = 0; i < $forms.length; i++) {
                    // check for a token
                    var form = $forms[i];
                    var formInputs = form.getElementsByTagName('input');
                    var formTokenExists = false;
                    for (let i = 0; i < formInputs.length; i++) {
                        if (formInputs[i].getAttribute('name') === 'SynchronizerToken') {
                            formTokenExists = true;
                        }
                    }
                    if (!formTokenExists) {
                        var input = $forms[i].appendChild(document.createElement('input'))
                        input.setAttribute('type', 'hidden')
                        input.setAttribute('name', 'SynchronizerToken')
                        input.setAttribute('value', cookie)
                    }
                }
            })
        })
});