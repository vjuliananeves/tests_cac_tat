Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function (){
    cy.get('#firstName').type('Juliana')
    cy.get('#lastName').type('Neves')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
})