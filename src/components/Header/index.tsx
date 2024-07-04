
import { HeaderContainer, HeaderContent, NewTransicationButton } from './styles';
import logoImg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog';
import NewModal from '../NewModal';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt='' />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransicationButton>Nova Transação</NewTransicationButton>
          </Dialog.Trigger>
        <NewModal />
        </Dialog.Root>


      </HeaderContent>

    </HeaderContainer>
  )
}
