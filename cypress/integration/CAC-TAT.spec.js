//<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('../../src/index.html')
    })

    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    
    //Teste 1
    it('CT01 - Preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Neves')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    //Teste 2
    it('CT02 - Verificar se exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Neves')
        cy.get('#email').type('email')
        cy.get('#open-text-area').type('teste teste teste teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    
    //Teste 3
    it('CT03 - Verificar se campo de telefone continua vazio quando preenche valor não numérico', function(){
        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Neves')
        cy.get('#phone').type('teste').should('have.value', '')
    })

    // Teste 4
    it('CT04 - Verificar se exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Neves')
        cy.get('#email').type('email@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste teste teste teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    //teste 5 
    it('CT05 - Preencher e limpar os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Juliana').should('have.value', 'Juliana')
        cy.get('#lastName').type('Neves')
        cy.get('#email').type('email@email.com')
        cy.get('#phone').type('35532024')
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')
    })

    //teste 6 
    it('CT06 - Verificar se exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //teste 7
    it('CT07 - Enviar um formulário usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()  
    })
    
    //teste 8 
    it('CT08 - Escolhendo um produto (YouTube) em um Menu Seleção', function(){
        cy.get('#product').select('youtube').should('be.visible', 'YouTube')
    })
    
    //teste 9
    it('CT09 - Escolhendo um produto (Mentoria) em um Menu Seleção', function (){
        cy.get('#product').select('mentoria').should('be.visible', 'Mentoria')
    })

     //teste 10
     it('CT10 - Escolhendo um produto (Blog) em um Menu Seleção', function (){
        cy.get('#product').select('blog').should('be.visible', 'Blog')
    })

    //teste 11
    it('CT11 - Marcar o tipo de Atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    //teste 12
    it('CT12 - Marca cada tipo de atendimento', function (){
        cy.get ('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).check().should('be.checked')
            })
    })
   
    //teste 13
    it('CT13 - Marcar todos ambos os checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked')
            .last().uncheck()
            .should('not.be.checked')
    })    

    //teste 14
    it('CT14 - Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload').should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //teste 15
    it('CT15 - Seleciona um arquivo simulando drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload').should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //teste 16
    it('CT16 - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload').selectFile('@sampleFile')
            .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //teste 17
    it('CT17 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    //teste 16
    it('CT18 - Acessa a página da política de privacidade removendo o target e então clicando no link', function (){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
    })

})

