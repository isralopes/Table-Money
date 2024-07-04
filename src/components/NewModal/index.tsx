import * as Dialog from '@radix-ui/react-dialog';
import { CloseBuuton, Content, Overlay, TransactionButton, TransactionType } from './style';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from "use-context-selector"


const newScheme = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewFormInputs = z.infer<typeof newScheme>

export default function NewModal() {
    
    const createTransactions  = useContextSelector(TransactionsContext, (context) => {
     
        return context.createTransactions;
    } )
 
    const { register, handleSubmit, control, reset } = useForm<NewFormInputs>({

        resolver: zodResolver(newScheme),
        defaultValues: {
            type: 'income'
        }
    })

    async function createTransaction(data: NewFormInputs) {

        const { description, price, category, type } = data
        console.log(description)

       await createTransactions({
        description, price, category, type 
       })
       
        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content >
                <Dialog.Title>Nova Transação</Dialog.Title>
                <CloseBuuton>
                    <X />
                </CloseBuuton>
                <form onSubmit={handleSubmit(createTransaction)}>
                    <input 
                        type='text' 
                        placeholder='Descrição' 
                  
                         />
                    <input 
                        type='number' 
                        placeholder='Preço' 
                        required {...register('price', { valueAsNumber: true })}
                         />
                    <input 
                        type='text' 
                        placeholder='Categoria ' 
                        required  {...register('category')} 
                        />

                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => {
                            console.log(field)
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionButton variant='income' value='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionButton>
                                    <TransactionButton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saida
                                    </TransactionButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type='submit'>
                        Cadastrar
                    </button>
                </form>
              
                <Dialog.Close />
            </Content>

        </Dialog.Portal>
    )
}
