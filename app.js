// Importer Express.js
const express = require('express');

// Créer une application Express
const app = express();

// Middleware pour analyser les corps JSON
app.use(express.json());

// Définir le port et le jeton de vérification
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route pour les requêtes GET (vérification du webhook)
app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const token = req.query['hub.verify_token'];

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// Route pour les requêtes POST (réception des événements)
app.post('/', (req, res) => {
  const timestamp = new Date()
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19);

  console.log(`\n\nWebhook reçu ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`\nÉcoute sur le port ${port}\n`);
});
