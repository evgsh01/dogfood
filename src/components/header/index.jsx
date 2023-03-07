import { Logo } from '../logo';
import './styles.css';

export function Header() {
  return (
    <header className='header'>
      <div className="container header__wrapper">
        <Logo/>
      </div>

    </header>
  );
}


