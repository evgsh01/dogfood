import { Nav } from '../nav';

import './styles.css';

export function Header({ children }) {
  
  return (
    <header className='header'>
      <div className="container header__wrapper">
        { children }
        <Nav/>
      </div>

    </header>
  );
}


