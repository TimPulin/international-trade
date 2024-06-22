import styles from './button.module.css';

type ButtonBasePropsType = {
  text?: string;
  children?: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
  additionalClass?: string;
};

export default function ButtonBase(props: ButtonBasePropsType) {
  const { text = '', children, onClick, ariaLabel, additionalClass } = props;
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${styles.button} ${additionalClass}`}
    >
      {children}
      {text}
    </button>
  );
}
