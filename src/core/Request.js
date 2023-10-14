import axios from "axios";
import Cryptor from "./Cryptor";

class Request {

	api_key = "";
	public_key = "";
	ssl = true;

	constructor(api_key, public_key, ssl = true) {
		this.ssl = ssl;
		this.public_key = public_key;
		this.api_key = api_key;
	}

	get = async (url, params) => {
		const headers = {
			"Content-Type": "application/json",
			"Origin": "*",
			"Authorization": "Bearer " + Cryptor.token(this.public_key, this.api_key),
		};
		try {
			const request = await axios.get(url, {
				params,
				headers,
			});
			return request.data;
		} catch (ex) {
			if(typeof ex.response.data !== "undefined") {
				return ex.response.data;
			}
			throw new Error(ex);
		}
		throw new Error("Failed to proccess request");
	};

	post = async (url, params) => {
		const length = JSON.stringify(params).length || 0;
		const headers = {
			"Content-Length": length,
			"Content-Type": "application/json",
			"Origin": "*",
			"Authorization": "Bearer " + Cryptor.token(this.public_key, this.api_key),
		};
		try {
			const request = await axios.post(url, params, {
				headers,
			});
			return request.data;
		} catch (ex) {
			if(typeof ex.response.data !== "undefined") {
				return ex.response.data;
			}
			throw new Error(ex);
		}
		throw new Error("Failed to proccess request");
	};

	put = async (url, params) => {
		const length = JSON.stringify(params).length || 0;
		const headers = {
			"Content-Length": length,
			"Content-Type": "application/json",
			"Origin": "*",
			"Authorization": "Bearer " + Cryptor.token(this.public_key, this.api_key),
		};
		try {
			const request = await axios.put(url, params, {
				headers,
			});
			return request.data;
		} catch (ex) {
			if(typeof ex.response.data !== "undefined") {
				return ex.response.data;
			}
			throw new Error(ex);
		}
		throw new Error("Failed to proccess request");
	};
};

export default Request;