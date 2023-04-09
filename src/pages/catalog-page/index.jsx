import { Sort } from '../../components/sort';
import { CardList } from '../../components/card-list';

import s from './styles.module.css';
import { Spinner } from '../../components/spinner';

 
export function CatalogPage ({ cards, handleProductLike, currentUser, isLoading }) {
    return (
        <>
            {
                isLoading 
                ? <Spinner />
                : <>
                    <Sort />
                    <CardList goods={cards} handleProductLike={handleProductLike} currentUser={currentUser}/>
                </>
            }
            <Sort />
            <CardList goods={cards} handleProductLike={handleProductLike} currentUser={currentUser}/>
        </>
    )
}