import cn from 'classnames';
import { useState } from 'react';

import s from './styles.module.css';

function Accordion({ title, children }) {
    const [selected, setSelected] = useState(false);

    function toggleAccordionState() {
        setSelected(!selected);
    }

    return (
        <div className={cn(s.accordion, {[s.active] : selected})}>
            <button className={s.accordionButton} onClick={toggleAccordionState}>
                <p className={s.title}>{title}</p>
            </button>
            <div className={s.content}>
                <p className={s.text}>{children}</p>
            </div>
        </div>
    );
}

export default Accordion;