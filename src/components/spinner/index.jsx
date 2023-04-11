import s from './styles.module.css';

export function Spinner() {
  return (
    <div className={s.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
  );
}


