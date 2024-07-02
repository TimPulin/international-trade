import { ReactTestRenderer, create } from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import ForecastItem from '../components/forecast/ForecastItem';

import { Units } from '@/types/units-enum';
import { ISituationOnDate } from '@/types/meteo-type';

const mockedSetMainWidgetData = jest.fn();

jest.mock('@/contexts/MeteoCardContext', () => ({
  useMeteoCard: () => ({
    setMainWidgetData: mockedSetMainWidgetData,
  }),
}));

const itemMocked: ISituationOnDate = {
  date: '2022-01-01',
  icon: 1,
  temperature: 10,
  wind: { speed: 10, dir: 'N', angle: 45 },
  precipitation: { total: 0.0, type: 'none' },
  weather: '',
  summary: '',
  cloud_cover: { total: 3 },
};

describe('ForecastItem', () => {
  let root: ReactTestRenderer;

  beforeEach(() => {
    root = create(<ForecastItem item={itemMocked} units={Units.METRIC} />);
  });

  test('forecastItem gets correct prop unit', () => {
    const tree = root.toTree();
    expect(tree?.props.units).toBe(Units.METRIC);
  });

  test('renders the component with the correct Units.METRIC', async () => {
    render(<ForecastItem item={itemMocked} units={Units.METRIC} />);
    const pattern = /°C/;
    expect(screen.queryByText(pattern)).toBeInTheDocument();
  });

  test('renders the component with the correct Units.US', async () => {
    render(<ForecastItem item={itemMocked} units={Units.US} />);
    const pattern = /°F/;
    expect(screen.queryByText(pattern)).toBeInTheDocument();
  });

  test('calls setMainWidgetData when the button is clicked', () => {
    render(<ForecastItem item={itemMocked} units={Units.METRIC} />);
    const pattern = /°C/;
    const button = screen.queryByText(pattern);
    if (button) fireEvent.click(button);
    expect(mockedSetMainWidgetData).toHaveBeenCalledWith({
      date: '2022-01-01',
      iconNumber: 1,
      units: Units.METRIC,
      temperature: 10,
      wind: { speed: 10, dir: 'N', angle: 45 },
      precipitation: { total: 0.0, type: 'none' },
    });
  });
});
