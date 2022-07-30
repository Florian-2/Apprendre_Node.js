const express = require("express");
const app = express();

app.get("*", (req, res) => {
    console.log(req.protocol); // https
    res.send("<h1>HTTPS NODE.JS</h1");
})

module.exports = app;

/*
    Certificat Root fait office de CA (Certificat Authority) et avec ça on peut signer des certificat pour prouver que le nom de domaine nous appartient bien etc, et avec la clé public de ce certificat root on va vérifier tout les certificat qui aura été valider par le certificat root donc le CA.

    Et ce certificat Root n'a pas besoin d'être dans le dossier ou est l'application, on peut le stocker n'importe ou sur le pc/serveur

    Etape:

        1. openssl genrsa -des3 -out myCA.key 2048 (Génère une clé privé qui sera utilisé pour signer un certificat)
        2. openssl req -x509 -new -nodes -key myCA.key -sha256 -days 1825 -out myCA.pem (Crée le CA)
        3. openssl genrsa -out local.key 2048
        4. openssl req -new -key local.key -out local.csr
        5. openssl x509 -req -in local.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out local.crt -days 1825 -sha256 -extfile local.ext
*/