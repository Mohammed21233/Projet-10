describe("Login", () => {
    let token
    it('utilisateur inconnu : retourne 401 en cas d’erreur,', () => {
      cy.request({
      method: 'POST',
      url: '/login', // Remplace par ton URL
      body: {
        username: "tt@hotmail.com",
        password: "testtest"
      },
            failOnStatusCode: false

    }).then((response) => {
      expect(response.status).to.eq(401);
    });
})
it('utilisateur connu : retourne 200 s’il passe,', () => {
      cy.request({
      method: 'POST',
      url: '/login', // Remplace par ton URL
      body: {
        username: "test@hotmail.com",
        password: "testtest"
      },
            failOnStatusCode: false

    }).then((response) => {
      expect(response.status).to.eq(200);
    });
})
})
describe("Ajouter un produit disponible au panier", () => {
    let token
    it('Ajouter un produit disponible au panier,', () => {
      cy.request({
      method: 'POST',
      url: '/login', // Remplace par ton URL
      body: {
        username: "test@hotmail.com",
        password: "testtest"
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token

      cy.request({
      method: 'PUT',
      url: '/orders/add',
      body: {
        product: 3,
        quantity:1
      },
      headers: {
          Authorization: `Bearer ${token}`
        },
      failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
    
    });
})
})
describe("Ajouter un produit en rupture de stock", () => {
    let token
    it('Retourne une erreur quand on ajoute un produit en rupture de stock,', () => {
      cy.request({
      method: 'POST',
      url: '/login', // Remplace par ton URL
      body: {
        username: "test@hotmail.com",
        password: "testtest"
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token

      cy.request({
      method: 'PUT',
      url: '/orders/add',
      body: {
        product: 3,
        quantity:100
      },
      headers: {
          Authorization: `Bearer ${token}`
        },
      failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(409);// renvoi quand meme une 200 ANOMALIE
    })
    
    });
})
})
describe("Ajouter un avis", () => {
  it("Ajouter un avis avec étoile, titre et commentaire", () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: {
        username: "test@hotmail.com",
        password: "testtest"
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;

      cy.request({
        method: 'POST',
        url: '/reviews',
        body: {                     
          rating: 5,                         
          title: "Excellent savon",          
          comment: "Ce savon est efficace, écologique, et sent trés bon." 
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200); // crée avec succes
        // Optionnel : vérifier que l'avis a bien été créé
        expect(response.body).to.have.property("id");
      });
    });
  });
});
