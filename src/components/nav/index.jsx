import likeIcon from '../../images/save.svg';
import dog from './assets/dog.svg';
import bag from './assets/bag.svg';
import './styles.css';

export function Nav() {
    return (
        <nav>
            <a href="#" className="" title="Избранное"><img src={likeIcon} alt="Сердечко лайка" className="nav__btn-icon" /></a>
            <a href="#" className="" title="Корзина"><img src={bag} alt="Корзина" className="nav__btn-icon" /></a>
            <a href="#" className="" title="Личный кабинет"><img src={dog} alt="Мордочка собаки" className="nav__btn-icon" /></a>           
        </nav>        
    );
}