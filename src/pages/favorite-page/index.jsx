import { useContext } from "react"

import { CardsContext } from "../../contexts/card-context"
import { Spinner } from "../../components/spinner";
import { CardList } from "../../components/card-list";
 
export function FavoritesPage ({ isLoading }) {
    const { favorites: goods } = useContext(CardsContext);

    return (
        <>
            {
                isLoading 
                ? <Spinner />
                : <CardList goods={goods}/>
            }
        </>
    )
}