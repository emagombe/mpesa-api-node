
import crypto from "crypto";

class Cryptor {

	static token(public_key, api_key) {
		const public_key_decoded = Buffer.from(public_key, 'base64');
		const pem = Cryptor.der2pem(public_key_decoded);
		const new_key = crypto.createPublicKey(pem);
		const crypted = crypto.publicEncrypt({
			key: new_key,
			padding: crypto.constants.RSA_PKCS1_PADDING
		}, Buffer.from(api_key));
		return crypted.toString('base64');
	}

	/* Convert Pem to Der */
	static pem2der = (pem_data) => {
		const begin = "KEY-----";
		const end = "-----END";
		pem_data = pem_data.substr(pem_data.indexOf(begin) + begin.length);
		pem_data = pem_data.substr(0, pem_data.indexOf(end));
		const der = Buffer.from(pem_data, "base64");
		return der;
	};

	/* Convert Der to Pem */
	static der2pem = (der_data) => {
		const pem = Buffer.from(der_data).toString("base64");
		const formattedPem = pem.match(/.{1,64}/g).join("\n");
		return `-----BEGIN PUBLIC KEY-----\n${formattedPem}\n-----END PUBLIC KEY-----\n`;
	};

	static getId = (length = 8) => {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const charactersLength = characters.length;
		let randomString = "";
		for (let i = 0; i < length; i++) {
			randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return randomString;
	};
};

export default Cryptor;