const crypto = require('crypto');

// Definir una clave secreta para encriptar y desencriptar (asegúrate de guardarla de manera segura).
const claveSecreta = process.env.SECRETKEY;


// Función para encriptar un mensaje
function encriptar(textoPlano) {
  const iv = process.env.INITIALIZATIONVECTOR; // Vector de inicialización aleatorio
  const cifrador = crypto.createCipheriv('aes-256-cbc', Buffer.from(claveSecreta), iv);
  let textoCifrado = cifrador.update(textoPlano, 'utf-8', 'base64');
  textoCifrado += cifrador.final('base64');
  return  textoCifrado ;
}

// Función para desencriptar un mensaje
function desencriptar(textoCifrado) {

  const iv = process.env.INITIALIZATIONVECTOR;
  const cifrador = crypto.createDecipheriv('aes-256-cbc', Buffer.from(claveSecreta), iv);
  let textoPlano = cifrador.update(textoCifrado.textoCifrado, 'base64', 'utf-8');
  textoPlano += cifrador.final('utf-8');
  return textoPlano;
}


module.exports = {
    encriptar,
    desencriptar
}



