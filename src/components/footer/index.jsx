import logoSrc from "../logo/assets/logo.svg";
import s from './styles.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className="container footer__wrapper">
        <a href="/" className="logo">
          <img src={logoSrc} alt='Логотип компании' className="logo__pic"/>
        </a>
      </div>
    </footer>
  );
}


