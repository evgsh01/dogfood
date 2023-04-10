import { Card } from '../card';

import './styles.css';

export function CardList({ goods, handleProductLike, currentUser }) {
  return (
    <div className='cards content__cards'>
      {goods.map((dataItem, index) => <Card key={index} {...dataItem} onProductLike={handleProductLike} currentUser={currentUser}/>)}
    </div>
  );
}


