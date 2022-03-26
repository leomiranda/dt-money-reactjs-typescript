import {
	createContext,
	useEffect,
	useState,
	ReactNode,
	useContext,
} from 'react';
import { api } from '../services/api';

interface ITransactionsContext {
	transactions: ITransaction[];
	createTransaction: (transaction: INewTransaction) => Promise<void>;
}

const TransactionsContext = createContext<ITransactionsContext>(
	{} as ITransactionsContext
);

interface ITransaction {
	id: number;
	title: string;
	type: string;
	category: string;
	amount: number;
	createAt: string;
}

type INewTransaction = Omit<ITransaction, 'id' | 'createAt'>;

interface IProps {
	children: ReactNode;
}

export function TransactionsProvider({ children }: IProps) {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);

	useEffect(() => {
		api
			.get<{ transactions: ITransaction[] }>('transactions')
			.then((response) => setTransactions(response.data.transactions));

		console.log('>>> transactions', transactions);
	}, []);

	async function createTransaction(newTransaction: INewTransaction) {
		const response = await api.post<{ transaction: ITransaction }>(
			'/transactions',
			{
				...newTransaction,
				createAt: new Date(),
			}
		);
		const { transaction } = response.data;

		setTransactions((transactions) => [...transactions, transaction]);
	}

	return (
		<TransactionsContext.Provider value={{ transactions, createTransaction }}>
			{children}
		</TransactionsContext.Provider>
	);
}

export function useTransactions() {
	const context = useContext(TransactionsContext);

	return context;
}
