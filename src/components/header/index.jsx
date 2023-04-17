import { useContext } from 'react';

import { UserContext } from '../../contexts/current-user-context';
import { Nav } from '../nav';
import { CardsContext } from '../../contexts/card-context';

import './styles.css';

export function Header({ children }) {
  const { currentUser, onUpdateUser } = useContext(UserContext);
  const { favorites } = useContext(CardsContext);

  return (
    <header className='header'>
      <div className="container header__wrapper">
        { children }
        <Nav/>
      </div>

    </header>
  );
}


