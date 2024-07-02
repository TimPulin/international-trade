import Forecast from '@/components/forecast/Forecast';
import { IHourly } from '@/types/meteo-type';
import { Units } from '@/types/units-enum';
import { render, screen } from '@testing-library/react';
import { ReactTestRenderer, create } from 'react-test-renderer';

const mockedSetMainWidgetData = jest.fn();
jest.mock('@/contexts/MeteoCardContext', () => ({
  useMeteoCard: () => ({
    setMainWidgetData: mockedSetMainWidgetData,
  }),
}));

const forecastMocked: IHourly = {
  data: [
    {
      date: '2022-01-01 0:0:0',
      icon: 1,
      temperature: 10,
      wind: { speed: 10, dir: 'N', angle: 45 },
      precipitation: { total: 0.0, type: 'none' },
      weather: '',
      summary: '',
      cloud_cover: { total: 3 },
    },
    {
      date: '2022-01-01 1:0:0',
      icon: 2,
      temperature: 11,
      wind: { speed: 11, dir: 'W', angle: 5 },
      precipitation: { total: 1.0, type: 'rain' },
      weather: '',
      summary: '',
      cloud_cover: { total: 3 },
    },
    {
      date: '2022-01-01 2:0:0',
      icon: 3,
      temperature: 13,
      wind: { speed: 13, dir: 'S', angle: 10 },
      precipitation: { total: 2.0, type: 'test' },
      weather: '',
      summary: '',
      cloud_cover: { total: 3 },
    },
  ],
};

describe('Forecast', () => {
  let root: ReactTestRenderer;
  beforeEach(() => {
    root = create(<Forecast forecast={forecastMocked} units={Units.METRIC} />);
  });

  test('Forecast get correct prop forecast', () => {
    const tree = root.toTree();
    expect(tree?.props.forecast).toBe(forecastMocked);
  });

  test('component get correct unit prop', () => {
    const tree = root.toTree();
    expect(tree?.props.units).toBe('metric');
  });

  test('component renders correct forecastItems list ', () => {
    const pattern = /°C/;
    render(<Forecast forecast={forecastMocked} units={Units.METRIC} />);
    const itemList = screen.queryAllByText(pattern);
    expect(itemList.length).toBeGreaterThan(0);
    itemList.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
