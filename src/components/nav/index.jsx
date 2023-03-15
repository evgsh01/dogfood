import likeIcon from '../../images/save.svg';
import dog from './assets/dog.svg';
import bag from './assets/bag.svg';
import menu from './assets/menu.svg';
import './styles.css';

export function Nav() {
    return (
        <nav>
            <ul className='nav__wrapper'>
                <li className=""><a href="#" className="" title="Избранное"><img src={likeIcon} alt="Избранное" className="nav__btn-icon" /></a></li>
                <li className=""><a href="#" className="" title="Корзина"><img src={bag} alt="Корзина" className="nav__btn-icon" /></a></li>
                <li className=""><a href="#" className="" title="Личный кабинет"><img src={dog} alt="Личный кабинет" className="nav__btn-icon" /></a></li>  
            </ul>
            <ul className='nav__wrapper-small'>
                <li className="">
                    <a href="#" className=""><img src={menu} alt="Меню" className="nav__btn-icon" /></a>
                </li>
            </ul>                  
        </nav> 
    );
}