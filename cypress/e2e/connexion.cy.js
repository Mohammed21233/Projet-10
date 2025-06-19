describe("Tests de connexion utilisateur", () => {
  beforeEach(function () {
    cy.fixture("test").as("data"); // ✅ charge test.json
  });

  it("Affiche le formulaire après clic sur le bouton Connexion", function () {
    cy.visit('/');
    cy.contains("Connexion").click();
    cy.get("form").should("be.visible");
  });

  it("La page de connexion affiche bien le formulaire", function () {
    cy.visit('/#/login'); // ✅ corriger ici
    cy.get("form").should("be.visible");
  });

  it("Permet de saisir un email", function () {
    cy.visit('/#/login'); // 
    cy.get('[data-cy="login-input-username"]').type(this.data.user2.username);
  });

  it("Permet de saisir un mot de passe", function () {
    cy.visit('/#/login'); // 
    cy.get('[data-cy="login-input-password"]').type(this.data.user2.password);
  });

  it("Permet de se connecter et de voir le bouton Mon panier", function () {
    cy.visit('/');
    cy.contains("Connexion").click();
    cy.get("form").should("be.visible");

    cy.get('[data-cy="login-input-username"]').type(this.data.user2.username);
    cy.get('[data-cy="login-input-password"]').type(this.data.user2.password);
    cy.get("form").contains("Se connecter").click();

    cy.contains('a', 'Mon panier', { timeout: 8000 }).should('be.visible');
  });
});
