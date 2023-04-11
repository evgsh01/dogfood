/* import { Button } from '../button'; */
import { useContext } from 'react';

import { UserContext } from '../../contexts/current-user-context';
import { Nav } from '../nav';

import './styles.css';

export function Header({ children }) {
  const {currentUser, onUpdateUser} = useContext(UserContext);

  /* const handleClickButtonEdit = () => {
    onUpdateUser({name: 'Шимаров Евгений Николаевич', about: 'Писатель'})
  } */
  return (
    <header className='header'>
      <div className="container header__wrapper">
        { children }
        {/* <div className='author'>
          {currentUser && <span>{currentUser.name}: {currentUser.about}</span>}
          <span> {currentUser?.email}</span>
          <Button action={handleClickButtonEdit}>Изменить</Button>
        </div> */}
        <Nav/>
      </div>

    </header>
  );
}


