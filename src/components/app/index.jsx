import { useState, useEffect } from 'react';
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
import './styles.css';



export function App() {
  const [cards, setCards] = useState([]);
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
    api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState;
        })

        setCards(newProducts);
      })
  }

  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  useEffect(() => {
    setIsLoading(true);
    api.getAllInfo()
      .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData)
        setCards(productsData.products)
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) }) 
  }, [])

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUserUpdate}>
        <Logo/>
        <Search onSubmit={hadleFormSubmit} onChange={handleInputChange}/>
      </Header>
      <main className="content container">
        <FaqPage />
        <ProductPage />
        <CatalogPage cards={cards} handleProductLike={handleProductLike} currentUser={currentUser} isLoading={isLoading}/>
      </main>
      <Footer/>
    </>
  );
}


