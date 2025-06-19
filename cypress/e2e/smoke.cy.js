describe("Test 5 - Smoke tests", () => {

  beforeEach(function () {
    cy.fixture('test').then((data) => {
      this.data = data;
    });
  });

  it("5.1 - Présence des champs et du bouton de connexion", function () {
    cy.visit('/#/login');

    cy.get('[data-cy="login-input-username"]').should('exist');
    cy.get('[data-cy="login-input-password"]').should('exist');
    cy.contains("Se connecter").should('exist');
  });

  it("5.2 - Présence du bouton Ajouter au panier une fois connecté", function () {
    cy.visit('/#/login');

    // Connexion avec données du fixture
    cy.get('[data-cy="login-input-username"]').type(this.data.user1.username);
    cy.get('[data-cy="login-input-password"]').type(this.data.user1.password);
    cy.contains("Se connecter").click();

    // Aller à la page produits
    cy.get('[data-cy="nav-link-products"]').click();

    // Cliquer sur un produit
    cy.get('[data-cy="product-link"]').first().click({ force: true });

    // Vérifier le bouton Ajouter au panier
    cy.get('[data-cy="detail-product-add"]').should('exist');
  });

  it("5.3 - Présence du champ de disponibilité du produit (stock)", () => {
    cy.visit('/#/');

    cy.get('[data-cy="nav-link-products"]').click();
    cy.get('[data-cy="product-link"]').first().click({ force: true });

    cy.get('[data-cy="detail-product-stock"]').should('exist');
  });

});
