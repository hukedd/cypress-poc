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
            // cy.task('log', 'cookieValueeee: ' + cookie)
            // YOU SHOULD CONSUME `cookieValue` here
            // .. go ahead inside this `then` callback    
            cy.get('form').then(function ($forms) {
                for (let i = 0; i < $forms.length; i++) {
                    // check for a token
                    // cy.task('log', 'formfield: ' + i)

                    var form = $forms[i];
                    var formInputs = form.getElementsByTagName('input');
                    var formTokenExists = false;
                    for (let i = 0; i < formInputs.length; i++) {
                        // cy.task('log', 'formfield name: ' + formInputs[i].getAttribute('name'))
                        if (formInputs[i].getAttribute('name') === 'SynchronizerToken') {
                            formTokenExists = true;
                            cy.task('log', 'formTokenExists: ' + formInputs[i].getAttribute('value'))
                        }
                    }
                    if (!formTokenExists) {
                        var input = $forms[i].appendChild(document.createElement('input'))
                        input.setAttribute('type', 'hidden')
                        input.setAttribute('name', 'SynchronizerToken')
                        input.setAttribute('value', cookie)
                    }
                    // new token value
                    // cy.task('log', 'rechecking form........ ')

                    for (let i = 0; i < formInputs.length; i++) {
                        // cy.task('log', 'formfield name: ' + formInputs[i].getAttribute('name'))
                        if (formInputs[i].getAttribute('name') === 'SynchronizerToken') {
                            formTokenExists = true;
                            // cy.task('log', 'formTokenExists: ' + formInputs[i].getAttribute('value'))
                        }
                    }
                }
            })
        })
});

Cypress.Commands.add('forceClick', {prevSubject: 'element'}, (subject, options) => {

    cy.wrap(subject).click({force: true})

  });