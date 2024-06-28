import { ReactTestRenderer, create } from 'react-test-renderer';
import ButtonBase from '../components/button/ButtonBase';

describe('ButtonBase', () => {
  let root: ReactTestRenderer;

  beforeEach(() => {
    root = create(<ButtonBase text="text-test" onClick={() => {}} />);
  });

  test('button get correct text', () => {
    const tree = root.toTree();
    expect(tree?.props.text).toBe('text-test');
  });
});
