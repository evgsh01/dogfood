import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../header';
import { Logo } from '../logo';
import { Search } from '../search';
import { Footer } from '../footer';
import api from '../../utils/api';
import { useDebounce } from '../../hooks/useDebounce';
import { isLiked } from '../../utils/products';
import { CatalogPage } from '../../pages/catalog-page';
import { ProductPage } from '../../pages/product-page';
import FaqPage from '../../pages/faq-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { UserContext } from '../../contexts/current-user-context';
import { CardsContext } from '../../contexts/card-context';
import { FavoritesPage } from '../../pages/favorite-page';

import './styles.css';


export function App() {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debounceSearchQuery = useDebounce(searchQuery, 300);

  function handleRequest () {
    api.search(debounceSearchQuery)
      .then((dataSearch) => setCards(dataSearch))
  }

  function hadleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput);
  }

  function handleUserUpdate (dataUserUpdate) {
    api.setUserInfo(dataUserUpdate)
      .then((updateUserFromServer) => {
        setCurrentUser(updateUserFromServer)
      })
  }

  function handleProductLike(product) {
    const like = isLiked(product.likes, currentUser._id);
    return api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState;
        })

        setCards(newProducts);

        if (!like) {
          setFavorites(prevState => [...prevState, updateCard]);
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id));
        }

        return updateCard;
      })
  }

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  useEffect(() => {
    setIsLoading(true);
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData) // выполнится асинхронно
        setCards(productsData.products) // выполнится асинхронно

        const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userInfoData._id)) // синхронная операция
        setFavorites(favoriteProducts) // выполнится асинхронно
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) }) 
  }, [])

  return (
    <CardsContext.Provider value={{ cards, favorites, handleLike: handleProductLike}}>
      <UserContext.Provider value={{currentUser, onUpdateUser:handleUserUpdate}}>
        <Header user={currentUser}>
          
          <Routes>
            <Route path='/' element={
              <>
                <Logo />
                <Search onSubmit={hadleFormSubmit} onChange={handleInputChange}/>
              </>
            }/>
            <Route path='*' element={<Logo href='/'/>}/>
          </Routes>        
        </Header>
        <main className="content container">
          <Routes>
            <Route path='/' element={<CatalogPage isLoading={isLoading}/>}/>
            <Route path='/favorites' element={<FavoritesPage />}/>
            <Route path='/faq' element={<FaqPage />}/>
            <Route path='/product/:productID' element={<ProductPage />}/>
            <Route path='*' element={<NotFoundPage />}/>
          </Routes>
        </main>
        <Footer/>
      </UserContext.Provider>
    </CardsContext.Provider> 
  );
}


