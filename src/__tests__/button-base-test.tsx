import { ReactTestRenderer, create } from 'react-test-renderer';
import ButtonBase from '../components/button/ButtonBase';

describe('ButtonBase', () => {
  let root: ReactTestRenderer;
  let onClickMock: jest.Mock;

  beforeEach(() => {
    onClickMock = jest.fn();
    root = create(
      <ButtonBase
        text="text-test"
        onClick={onClickMock}
        ariaLabel="aria-label-test"
        additionalClass="additional"
      >
        <div>Children</div>
      </ButtonBase>
    );
  });

  test('button get correct text', () => {
    const tree = root.toTree();
    expect(tree?.props.text).toBe('text-test');
  });

  test('button get correct onClick function', () => {
    const tree = root.toTree();
    expect(typeof tree?.props.onClick).toBe('function');
  });

  test('button click triggers onClick function', () => {
    const buttonInstance = root.root.findByType('button');
    buttonInstance.props.onClick();
    expect(onClickMock).toHaveBeenCalled();
  });

  test('button get correct aria-label', () => {
    const tree = root.toTree();
    expect(tree?.props.ariaLabel).toBe('aria-label-test');
  });

  test('button get correct additional class', () => {
    const tree = root.toTree();
    expect(tree?.props.additionalClass).toBe('additional');
  });
});
