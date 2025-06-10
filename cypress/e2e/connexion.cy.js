it("Affiche le formulaire après clic sur le bouton Connexion", () => {
  cy.visit('http://localhost:8080/#/');
  cy.contains("Connexion").click();
  cy.get("form").should("be.visible");
});

it("La page de connexion affiche bien le formulaire", () => {
  cy.visit('http://localhost:8080/#/login');
  cy.get("form").should("be.visible");
});




it("Permet de saisir un email", () => {
  cy.visit('http://localhost:8080/#/login');
  cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
});



it("Permet de saisir un mot de passe", () => {
  cy.visit('http://localhost:8080/#/login');
  cy.get('[data-cy="login-input-password"]').type("testtest");
});

it("Permet de se connecter et de voir le bouton Mon panier", () => {
  // Aller sur la page d'accueil
  cy.visit('http://localhost:8080/#/');

  // Cliquer sur le bouton Connexion
  cy.contains("Connexion").click();

  // Vérifier que le formulaire s’affiche
  cy.get("form").should("be.visible");

  // Saisir les identifiants valides
  cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
  cy.get('[data-cy="login-input-password"]').type("testtest");

  // Cliquer sur le bouton Se connecter
  cy.get("form").contains("Se connecter").click();


  // Vérifier que le lien "Mon panier" est visible
  cy.contains('a', 'Mon panier', { timeout: 8000 }).should('be.visible');
});
