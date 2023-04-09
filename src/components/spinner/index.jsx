import s from './styles.module.css';

export function Spinner() {
  return (
    <div class={s.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
  );
}


