import { SearchFormContainer } from './styles'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from "use-context-selector"

const serachSchec = z.object({
  query: z.string()
})

type searchFoirmsInputs = z.infer<typeof serachSchec>

export default function SeacrhForm() {

  const loadTrans = useContextSelector(TransactionsContext, (context)=> {
    return context.loadTrans
  })

  const {register, handleSubmit, formState: {isSubmitting}} = useForm<searchFoirmsInputs>({
    resolver: zodResolver(serachSchec)
  })

async function handleSearch(data: searchFoirmsInputs){
  await loadTrans(data.query)
}

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearch)}>
      <input type='text' placeholder='Busque por Transações' {...register('query')} />


      <button type='submit' disabled={isSubmitting}>
        <MagnifyingGlass size={15} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
