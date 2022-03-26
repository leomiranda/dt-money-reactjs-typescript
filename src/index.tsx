import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
	models: {
		transaction: Model,
	},

	seeds(server) {
		server.db.loadData({
			transactions: [
				{
					id: 1,
					title: 'Frelance',
					type: 'deposit',
					category: 'Dev',
					amount: 6000,
					createAt: new Date('2021-02-12 09:00:00'),
				},
				{
					id: 2,
					title: 'Salario',
					type: 'deposit',
					category: 'Dev',
					amount: 12000,
					createAt: new Date('2021-02-13 09:00:00'),
				},
				{
					id: 3,
					title: 'Alugel',
					type: 'withdraw',
					category: 'Casa',
					amount: 1200,
					createAt: new Date('2021-02-14 09:00:00'),
				},
			],
		});
	},

	routes() {
		this.namespace = 'api';

		this.get('/transactions', () => {
			return this.schema.all('transaction');
		});

		this.post('/transactions', (schema, request) => {
			const data = JSON.parse(request.requestBody);

			return schema.create('transaction', data);
		});
	},
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
