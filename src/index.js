import React from 'react';
import ReactDOM from 'react-dom/client';

/* import logoPngSrc from './images/ReactLogo.png'
import {ReactComponent as Logo} from './images/logo.svg' */
import { App } from './components/app';
import './style.css';



/* const AppList = () => {
  const item = ['Мой первый компонент', 'Мой второй компонент'];
  return (
    <ul>
      {item.map((item, index) => {
        return <li key={index}>{item}</li>
      })}
    </ul>
  );
}

const AppInput = ({placeholder, label, type}) => {
  return (
    <label className='label'>
      {label}
      <input placeholder={placeholder} type={type}/>
    </label>
    
  );
}

const AppHeader = ({title, children}) => {
  return (
    <div>
      {children}
      {title && <h1 className='header-title'><span>{title}</span></h1>}
    </div>
  );
}

const App = () => {
  return (
    <>
      <AppHeader title="Hello, World!">
        <Logo/>
        <img className='image' src={logoPngSrc}/>
      </AppHeader>
      <AppHeader title="Hello, NEW World!"/>
      <AppList/>
      <AppInput placeholder='Введите ваше имя' label="Имя" type='text'/>
      <AppInput placeholder='Введите пароль' label="Пароль" type='password'/>
    </>
  );
} */

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App/>);