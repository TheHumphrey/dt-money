import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './style'
import { api } from '../../lib/axios'

const newTransactionsFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionsFormInputs = z.infer<typeof newTransactionsFormSchema>

export const NewTransactionModal = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<NewTransactionsFormInputs>({
    resolver: zodResolver(newTransactionsFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  const handleCreateNewTransaction = async (
    data: NewTransactionsFormInputs,
  ) => {
    const { category, description, price, type } = data

    await api.post('/transactions', {
      category,
      description,
      price,
      type,
      createdAt: new Date(),
    })
  }

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Nova Transação</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              type="text"
              placeholder="Descrição"
              required
              {...register('description')}
            />
            <input
              type="number"
              placeholder="Preço"
              required
              {...register('price', { valueAsNumber: true })}
            />
            <input
              type="text"
              placeholder="Categoria"
              required
              {...register('category')}
            />

            {
              <Controller
                control={control}
                name="type"
                render={({ field }) => {
                  return (
                    <TransactionType
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <TransactionTypeButton variant="income" value="income">
                        <ArrowCircleUp size={24} />
                        Entrada
                      </TransactionTypeButton>

                      <TransactionTypeButton variant="outcome" value="outcome">
                        <ArrowCircleDown size={24} />
                        Saída
                      </TransactionTypeButton>
                    </TransactionType>
                  )
                }}
              />
            }

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  )
}
