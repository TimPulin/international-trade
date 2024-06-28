import styles from './button.module.css';

type ButtonBasePropsType = {
  text?: string;
  children?: React.ReactNode;
  onClick: (arg: any) => void;
  ariaLabel?: string;
  additionalClass?: string;
};

/**
 * ButtonBase component.
 *
 * @param {ButtonBasePropsType} props - Component props.
 * @param {string} [props.text] - Text to be displayed in the button.
 * @param {React.ReactNode} [props.children] - Children to be rendered inside the button.
 * @param {(arg: any) => void} props.onClick - Function to be called when the button is clicked.
 * @param {string} [props.ariaLabel] - ARIA label for the button.
 * @param {string} [props.additionalClass] - Additional CSS class for the button.
 * @returns {JSX.Element} The rendered ButtonBase component.
 */
export default function ButtonBase(props: ButtonBasePropsType): JSX.Element {
  // Destructure props
  const { text = '', children, onClick, ariaLabel, additionalClass } = props;

  // Render the button
  return (
    <button
      aria-label={ariaLabel} // Set ARIA label for accessibility
      onClick={onClick} // Set click event handler
      className={`${styles.button} ${additionalClass ? additionalClass : ''}`} // Set CSS class
    >
      {children} {/* Render children */}
      {text} {/* Render text */}
    </button>
  );
}
