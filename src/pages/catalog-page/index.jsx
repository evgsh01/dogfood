import { useContext } from 'react';

import { Sort } from '../../components/sort';
import { CardList } from '../../components/card-list';
import { CardsContext } from '../../contexts/card-context';
import { ContentHeader } from '../../components/content-header';
import { TABS } from '../../utils/constants';
 
export function CatalogPage () {
    const { cards: goods } = useContext(CardsContext);

    return (
        <>
            <ContentHeader title='Каталог' textButton="Главная" to='/'/>
            <Sort tabs={TABS} />
            <CardList goods={goods}/>
        </>
    )
}