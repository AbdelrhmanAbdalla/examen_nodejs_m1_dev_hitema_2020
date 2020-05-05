const crypto = require('crypto');
//const hash = crypto.createHash('sha1');

function sha1Encode(data) {
    console.log("cest ma data:"+data)
    const hash = crypto.createHash('sha1');
    hash.update(data);
    return hash.digest('hex');
}

module.exports.digestAuth = (request, response, next) => {

    const authorization = request.headers.authorization;
    const encoded = authorization.replace('Basic','');
    const sha1Encoded = sha1Encode('password')
    console.log("encoded apres sha1"+encoded)

    const decoded = Buffer.from(encoded,  'base64').toString('utf8');
    //let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    // decrypted = decipher.update(decoded);
    //decrypted = Buffer.concat([decrypted, decipher.final()]);
    const authentication = decoded.split(':');

    //si user = user & password = password ok
    const isValide = authentication[0] === 'node'
        && authentication[1] === sha1Encoded;

    //si pas authentifé 
    isValide ? next() : response.sendStatus(401);
}