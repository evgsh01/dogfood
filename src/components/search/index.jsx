import { ReactComponent as CloseIcon } from './assets/ic-close-input.svg';
import { ReactComponent as SearchIcon } from './assets/ic-search.svg';

import './styles.css';

export function Search({onSubmit, onChange}) {
  return (
    <form className="search" onSubmit={onSubmit}>
      <input type="text" className="search__input" onChange={(e) => {onChange(e.target.value)}} placeholder="Поиск"/>
      <button className="search__btn">
        <SearchIcon/>
        <CloseIcon/>
      </button>
    </form>
  );
}


