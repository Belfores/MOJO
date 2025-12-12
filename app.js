// Importer Express.js const express = require ( 'express' );


// Créer une application Express const app = express ();


// Middleware pour analyser les corps JSON app.use 
( express.json ( ) ) ;

// Définir le port et le jeton de vérification const port = process.env.PORT || 3000 ; const verifyToken = process.env.VERIFY_TOKEN ;
 


// Route pour les requêtes GET app.get 
( ' /' , ( req , res ) = > { const { ' hub.mode' : mode , 'hub.challenge' : challenge , 'hub.verify_token' : token } = req.query ;   
       

  if ( mode === 'subscribe' && token === verifyToken ) { 
    console . log ( 'WEBHOOK VERIFIED' ); 
    res . status ( 200 ). send ( challenge ); } else { 
    res . status ( 403 ). end (); } });    
    
  


// Route pour les requêtes POST app.post 
( ' / ' , ( req , res ) => { const timestamp = new Date (). toISOString (). replace ( 'T' , ' ' ) .slice ( 0 , 19 ); console.log 
  ( ` \ n \ n Webhook reçu $ { timestamp } \n` ) ; 
  console.log ( JSON.stringify ( req.body , null , 2 ) ) ; 
  res.status ( 200 ) .end ( ) ; } ) ;   
        


// Démarrer l' 
application serveur.listen ( port , () => { 
  console.log ( ` \n Écoute sur le port $ { port } \n` ); });  
