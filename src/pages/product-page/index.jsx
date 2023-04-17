import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';

import { CardsContext } from '../../contexts/card-context';
import api from '../../utils/api';
import Product from '../../components/product';
import { Spinner } from '../../components/spinner';
import { NotFound } from '../../components/not-found';
import { useApi } from '../../hooks/useApi';

export const ProductPage = () => {
    const { productID } = useParams()

    const handleGetProduct = useCallback(() => api.getProductById(productID), [productID]) ;
    const { data: product, loading: isLoading, error: errorState, setData: setProduct} = useApi(handleGetProduct);
    
    const {handleLike} = useContext(CardsContext);    

    function handleProductLike(product) {
        handleLike(product).then(updateCard => {
            setProduct(updateCard);
        });
    }

    return (
        <>
            {
                isLoading 
                ? <Spinner/>
                : !errorState && <Product {...product} onProductLike={handleProductLike}/>
            }

            {!isLoading && errorState && <NotFound title="Товар не найден"/>}
        </>
    )
}