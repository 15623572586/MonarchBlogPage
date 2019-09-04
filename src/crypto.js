import CryptoJS from 'crypto-js'
export default {//加密
    set(word){ 
      var keyStr = 'abcdefghijklmn00';   //16位的密钥，自己定义，和下面的密钥要相同
      var key  = CryptoJS.enc.Utf8.parse(keyStr);
      var srcs = CryptoJS.enc.Utf8.parse(word);
      var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
      return encrypted.toString();
    },
    //解密
    get(word){  
      // keyStr = keyStr ? keyStr : 'abcdefghijklmnop';
      var keyStr = 'abcdefghijklmn00';
      var key  = CryptoJS.enc.Utf8.parse(keyStr);
      var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
      return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
  }