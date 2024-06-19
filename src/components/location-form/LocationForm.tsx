import { useEffect, useState } from 'react';
import { findPlace } from '@/api/server-connections';

import { Button, Select } from 'antd';

import { IPlace } from '@/types/place-type';
import { debounce } from '@/utils/debounce';

export default function LocationForm() {
  const [options, setOptions] = useState<IPlace[]>([]);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = async (value: string) => {
    console.log(`selected ${value}`);
    try {
      const result = await findPlace(value);
      setOptions(result.data.filter((item) => item.name.toLowerCase() === item.place_id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(options);
  }, [options]);

  return (
    <form>
      <Select
        options={options.map(({ name, place_id }) => ({ label: name, value: place_id }))}
        showSearch
        placeholder="Select a person"
        optionFilterProp="label"
        onChange={onChange}
        onSearch={debounce(onSearch, 500)}
        filterOption={false}
      />

      <Button htmlType="submit">Search</Button>
    </form>
  );
}
