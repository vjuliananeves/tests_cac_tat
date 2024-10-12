//<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(function(){
        cy.visit('../../src/index.html')
    })

    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    
    it('CT01 - Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        
        cy.clock()

        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Neves')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
        
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    it('CT02 - Verificar se exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Neves')
        cy.get('#email').type('email')
        cy.get('#open-text-area').type('teste teste teste teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    
    it('CT03 - Verificar se campo de telefone continua vazio quando preenche valor não numérico', function(){
        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Neves')
        cy.get('#phone').type('teste').should('have.value', '')
    })

    it('CT04 - Verificar se exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Juliana')
        cy.get('#lastName').type('Neves')
        cy.get('#email').type('email@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste teste teste teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })
 
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

    it('CT06 - Verificar se exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('CT07 - Enviar um formulário usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()  
    })
    
    it('CT08 - Escolhendo um produto (YouTube) em um Menu Seleção', function(){
        cy.get('#product').select('youtube').should('be.visible', 'YouTube')
    })
    
    it('CT09 - Escolhendo um produto (Mentoria) em um Menu Seleção', function (){
        cy.get('#product').select('mentoria').should('be.visible', 'Mentoria')
    })

     it('CT10 - Escolhendo um produto (Blog) em um Menu Seleção', function (){
        cy.get('#product').select('blog').should('be.visible', 'Blog')
    })

    it('CT11 - Marcar o tipo de Atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('CT12 - Marca cada tipo de atendimento', function (){
        cy.get ('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).check().should('be.checked')
            })
    })
   
    it('CT13 - Marcar todos ambos os checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked')
            .last().uncheck()
            .should('not.be.checked')
    })    

    it('CT14 - Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload').should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('CT15 - Seleciona um arquivo simulando drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload').should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('CT16 - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload').selectFile('@sampleFile')
            .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('CT17 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('CT18 - Acessa a página da política de privacidade removendo o target e então clicando no link', function (){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
    })

    it('CT19 - Exibe e esconde as mensagens de sucesso e erro usando o .invoke', function () {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('CT20 - Preenche a area de texto usando o comando invoke', function (){
        const longText = Cypress._.repeat('123456789', 20)
        cy.get('#open-text-area').invoke('val', longText)
            .should('have.value', longText)
      })

      it('CT21 - Realiza uma requisição HTTP', function (){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should(function(response){
            const { status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')

        })
      })

      it.only('CT22 - Desafio Procure o Gato', function (){
        cy.get('#cat').should('not.be.visible')
            .invoke('show').should('be.visible')
      })


})

