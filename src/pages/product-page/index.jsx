import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CardsContext } from '../../contexts/card-context';

import api from '../../utils/api';
import Product from '../../components/product';
import { isLiked } from '../../utils/products';
import { Spinner } from '../../components/spinner';
import { NotFound } from '../../components/not-found';

import s from './styles.module.css';

export const ProductPage = () => {
    const { productID } = useParams()

    const [product, setProduct] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);
    const {handleLike} = useContext(CardsContext);

    function handleProductLike(product) {
        handleLike(product).then(updateCard => {
            setProduct(updateCard);
        });
    }

    useEffect(() => {
        setIsLoading(true);
        api.getInfoProduct(productID)
            .then(([productData, userData]) => {
                setCurrentUser(userData);
                setProduct(productData);
            })
            .catch((err) => {
                setErrorState(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

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