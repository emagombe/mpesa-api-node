
import Transaction from "./Transaction";

class Mpesa {

	static init(api_key, public_key, ssl = true) {
		return new Transaction(api_key, public_key, ssl);
	}
}

export default Mpesa;