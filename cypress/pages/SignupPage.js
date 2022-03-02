
//Pascal Case - Todas palavras começam com letra maiúscula (Para Classes).
//Camel Case - a primeira palavra com letra minuscula e as outras começa com letra maiúscula (Para Funções e Variaveis).

class SignupPage {

    go() {
        cy.visit('/')

        //Navegação na pagina principal.
        cy.get('a[href="/deliver"]').click() // Função usada para clicar no botão.
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) {
        //Inserindo as informações no formulário.
        cy.get('input[name="fullName"]').type(deliver.name) //Função para preencher o campo com os dados criados.
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        //Inserindo o CEP e clicando no botão para buscar o CEP.
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        //Validando os campos autocomplete e inserindo o numero da casa.
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        //Função contains para juntar um localizador com um texto.
        cy.contains('.delivery-method li span', deliver.delivery_method).click()

        //Função para fazer upload da CNH.
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh) //Concatenando a pasta onde se encontra a imagem.
    }

    submit() {
        cy.get('button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container  .swal2-html-container').should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage) {
        //cy.get('.alert-error').should('have.text', expectedMessage) 
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage;