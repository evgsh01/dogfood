import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

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
import Login from '../login';
import { TABS_ID } from '../../utils/constants';
import Modal from '../modal';
import Register from '../register';
import ResetPassword from '../reset-password';

import './styles.css';

export function App() {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSort, setCurrentSort] = useState('');

  const debounceSearchQuery = useDebounce(searchQuery, 300);

  const navigate = useNavigate();

  const location = useLocation();

  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  const onCloseRoutingModal = () => {
    navigate(initialPath || '/', { replace: true })
  }

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

  function sortedData(currentSort) {
    switch (currentSort) {
      case (TABS_ID.CHEAP): setCards(cards.sort((a, b) => a.price - b.price)); break;
      case (TABS_ID.LOW): setCards(cards.sort((a, b) => b.price - a.price)); break;
      case (TABS_ID.DISCOUNT): setCards(cards.sort((a, b) => b.discount - a.discount)); break;
      default: setCards(cards.sort((a, b) => a.price - b.price));
    }
  }

  const cbSubmitFormLoginRegister = (dataForm) => {
    console.log('cbSubmitFormLoginRegister', dataForm);
  }

  const cbSubmitFormLogin = (dataForm) => {
    console.log('cbSubmitFormLogin', dataForm);
  }

  const cbSubmitFormResetPassword = (dataForm) => {
    console.log('cbSubmitFormResetPassword', dataForm);
  }

  const handleClickButtonLogin = (e) => {
    e.preventDefault();
    navigate('/login', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  }

  const handleClickButtonReset = (e) => {
    e.preventDefault();
    navigate('/reset-password', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  }

  const handleClickButtonRegister = (e) => {
    e.preventDefault();
    navigate('/register', { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })
  }

  const handleClickButtonResetNotModal = (e) => {
    e.preventDefault();
    navigate('/reset-password')
  }

  const handleClickButtonRegisterNotModal = (e) => {
    e.preventDefault();
    navigate('/register')
  }

  const handleClickButtonLoginNotModal = (e) => {
    e.preventDefault();
    navigate('/login')
  }

  return (
    <CardsContext.Provider value={{ cards, favorites, handleLike: handleProductLike, isLoading, onSortData: sortedData, currentSort, setCurrentSort }}>
      <UserContext.Provider value={{currentUser, onUpdateUser:handleUserUpdate}}>
        <Header>          
          <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
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
          <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
            <Route path='/' element={<CatalogPage isLoading={isLoading}/>}/>
            <Route path='/favorites' element={<FavoritesPage />}/>
            <Route path='/faq' element={<FaqPage />}/>
            <Route path='/product/:productID' element={<ProductPage />}/>

            <Route path='/login' element={
                <Login onSubmit={cbSubmitFormLogin} onNavigateRegister={handleClickButtonRegisterNotModal} onNavigateReset={handleClickButtonResetNotModal} />
              } />
            <Route path='/register' element={
              <Register onSubmit={cbSubmitFormLoginRegister} onNavigateLogin={handleClickButtonLoginNotModal} />
            } />
            <Route path='/reset-password' element={
              <ResetPassword onSubmit={cbSubmitFormResetPassword} />
            } />

            <Route path='*' element={<NotFoundPage />}/>
          </Routes>
        </main>
        <Footer/>
        {backgroundLocation && <Routes>
          <Route path='/login' element={
            <Modal isOpen onClose={onCloseRoutingModal}>
              <Login onSubmit={cbSubmitFormLogin} onNavigateRegister={handleClickButtonRegister} onNavigateReset={handleClickButtonReset} />
            </Modal>
          } />
          <Route path='/register' element={
            <Modal isOpen onClose={onCloseRoutingModal}>
              <Register onSubmit={cbSubmitFormLoginRegister} onNavigateLogin={handleClickButtonLogin} />
            </Modal>
          } />
          <Route path='/reset-password' element={
            <Modal isOpen onClose={onCloseRoutingModal}>
              <ResetPassword onSubmit={cbSubmitFormResetPassword} />
            </Modal>
          } />
        </Routes>}
      </UserContext.Provider>
    </CardsContext.Provider> 
  );
}


