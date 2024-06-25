import { useState } from 'react';
import { findPlace } from '@/api/server-connections';

import { Button, Select } from 'antd';
import { useFormik } from 'formik';
import selectStyles from './select.module.css';
import formStyles from './form.module.css';

import { debounce } from '@/utils/debounce';
import { IPlace } from '@/types/place-type';
import { selectActiveUniqueId } from '@/store/selectors';
import { Units } from '@/types/units-enum';

export type OptionType = {
  label: string;
  value: string;
};

type OptionSelectType = OptionType | OptionType[];

type LocationFormType = {
  onSubmit: (activeUniqueId: number, option: OptionType, units: Units) => void;
};

const unitOptions = [
  { label: 'Цельсий', value: Units.METRIC },
  { label: 'Фаренгейт', value: Units.US },
];

const formInitialValues = {
  city: { label: '', value: '' },
  units: unitOptions[0].value,
};

export default function LocationForm(props: LocationFormType) {
  const { onSubmit } = props;
  const activeUniqueId = selectActiveUniqueId();

  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit: ({ city, units }) => {
      console.log('formik', city, units);

      if (activeUniqueId) onSubmit(activeUniqueId, city, units);
    },
  });

  const [options, setOptions] = useState<IPlace[]>([]);

  const onCityChange = (value: string, option: OptionSelectType) => {
    let label = '';
    if (Array.isArray(option)) {
      label = option[0].label;
    } else {
      label = option.label;
    }
    formik.handleChange({ target: { name: 'city', value: { label, value } } });
  };

  const onSearch = async (value: string) => {
    try {
      const result = await findPlace(value);
      setOptions(result.data.filter((item) => item.name.toLowerCase() === item.place_id));
    } catch (error) {
      console.log(error);
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
    <form className={formStyles.form} onSubmit={formik.handleSubmit}>
      <Select
        options={makeOptionsList(options)}
        showSearch
        placeholder="Город"
        optionFilterProp="label"
        onChange={(value, option) => onCityChange(value, option)}
        onSearch={debounce(onSearch, 400)}
        filterOption={false}
        className={selectStyles.select}
      />
      <Select
        options={unitOptions}
        defaultValue={unitOptions[0].value}
        placeholder="Единицы измерения"
        className={selectStyles.select}
        onChange={(value) => formik.handleChange({ target: { name: 'units', value: value } })}
      />

      <Button htmlType="submit">Показать погоду</Button>
    </form>
  );
}
