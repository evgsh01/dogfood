import cn from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CardsContext } from '../../contexts/card-context';
import { UserContext } from '../../contexts/current-user-context';

import { ReactComponent as LikeIcon } from '../../images/save.svg';
import { calcDiscountPrice, isLiked } from '../../utils/products';

import './styles.css';


export function Card({name, price, discount, wight, description, pictures, tags, likes, _id, ...props}) {

  const discount_price = calcDiscountPrice(price, discount);

  const { currentUser } = useContext(UserContext);
  const { handleLike: onProductLike } = useContext(CardsContext);

  const like = isLiked(likes, currentUser?._id);
  
  function handleClickButtonLike() {
    onProductLike({ likes, _id })
  }

  return (
    <article className="card">
      <div className="card__sticky card__sticky_type_top-left">
        {discount !== 0 && (
          <span className="card__discount">{`-${discount}%`}</span>
        )}
        {tags && tags.map(tagName => (
          <span key={tagName} className={cn('tag', { [`tag_type_${tagName}`]: true })}>
            {tagName}
          </span>
        )
        )}
      </div>

      <div className="card__sticky card__sticky_type_top-right">
        <button className={cn("card__favorite", {'card__favorite_is-active' : like})} onClick={handleClickButtonLike}>
          <LikeIcon className='card__favorite-icon'/>
        </button>
      </div>

      <Link to={`/product/${_id}`} className="card__link">
        <img src={pictures} alt={`Изображение ${name}`} className="card__image" />
        <div className="card__desc">
          {discount !== 0 ? (
            <>
              <span className="card__old-price">{price}&nbsp;₽</span>
              <span className="card__price card__price_type_discount">
                {discount_price}&nbsp;₽
              </span>
            </>
            ) : (
            <span className="card__price">{price}&nbsp;₽</span>
          )}
          <span className="card__wigth">{wight}</span>
          <h3 className="card__name">{name}</h3>
        </div>
      </Link>
      <a href="#" className="card__cart btn btn_type_primary">В корзину</a>
    </article>
  );
}


