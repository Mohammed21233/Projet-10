# Installation du projet  
1. Téléchargez ou clonez le dépôt  
2. Depuis un terminal ouvert dans le dossier du projet, lancez l’application Docker Desktop  
3. Lancez la commande : `docker-compose up`  
4. Ouvrez le site depuis la page : http://localhost:8080  
5. Dans le terminal, lancez la commande : `npx cypress open`  
6. Choisissez le navigateur Chrome pour exécuter les tests  
7. Une fois Cypress lancé, vous verrez les fichiers de test apparaître (par exemple : `get.cy.js`, `post.cy.js`, `connexion.cy.js`, etc.)  
8. Cliquez sur l’un des fichiers pour lancer automatiquement les tests correspondants  
9. Utilisez les identifiants de connexion suivants pour les tests :
   - Email : `test@hotmail.com`
   - Mot de passe : `testtest`

Nb : à l'étape 3, ne pas ajouter le `sudo` si vous êtes sous Windows (sauf dernière version de Windows 11) (PowerShell ou Shell) : `sudo` n'existe pas et Docker Desktop configure automatiquement Docker pour ne pas avoir besoin des droits administrateur.
