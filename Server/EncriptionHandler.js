const crypto = require('crypto');
const secret = "pppppppppppppppppppppppp";

const encrypt = (password)=>{
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv("aes-256-gcm",Buffer.from(secret),iv);
    const encryptedPassword = Buffer.concat([
        cipher.update(password),
        cipher.final(),
    ]);
    return { 
        iv:iv,
        password:encryptedPassword.toString('hex') 
    };
};

const decrypt = (encription)=>{
    const decipher = crypto.createDecipheriv("aes-256-gcm",
    Buffer.from(secret),
    Buffer.from(encription.iv,"hex")
    );
    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encription.password),"hex"),
        decipher.final(),
    ]);
    return decryptedPassword.toString();
}

module.exports = {encrypt, decrypt};