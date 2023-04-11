import { Logo } from "../logo";
import s from './styles.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className="container footer__wrapper">
        <Logo />          
      </div>
    </footer>
  );
}


