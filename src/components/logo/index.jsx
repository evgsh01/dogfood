import cn from 'classnames';
import { Link } from 'react-router-dom';

import logoSrc from "./assets/logo.svg";
import logoSrcSmall from "./assets/logo_small.svg";

import './styles.css';

export function Logo({ className, href, ...props }) {
  const hrefValue = href ? href : null;
  return (
    hrefValue
    ? <Link to={{ pathname: hrefValue }} className={cn("logo", {className: !!className})}>
        <img src={logoSrc} alt='Логотип компании' className="logo__pic" />
        <img src={logoSrcSmall} alt='Логотип компании' className="logo__pic logo__pic-small" />
      </Link>
    : <span className={`${className}: logo`} {...props}>
        <img src={logoSrc} alt='Логотип компании' className="logo__pic" />
        <img src={logoSrcSmall} alt='Логотип компании' className="logo__pic logo__pic-small" />
    </span>
  );
}


