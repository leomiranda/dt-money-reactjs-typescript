import { Container } from './styled';

export function TransactionsTable() {
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
					<tr>
						<td>Desenvolvimento de site</td>
						<td className='deposit'>R$ 10.000,00</td>
						<td>Desenvolvimento</td>
						<td>20/12/21</td>
					</tr>
					<tr>
						<td>Aluguel</td>
						<td className='withdraw'>- R$ 1.100,00</td>
						<td>Casa</td>
						<td>17/12/21</td>
					</tr>
					<tr>
						<td>Desenvolvimento de site</td>
						<td className='deposit'>R$ 8.000,00</td>
						<td>Desenvolvimento</td>
						<td>14/12/21</td>
					</tr>
					<tr>
						<td>Desenvolvimento de site</td>
						<td className='deposit'>R$ 15.000,00</td>
						<td>Desenvolvimento</td>
						<td>10/12/21</td>
					</tr>
				</tbody>
			</table>
		</Container>
	);
}
