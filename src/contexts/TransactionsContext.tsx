import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../libs/axios";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
  
  
  }

  interface TransactionsDatas {
    description: string,
    price: number,
    category: string,
    type: 'income' | 'outcome'
  }
  

interface TreansactionsType {
    transactions: Transaction[];
    loadTrans: (query?: string) => Promise<void>;
    createTransactions: (data: TransactionsDatas) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode;
}


export const TransactionsContext = createContext({} as TreansactionsType)

export function TransactionProvider({children}: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])
    

    async function loadTrans(query?: string) {
      try {
        const response = await api.get('transactions', {
          params: {
            _sort: 'createdAt',
            _order: 'desc',
            q: query
          }
        });
        console.log('Resposta da API (loadTrans):', response);
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      }
    }
    

    const createTransactions = useCallback(
      async (data: TransactionsDatas) => {
        try {
          const { description, price, category, type } = data;
          const response = await api.post('transactions', {
            description,
            price,
            category,
            type,
            createdAt: new Date(),
          });
          console.log(response.data, 'banana')
       
    
          setTransactions((state) =>
          
          [response.data, ...state]
          );
        } catch (error) {
          console.error("Erro ao criar transação:", error);
        }
      },
      [/* Dependências aqui, se necessário */]
    );
  
    useEffect(() => {
      loadTrans()
      
  }, [])

    return (
        <TransactionsContext.Provider value={{transactions, loadTrans, createTransactions}}>{children}</TransactionsContext.Provider>
    )
}

