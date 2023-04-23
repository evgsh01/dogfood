import { Link } from 'react-router-dom';

import { PREV_PAGE } from '../../utils/constants';

import s from './styles.module.css';

export function ContentHeader({title, children, to, textButton}) {
    
    return (
        <>
            <Link className={s.buttonBack} to={to || PREV_PAGE}>{textButton}</Link>
            <h1 className={s.title}>{title}</h1>
            {children}
        </>
    );
}