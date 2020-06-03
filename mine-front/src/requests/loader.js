import { useEffect, useState } from 'react';

const useLoading = (axios) => {
  const [record, setRecord] = useState('loading...');

  useEffect(() => {
    const getData = async () => {
      setRecord(await axios());
    }
    getData();
    
  },[axios]);

  return record;
}

export default useLoading;