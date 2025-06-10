describe("Test 5 - Smoke tests", () => {

  it("5.1 - Présence des champs et du bouton de connexion", () => {
    cy.visit('http://localhost:8080/#/login');

    cy.get('[data-cy="login-input-username"]').should('exist');
    cy.get('[data-cy="login-input-password"]').should('exist');
    cy.contains("Se connecter").should('exist');
  });




  it("5.2 - Présence du bouton Ajouter au panier une fois connecté", () => {
    // Aller à la page de login
    cy.visit('http://localhost:8080/#/login');

    // Connexion
    cy.get('[data-cy="login-input-username"]').type('test@hotmail.com');
    cy.get('[data-cy="login-input-password"]').type('testtest');
    cy.contains("Se connecter").click();

    // Aller sur la page produits
    cy.get('[data-cy="nav-link-products"]').click();

    // Cliquer sur le premier produit
    cy.get('[data-cy="product-link"]').first().click({ force: true });

    // Vérifier que le bouton d’ajout au panier est présent
    cy.get('[data-cy="detail-product-add"]').should('exist');
  });





  it("5.3 - Présence du champ de disponibilité du produit (stock)", () => {
    cy.visit('http://localhost:8080/#/');

    // Aller sur la page Produits
    cy.get('[data-cy="nav-link-products"]').click();

    // Cliquer sur le premier bouton "Consulter"
    cy.get('[data-cy="product-link"]').first().click({ force: true });

    // Vérifier la présence du stock
    cy.get('[data-cy="detail-product-stock"]').should('exist');
  });

});
