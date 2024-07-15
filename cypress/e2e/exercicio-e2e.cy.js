/// <reference types="cypress" />

const perfil = require('../fixtures/perfil.json')
import produtosPage from '../support/page_objects/produtosPage';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('minha-conta')
});

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
        
    cy.visit('minha-conta')
    cy.get('#username').type(perfil.usuario)
    cy.get('#password').type(perfil.senha)
    cy.get('.woocommerce-form > .button').click()
});

it.only('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    cy.visit('produtos')
    let qtd = 4
    produtosPage.buscarProduto('Apollo Running Short')
    produtosPage.addProdutoCarrinho('36', 'Black', qtd)
    cy.get('.woocommerce-message').should('contain', qtd + ' × “Apollo Running Short” foram adicionados no seu carrinho.')
    cy.visit('carrinho')
    cy.get('.checkout-button').click()
    cy.get('#billing_first_name').type('Aluno')
    cy.get('#billing_last_name').type('Ebac')
    cy.get('#billing_address_1').type('Rua Ebac, 123')
    cy.get('#billing_city').type('São Paulo')
    cy.get('#billing_postcode').type('00000-000')
    cy.get('#billing_phone').type('1234-5678')
    cy.get('#billing_email').type(perfil.usuario)
    cy.get('#terms').click()
    cy.get('#place_order').click()
    cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
});
});