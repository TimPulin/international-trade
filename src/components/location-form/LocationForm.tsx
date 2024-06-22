import { useRef, useState } from 'react';
import { findPlace } from '@/api/server-connections';

import { Button, Select } from 'antd';
import selectStyles from './select.module.css';
import formStyles from './form.module.css';

import { IPlace } from '@/types/place-type';
import { debounce } from '@/utils/debounce';

type LocationFormType = {
  onSubmit: (city: string) => void;
};

export default function LocationForm(props: LocationFormType) {
  const { onSubmit } = props;

  const [options, setOptions] = useState<IPlace[]>([]);
  const cityRef = useRef<string | null>(null);

  const onChange = (value: string) => {
    cityRef.current = value;
  };

  const onSearch = async (value: string) => {
    try {
      const result = await findPlace(value);
      setOptions(result.data.filter((item) => item.name.toLowerCase() === item.place_id));
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitLocal = (event: React.FormEvent) => {
    event.preventDefault();

    if (cityRef.current) {
      onSubmit(cityRef.current);
    }
  };

  function makeOptionsList(data: IPlace[]) {
    return [
      ...data.map(({ name, country, place_id }) => ({
        label: `${name}, ${country}`,
        value: place_id,
      })),
      { label: '', value: '' },
    ];
  }

  return (
    <form className={formStyles.form} onSubmit={onSubmitLocal}>
      <Select
        options={makeOptionsList(options)}
        showSearch
        placeholder="Выберите город"
        optionFilterProp="label"
        onChange={onChange}
        onSearch={debounce(onSearch, 500)}
        filterOption={false}
        className={selectStyles.select}
      />

      <Button htmlType="submit">Показать погоду</Button>
    </form>
  );
}
