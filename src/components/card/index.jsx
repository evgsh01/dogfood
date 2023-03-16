import likeIcon from '../../images/save.svg';

import './styles.css';

export function Card({name, price, discount, wight, description, picture, ...props}) {

  const discountPrice = Math.round(price - (price * discount) / 100);

  return (
    <article className="card">
      <div className="card__sticky card__sticky_type_top-left">
        {discount !== 0 && (<span className="card__discount">{`- ${discount}%`}</span>)}
      </div>

      <div className="card__sticky card__sticky_type_top-right">
        <button className="card__favorite">
          <img src={likeIcon} alt="Сердечко лайка" className="card__favorite-icon" />
        </button>
      </div>

      <a href="#" className="card__link">
        <img src={picture} alt={`Изображение ${name}`} className="card__image" />
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


