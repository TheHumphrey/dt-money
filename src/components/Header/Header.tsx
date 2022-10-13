import { HeaderContainer, HeaderContent } from './style'

import logoImg from '../../assets/logo.svg'

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <button>Nova transação</button>
      </HeaderContent>
    </HeaderContainer>
  )
}
