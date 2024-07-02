import styles from './button.module.css';

type ButtonBasePropsType = {
  text?: string;
  children?: React.ReactNode;
  onClick: (arg: any) => void;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  additionalClass?: string;
};

/**
 * ButtonBase component.
 *
 * @param {string} [props.text]
 * @param {React.ReactNode} [props.children]
 * @param {(arg: any) => void} props.onClick
 * @param {string} [props.ariaLabel]
 * @param {boolean} [props.ariaExpanded]
 * @param {string} [props.additionalClass]
 * @returns {JSX.Element} The rendered ButtonBase component.
 */
export default function ButtonBase(props: ButtonBasePropsType): JSX.Element {
  // Destructure props
  const { text = '', children, onClick, ariaLabel, ariaExpanded, additionalClass } = props;

  // Render the button
  return (
    <button
      aria-label={ariaLabel} // Set ARIA label for accessibility
      aria-expanded={ariaExpanded ? ariaExpanded : false}
      onClick={onClick} // Set click event handler
      className={`${styles.button} ${additionalClass ? additionalClass : ''}`} // Set CSS class
    >
      {children} {/* Render children */}
      {text} {/* Render text */}
    </button>
  );
}
