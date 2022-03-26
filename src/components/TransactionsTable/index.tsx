import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container } from './styled';

interface ITransaction {
	id: number;
	title: string;
	type: string;
	category: string;
	amount: number;
	createAt: string;
}

export function TransactionsTable() {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);

	useEffect(() => {
		api
			.get<{ transactions: ITransaction[] }>('transactions')
			.then((response) => setTransactions(response.data.transactions));

		console.log('>>> transactions', transactions);
	}, []);

	return (
		<Container>
			<table>
				<thead>
					<tr>
						<th>Título</th>
						<th>Valor</th>
						<th>Categoria</th>
						<th>Data</th>
					</tr>
				</thead>
				<tbody>
					{transactions.length > 0 &&
						transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td>{transaction.title}</td>
								<td className="deposit">
									{new Intl.NumberFormat('pt-br', {
										style: 'currency',
										currency: 'BRL',
									}).format(transaction.amount)}
								</td>
								<td>{transaction.category}</td>
								<td>
									{new Intl.DateTimeFormat('pt-br').format(
										new Date(transaction.createAt)
									)}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</Container>
	);
}
