
import Request from "./Request";

class Transaction {

	api_key = null;
	public_key = null;
	ssl = null;

	constructor(api_key, public_key, ssl = true) {
		this.api_key = api_key;
		this.public_key = public_key;
		this.ssl = ssl;
	}

	c2b = async (data) => {
		
		const url = "https://api.sandbox.vm.co.mz:18352/ipg/v1x/c2bPayment/singleStage/";

		const params = {
			input_Amount: data.value,
			input_CustomerMSISDN: data.client_number,
			input_ServiceProviderCode: data.agent_id,
			input_TransactionReference: data.transaction_reference,
			input_ThirdPartyReference: data.third_party_reference,
		};

		const request = new Request(this.api_key, this.public_key, this.ssl);
		const response = await request.post(url, params);
		return response;
	};

	b2c = async (data) => {
		
		const url = "https://api.sandbox.vm.co.mz:18345/ipg/v1x/b2cPayment/";

		const params = {
			input_Amount: data.value,
			input_CustomerMSISDN: data.client_number,
			input_ServiceProviderCode: data.agent_id,
			input_TransactionReference: data.transaction_reference,
			input_ThirdPartyReference: data.third_party_reference,
		};

		const request = new Request(this.api_key, this.public_key, this.ssl);
		const response = await request.post(url, params);
		return response;
	};

	b2b = async (data) => {
		
		const url = "https://api.sandbox.vm.co.mz:18349/ipg/v1x/b2bPayment/";

		const params = {
			input_PrimaryPartyCode: data.agent_id,
			input_ReceiverPartyCode: data.agent_receiver_id,
			input_Amount: data.value,
			input_TransactionReference: data.transaction_reference,
			input_ThirdPartyReference: data.third_party_reference,
		};

		const request = new Request(this.api_key, this.public_key, this.ssl);
		const response = await request.post(url, params);
		return response;
	};

	reversal = async (data) => {
		
		const url = "https://api.sandbox.vm.co.mz:18354/ipg/v1x/reversal/";

		const params = {
			input_TransactionID: data.transaction_id,
			input_SecurityCredential: data.security_credential,
			input_InitiatorIdentifier: data.indicator_identifier,
			input_ThirdPartyReference: data.third_party_reference,
			input_ServiceProviderCode: data.agent_id,
			input_ReversalAmount: data.value,
		};

		const request = new Request(this.api_key, this.public_key, this.ssl);
		const response = await request.put(url, params);
		return response;
	};

	status = async (data) => {
		
		const url = "https://api.sandbox.vm.co.mz:18353/ipg/v1x/queryTransactionStatus/";

		const params = {
			input_QueryReference: data.transaction_id,
			input_ThirdPartyReference: data.third_party_reference,
			input_ServiceProviderCode: data.agent_id,
		};

		const request = new Request(this.api_key, this.public_key, this.ssl);
		const response = await request.get(url, params);
		return response;
	};

	customer_name = async (data) => {
		
		const url = "https://api.sandbox.vm.co.mz:19323/ipg/v1x/queryCustomerName/";

		const params = {
			input_CustomerMSISDN: data.client_number,
			input_ThirdPartyReference: data.third_party_reference,
			input_ServiceProviderCode: data.agent_id,
		};

		const request = new Request(this.api_key, this.public_key, this.ssl);
		const response = await request.get(url, params);
		return response;
	};
}

export default Transaction;