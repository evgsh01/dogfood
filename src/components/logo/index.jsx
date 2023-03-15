import './styles.css';
import logoSrc from "./assets/logo.svg";
import logoSrcSmall from "./assets/logo_small.svg";

export function Logo() {
  return (
    <a href="/" className="logo">
      <img src={logoSrc} alt='Логотип компании' className="logo__pic" />
      <img src={logoSrcSmall} alt='Логотип компании' className="logo__pic logo__pic-small" />
    </a>
  );
}


