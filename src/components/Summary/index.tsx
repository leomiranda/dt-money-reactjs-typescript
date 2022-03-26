import { Container } from './styles';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
	const { transactions } = useTransactions();

	const totalDeposits = transactions.reduce((acc, transaction) => {
		if (transaction.type === 'deposit') return (acc = acc + transaction.amount);
		return acc;
	}, 0);

	const totalWithdraw = transactions.reduce((acc, transaction) => {
		if (transaction.type === 'withdraw')
			return (acc = acc + transaction.amount);
		return acc;
	}, 0);

	const total = totalDeposits - totalWithdraw;

	const summary = transactions.reduce(
		(acc, transaction) => {
			if (transaction.type === 'deposit') {
				acc.totalDeposits += transaction.amount;
				acc.total += transaction.amount;
			} else {
				acc.totalWithdraw += transaction.amount;
				acc.total -= transaction.amount;
			}

			return acc;
		},
		{
			totalDeposits: 0,
			totalWithdraw: 0,
			total: 0,
		}
	);

	return (
		<Container>
			<div>
				<header>
					<p>Entradas</p>
					<img src={incomeImg} alt="Entradas" />
				</header>
				<strong>
					{new Intl.NumberFormat('pt-br', {
						style: 'currency',
						currency: 'BRL',
					}).format(summary.totalDeposits)}
				</strong>
			</div>
			<div>
				<header>
					<p>Saídas</p>
					<img src={outcomeImg} alt="Saídas" />
				</header>
				<strong>
					-
					{new Intl.NumberFormat('pt-br', {
						style: 'currency',
						currency: 'BRL',
					}).format(summary.totalWithdraw)}
				</strong>
			</div>
			<div>
				<header>
					<p>Total</p>
					<img src={totalImg} alt="Total" />
				</header>
				<strong>
					{' '}
					{new Intl.NumberFormat('pt-br', {
						style: 'currency',
						currency: 'BRL',
					}).format(summary.total)}
				</strong>
			</div>
		</Container>
	);
}
