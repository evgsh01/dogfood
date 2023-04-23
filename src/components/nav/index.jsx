import { Link } from 'react-router-dom';
import { useContext } from 'react';

import {ReactComponent as FavoriteIcon} from './img/favorites.svg';
import dog from './img/dog.svg';
import bag from './img/bag.svg';
import menu from './img/menu.svg';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/card-context';

import s from './styles.module.css';

export function Nav() {
    const { currentUser, onUpdateUser } = useContext(UserContext);
    const { favorites } = useContext(CardsContext);

    return (
        <nav>
            <div className={s.nav__wrapper}>
                <Link className={s.favoritesLink} to={{pathname: '/favorites'}}>
                    <FavoriteIcon title='Избранное'/>
                    {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
                </Link>
                
                <img src={bag} alt="Корзина" />
                <img src={dog} alt="Личный кабинет" /> 
            </div>
            <div className={s.nav__wrapper_small}>
                <img src={menu} alt="Меню" />
            </div>                  
        </nav> 
    );
}