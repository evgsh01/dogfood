import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Product from '../../components/product';
import { isLiked } from '../../utils/products';

import s from './styles.module.css';
import { Spinner } from '../../components/spinner';



const ID_PRODUCT = '622c77e877d63f6e70967d22';

export const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleProductLike(product) {
        const like = isLiked(product.likes, currentUser._id);
        api.changeLikeProductStatus(product._id, like)
            .then((updateCard) => {
                setProduct(updateCard);
            })
    }

    useEffect(() => {
        setIsLoading(true);
        api.getInfoProduct(ID_PRODUCT)
            .then(([productData, userData]) => {
                setCurrentUser(userData);
                setProduct(productData);
            })
            .catch(() => {
                console.log('Ошибка на стороне сервера');
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
                : <Product {...product} currentUser={currentUser} onProductLike={handleProductLike}/>
            }
        </>
    )
}