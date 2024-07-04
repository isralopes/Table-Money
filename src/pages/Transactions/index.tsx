
import Header from '../../components/Header'
import Summary from '../../components/Summary/index'
import { Price, TransactionContainer, TransactionTable } from './styles'
import SeacrhForm from './components/searchforms'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormmater, priceFormatter } from '../../uteis/formatter'
import { useContextSelector } from "use-context-selector"

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;


}

export default function Transactions() {

  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  });


return (
    <div>
      <Header />
      <Summary />
      <TransactionContainer>
        <SeacrhForm />
        <TransactionTable>
        <tbody>
          {transactions.map(banana => {
            return (
              <tr key={banana.id}>
              <td width="50%">
             {banana.description}
              </td>
              <td>
             <Price variant={banana.type}>
              {banana.type === 'outcome' && '-'}
              {priceFormatter.format(banana.price)}
             </Price>
              </td>
              <td>{banana.category}</td>
              <td>{dateFormmater.format(new Date(banana.createdAt))}</td>
            </tr>
            )
          })}
         
          
          </tbody>
        </TransactionTable>
      </TransactionContainer>

    </div>
  )
}
