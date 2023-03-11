import logoSrc from "../logo/assets/logo.svg";
import './styles.css';

export function Footer() {
  return (
    <footer className='footer'>
      <div className="container footer__wrapper">
        <a href="/" className="logo">
          <img src={logoSrc} alt='Логотип компании' className="logo__pic"/>
        </a>
      </div>
    </footer>
  );
}


