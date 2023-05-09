import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { ReactComponent as FavoriteIcon } from './img/favorites.svg';
import { ReactComponent as DogIcon } from './img/dog.svg';
import { ReactComponent as Bag } from './img/bag.svg';
import menu from './img/menu.svg';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/card-context';

import s from './styles.module.css';

export function Nav() {
    const { currentUser, onUpdateUser } = useContext(UserContext);
    const { favorites } = useContext(CardsContext);
    const location = useLocation()

    return (
        <nav>
            <div className={s.nav__wrapper}>
                <Link className={s.favoritesLink} to={{pathname: '/favorites'}}>
                    <FavoriteIcon title='Избранное'/>
                    {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
                </Link>
                
                <Link className={s.favoritesLink} to={{pathname: '/cart'}} state={{ backgroundLocation: location, initialPath: location.pathname }}>
                    <Bag title='Корзина'/>
                </Link>                

                <Link className={s.favoritesLink} to={{pathname: '/login'}} state={{ backgroundLocation: location, initialPath: location.pathname }}>
                    <DogIcon title='Личный кабинет'/>
                </Link>
            </div>
            <div className={s.nav__wrapper_small}>
                <img src={menu} alt="Меню" />
            </div>                  
        </nav> 
    );
}