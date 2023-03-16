import { useState, useEffect } from 'react';
import { Header } from '../header';
import { Logo } from '../logo';
import { Search } from '../search';
import { Sort } from '../sort';
import { CardList } from '../card-list';
import { Footer } from '../footer';
import './styles.css';
import { dataCard } from '../../data';


export function App() {

  const [cards, setCards] = useState(dataCard);
  const [searchQuery, setSearchQuery] = useState('');

  function handleRequest () {
    const filterCards = dataCard.filter(item => item.name.includes(searchQuery));
    setCards(filterCards);
  }

  function hadleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput);
  }

/*   useEffect(() => {
    handleRequest();
  }, [searchQuery]); */

  return (
    <>
      <Header>
        <Logo/>
        <Search onSubmit={hadleFormSubmit} onChange={handleInputChange}/>
      </Header>
      <main className="content container">
        <Sort/>
        <CardList goods={cards}/>
      </main>
      <Footer/>
    </>
  );
}


