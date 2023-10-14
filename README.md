# mpesa-api-nodejs
API escrita em NodeJS para M-PESA (Moçambique)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Esta API (Aplication programing interface), permite efectuar transações no m-pesa usando o NodeJS.

## Instalação
```bash
npm install mpesa-api-nodejs
```
## Implementação

Primeiramente crie uma conta no site https://developer.mpesa.vm.co.mz/ e obtenha a **api key** e o **public key**
```JavaScript
const MpesaAPI = require("mpesa-api-nodejs");

const api_key = "";		// Aqui introduz a api key disponibilizada no site
const public_key = "";	// Aqui introduz o public key disponibilizado no site
const ssl = true;		// True se pretende utilizar uma conexão segura (SSL)

// Inicialização e criação do objecto
const mpesa = MpesaAPI.init(api_key, public_key, ssl);
```
### Transferência business to client (de negócio para cliente)
Transferência de valor do agente para o clinte
```JavaScript
const data = {
	value: 10,
	client_number: "258840000000",
	agent_id: 171717,
	transaction_reference: 1234567,
	third_party_reference: 33333
};

const response = await mpesa.b2c(data);

/* OR */

mpesa.b2c(data).then(response => {
	console.log(response);
}).catch(ex => console.log(ex));

```
##### Provável resposta caso bem sucedido
```json
{
  "output_ResponseCode": "INS-0",
  "output_ResponseDesc": "Request processed successfully",
  "output_TransactionID": "wgzupjwc5mm9",
  "output_ConversationID": "ccf590fbfa1d4ff4a245b9c430a64220",
  "output_ThirdPartyReference": "33333"
}
```

### Transferência client to business (de cliente para negócio)
Transferência de valor do cliente para o agente
```JavaScript
const data = {
	value: 10,
	client_number: "258840000000",
	agent_id: 171717,
	transaction_reference: 1234567,
	third_party_reference: 33333
};

const response = await mpesa.c2b(data);

/* OR */

mpesa.c2b(data).then(response => {
	console.log(response);
}).catch(ex => console.log(ex));

```
##### Provável resposta caso bem sucedido
```json
{
  "output_ResponseCode": "INS-0",
  "output_ResponseDesc": "Request processed successfully",
  "output_TransactionID": "3cr8whltpb6m",
  "output_ConversationID": "25230e0e20514ba790c1273b866e98d1",
  "output_ThirdPartyReference": "33333"
}
```

### Transferência business to business (de negócio para negócio)
Transferência de valor de agente para agente
```JavaScript
const data = {
	value: 10,
	agent_id: 171717,
	agent_receiver_id: 979797,
	transaction_reference: 1234567,
	third_party_reference: 33333
};

const response = await mpesa.b2b(data);

/* OR */

mpesa.b2b(data).then(response => {
	console.log(response);
}).catch(ex => console.log(ex));

```
##### Provável resposta caso bem sucedido
```json
{
  "output_ResponseCode": "INS-0",
  "output_ResponseDesc": "Request processed successfully",
  "output_TransactionID": "wdv2x712xjsx",
  "output_ConversationID": "1f427e27529e410ea433c79a253d7281",
  "output_ThirdPartyReference": "33333"
}
```

### Reversão de transação

```JavaScript
const data = {
	value: 10,
	security_credential: "", // (Obrigatório)
	indicator_identifier: "", // (Obrigatório)
	transaction_id: "", // (Obrigatório) Id da transação a reverter
	agent_id: 171717, // (Obrigatório) Código do agente
	third_party_reference: 33333 // (Obrigatório) Esta referencia será usada para efectuar consulta das transações
};

const response = await mpesa.reversal(data);

/* OR */

mpesa.reversal(data).then(response => {
	console.log(response);
}).catch(ex => console.log(ex));

```
##### Provável resposta caso bem sucedido
```json
{
  "output_ResponseCode": "INS-0",
  "output_ResponseDesc": "Request processed successfully",
  "output_TransactionID": "18c9kqgagz7h",
  "output_ConversationID": "2af1dce322394316917307c5320add6d",
  "output_ThirdPartyReference": "33333"
}
```

### Estado da transação

```JavaScript
const data = {
	transaction_id: "", // (Obrigatório) Id da transação a reverter
	agent_id: 171717, // (Obrigatório) Código do agente
	third_party_reference: 33333 // (Obrigatório) Esta referencia será usada para efectuar consulta das transações
};

const response = await mpesa.status(data);

/* OR */

mpesa.status(data).then(response => {
	console.log(response);
}).catch(ex => console.log(ex));

```
##### Provável resposta caso bem sucedido
```json
{
  "output_ResponseCode": "INS-0",
  "output_ResponseDesc": "Request processed successfully",
  "output_ResponseTransactionStatus": "Completed",
  "output_ConversationID": "7552194cb219468fa8da3356eed77feb",
  "output_ThirdPartyReference": "33333"
}
```

### Nome do cliente

O nome do cliente é retornado. Geralmente usado para confirmar se client_number introduzido está correcto.

Nota impotante: É impossível verificar o nome do cliente usando as credenciais de testes. É necessário obter credencias de produção para que possa visualizar o nome do cliente!

```JavaScript
const data = {
	client_number: "258840000000", // (Obrigatório) Número do cliente
	agent_id: 171717, // (Obrigatório) Código do agente
	third_party_reference: 33333 // (Obrigatório) Esta referencia será usada para efectuar consulta das transações
};
const response = await mpesa.customer_name(data);

/* OR */

mpesa.customer_name(data).then(response => {
	console.log(response);
}).catch(ex => console.log(ex));
```
##### Provável resposta caso bem sucedido
```json
{
  "output_ResponseCode": "INS-26",
  "output_ResponseDesc": "Not authorized",
  "output_ConversationID": "f4f9e06d93b7439eb79bd61c7de6f642",
  "output_ThirdPartyReference": "33333",
  "output_CustomerName": "N/A"
}
```