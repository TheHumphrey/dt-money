import { HeaderContainer, HeaderContent, NewTransactionButton } from './style'

import logoImg from '../../assets/logo.svg'

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}
