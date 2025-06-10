describe("Affichage des produits - Test 3", () => {

  // 3.1 Vérifiez le chargement de la page
  it("3.1 - La page d’accueil doit se charger correctement", () => {
    cy.visit('http://localhost:8080/#/');
    cy.get('body').should('be.visible');
    cy.contains("Nos produits").should("exist"); // adapte si besoin
  });

  // 3.2 Vérifiez l’affichage des produits avec image, description, bouton
  it("3.2 - Tous les produits affichent image, description et bouton Consulter", () => {
    cy.visit('http://localhost:8080/#/');

    // Aller à la page Produits
    cy.get('[data-cy="nav-link-products"]').click();

    // Vérifier les produits
    cy.get('[data-cy="product"]').should('have.length.greaterThan', 0).each(($product) => {
      cy.wrap($product).find('[data-cy="product-picture"]').should('be.visible');
      cy.wrap($product).find('[data-cy="product-ingredients"]').should('exist');
      cy.wrap($product).find('[data-cy="product-link"]').should('exist');
    });
  });

  // 3.3 Vérifiez chaque fiche produit après clic
  it("3.3 - Chaque fiche produit affiche image, description, prix et stock", () => {
    cy.visit('http://localhost:8080/#/');

    // Aller sur la page Produits
    cy.get('[data-cy="nav-link-products"]').click();

    // Récupérer tous les boutons “Consulter”
    cy.get('[data-cy="product-link"]').then(($links) => {
      const total = $links.length;

      // Boucle manuelle avec re-sélection à chaque tour
      for (let i = 0; i < total; i++) {
        cy.get('[data-cy="product-link"]').eq(i).click({ force: true });

        // Vérification de la fiche produit
        cy.get('[data-cy="detail-product-img"]').should('be.visible');
        cy.get('[data-cy="detail-product-ingredients"]').should('exist');
        cy.get('[data-cy="detail-product-price"]').should('exist');
        cy.get('[data-cy="detail-product-stock"]').should('exist');

        // Revenir à la liste des produits
        cy.go('back');
        cy.get('[data-cy="product-link"]').should('exist');
      }
    });
  });

}); 
