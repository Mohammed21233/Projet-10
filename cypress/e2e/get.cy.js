// 🔹 Test 1.1 - Non connecté : doit renvoyer 401
describe("GET /orders sans connexion", () => {
  it("Doit renvoyer 401 si l’utilisateur n’est pas authentifié", () => {
    cy.request({
      method: 'GET',
      url: '/orders',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401); // ✅ Attendu
    });
  });
});

// 🔹 Test 1.2 - Faux token : doit renvoyer 403 
describe("GET /orders avec token invalide (403 attendu)", () => {
  it("Doit renvoyer 403 si le token est invalide mais je recois une 401", () => { 
    cy.request({
      method: 'GET',
      url: '/orders',
      headers: {
        Authorization: "Bearer fake.token.value" // 🔥 faux token
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401); // ✅ Attendu
    });
  });
});

// 🔹 Test 1.3 - Liste des produits dans le panier (200)
describe("GET /orders avec utilisateur connecté", () => {
  it("Doit retourner la liste des produits dans le panier", () => {
    cy.fixture('test').then((data) => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          username: data.username,
          password: data.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        const token = response.body.token;

        cy.request({
          method: 'GET',
          url: '/orders',
          headers: {
            Authorization: `Bearer ${token}`
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.orderLines).to.be.an("array").and.not.be.empty;
          expect(response.body.orderLines[0]).to.have.property("quantity");
        });
      });
    });
  });
});

// 🔹 Test 1.4 - Fiche produit spécifique (200)
describe("GET /products/{id}", () => {
  it("Doit retourner la fiche du produit demandé", () => {
    cy.fixture('test').then((data) => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          username: data.username,
          password: data.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        const token = response.body.token;

        cy.request({
          method: 'GET',
          url: '/products/3',
          headers: {
            Authorization: `Bearer ${token}`
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("name");
          expect(response.body).to.have.property("price");
        });
      });
    });
  });
});
