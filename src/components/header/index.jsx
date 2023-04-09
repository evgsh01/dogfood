/* import { Button } from '../button'; */
import { Nav } from '../nav';
import './styles.css';

export function Header({ children, user, onUpdateUser }) {

  /* const handleClickButtonEdit = () => {
    onUpdateUser({name: 'Шимаров Евгений Николаевич', about: 'Писатель'})
  } */
  return (
    <header className='header'>
      <div className="container header__wrapper">
        { children }
        {/* <div className='author'>
          {user && <span>{user.name}: {user.about}</span>}
          <span> {user?.email}</span>
          <Button action={handleClickButtonEdit}>Изменить</Button>
        </div> */}
        <Nav/>
      </div>

    </header>
  );
}


