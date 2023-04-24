import cn from 'classnames';

import { forwardRef } from 'react';

import s from './styles.module.css';

const FormInput = forwardRef(({ typeTag, ...props }, ref) => {
    return (
        typeTag === 'textarea'
            ? <textarea ref={ref} className={cn(s.input, s.textarea)} {...props} />
            : <input ref={ref} className={s.input}  {...props} />
    );
})

export default FormInput;