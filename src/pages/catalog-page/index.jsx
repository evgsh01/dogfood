import { useContext } from 'react';

import { Sort } from '../../components/sort';
import { CardList } from '../../components/card-list';
import { Spinner } from '../../components/spinner';
import { CardsContext } from '../../contexts/card-context';
 
export function CatalogPage ({ isLoading }) {
    const { cards: goods } = useContext(CardsContext);

    return (
        <>
            {
                isLoading 
                ? <Spinner />
                : <>
                    <Sort />
                    <CardList goods={goods}/>
                </>
            }
        </>
    )
}