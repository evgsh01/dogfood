import { useContext } from "react"

import { CardsContext } from "../../contexts/card-context"
import { Spinner } from "../../components/spinner";
import { CardList } from "../../components/card-list";
import { ContentHeader } from "../../components/content-header";
 
export function FavoritesPage () {
    const { favorites: goods, isLoading } = useContext(CardsContext);

    return (
        <>
            {
                isLoading 
                ? <Spinner />
                : 
                <>
                    <ContentHeader title='Избранное' textButton="Назад"/>
                    <CardList goods={goods}/>
                </>
            }
        </>
    )
}