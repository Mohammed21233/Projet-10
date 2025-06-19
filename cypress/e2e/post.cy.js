describe("Login", () => {
  it("utilisateur inconnu : retourne 401 en cas d’erreur", () => {
    cy.request({
      method: "POST",
      url: "/login",
      body: {
        username: "tt@hotmail.com", // volontairement faux
        password: "testtest"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("utilisateur connu : retourne 200 s’il passe", () => {
    cy.fixture("test").then((user) => {
      cy.request({
        method: "POST",
        url: "/login",
        body: {
          username: user.username,
          password: user.password
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});

describe("Ajouter un produit disponible au panier", () => {
  it("Ajouter un produit disponible au panier", () => {
    cy.fixture("test").then((user) => {
      cy.request({
        method: "POST",
        url: "/login",
        body: {
          username: user.username,
          password: user.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        const token = response.body.token;

        cy.request({
          method: "PUT",
          url: "/orders/add",
          body: {
            product: 3,
            quantity: 1
          },
          headers: {
            Authorization: `Bearer ${token}`
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
});

describe("Ajouter un produit en rupture de stock", () => {
  it("Retourne une erreur quand on ajoute un produit en rupture de stock", () => {
    cy.fixture("test").then((user) => {
      cy.request({
        method: "POST",
        url: "/login",
        body: {
          username: user.username,
          password: user.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        const token = response.body.token;

        cy.request({
          method: "PUT",
          url: "/orders/add",
          body: {
            product: 3,
            quantity: 100
          },
          headers: {
            Authorization: `Bearer ${token}`
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(409); // ⚠️ Anomalie confirmée : renvoie 200
        });
      });
    });
  });
});

describe("Ajouter un avis", () => {
  it("Ajouter un avis avec étoile, titre et commentaire", () => {
    cy.fixture("test").then((user) => {
      cy.request({
        method: "POST",
        url: "/login",
        body: {
          username: user.username,
          password: user.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        const token = response.body.token;

        cy.request({
          method: "POST",
          url: "/reviews",
          body: {
            rating: 5,
            title: "Excellent savon",
            comment: "Ce savon est efficace, écologique, et sent très bon."
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("id");
        });
      });
    });
  });
});
