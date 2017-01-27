/**
 * Created by ZY on 2017/1/28.
 */
/*
 crypto模块的目的是为了提供通用的加密和哈希算法
 */

const crypto = require('crypto'),
    hash = crypto.createHash('md5'),
    hasH = crypto.createHash('sha1');//'sha256'或者'sha512'也可以

hash.update('Hello World~');
hash.update("Hello,nodejs~");
hasH.update('Hello World~');
hasH.update("Hello,nodejs~");

console.log(hash.digest('hex'));
console.log(hasH.digest('hex'));

/*
 update()方法默认字符串编码为UTF-8，也可以传入Buffer。

 如果要计算SHA1，只需要把'md5'改成'sha1'，
 就可以得到SHA1的结果1f32b9c9932c02227819a4151feed43e131aca40
 */
/*
 Hmac算法也是一种哈希算法，
 它可以利用MD5或SHA1等哈希算法。
 不同的是，Hmac还需要一个密钥

 只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，
 因此，可以把Hmac理解为用随机数“增强”的哈希算法。
 */
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex'));

/*
 AES是一种常用的对称加密算法，加解密都用同一个密钥。
 crypto模块提供了AES支持，但是需要自己封装好函数，便于使用
 */

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);

/*
 AES有很多不同的算法，
 如aes192，aes-128-ecb，
 aes-256-cbc等，AES除了密钥外还可以指定IV（Initial Vector），
 不同的系统只要IV不同，
 用相同的密钥加密相同的数据得到的加密结果也是不同的。
 加密结果通常有两种表示方法：hex和base64
 */

/*
 Diffie-Hellman

 DH算法是一种密钥交换协议，
 它可以让双方在不泄漏密钥的情况下协商出一个密钥来。DH算法基于数学原理，比如小明和小红想要协商一个密钥，可以这么做：

 小明先选一个素数和一个底数，
 例如，素数p=23，底数g=5（底数可以任选），
 再选择一个秘密整数a=6，
 计算A=g^a mod p=8，然后大声告诉小红：p=23，g=5，A=8；

 小红收到小明发来的p，g，A后，
 也选一个秘密整数b=15，
 然后计算B=g^b mod p=19，并大声告诉小明：B=19；

 小明自己计算出s=B^a mod p=2，
 小红也自己计算出s=A^b mod p=2，
 因此，最终协商的密钥s为2。

 在这个过程中，密钥2并不是小明告诉小红的，
 也不是小红告诉小明的，而是双方协商计算出来的。
 第三方只能知道p=23，g=5，A=8，B=19，
 由于不知道双方选的秘密整数a=6和b=15，
 因此无法计算出密钥2

 p.s.好像RSA...
 */

//todo tbc
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

// print secret:
console.log('Secret of Xiao Ming: '
    + ming_secret.toString('hex'));
console.log('Secret of Xiao Hong: '
    + hong_secret.toString('hex'));
//注意每次输出都不一样，因为素数的选择是随机的。

//证书 tbc