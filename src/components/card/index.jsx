import cn from 'classnames';
import { ReactComponent as LikeIcon } from '../../images/save.svg';
import { isLiked } from '../../utils/products';
import './styles.css';


export function Card({name, price, discount, wight, description, pictures, likes, _id, onProductLike, currentUser, ...props}) {

  const discountPrice = Math.round(price - (price * discount) / 100);

  const like = isLiked(likes, currentUser?._id);
  
  function handleClickButtonLike() {
    onProductLike({ likes, _id })
  }

  return (
    <article className="card">
      <div className="card__sticky card__sticky_type_top-left">
        {discount !== 0 && (<span className="card__discount">{`- ${discount}%`}</span>)}
      </div>

      <div className="card__sticky card__sticky_type_top-right">
        <button className={cn("card__favorite", {'card__favorite_is-active' : like})} onClick={handleClickButtonLike}>
          <LikeIcon className='card__favorite-icon'/>
        </button>
      </div>

      <a href="#" className="card__link">
        <img src={pictures} alt={`Изображение ${name}`} className="card__image" />
        <div className="card__desc">
          <span className={discount !== 0 ? 'card__old-price' : 'card__price'}>{price}&nbsp;₽</span>
          {discount !== 0 && <span className='card__price card__price_type_discount'>{discountPrice}&nbsp;₽</span>}
          <span className="card__wigth">{wight}</span>
          <h3 className="card__name">{name}</h3>
        </div>
      </a>
      <a href="#" className="card__cart btn btn_type_primary">В корзину</a>
    </article>
  );
}


