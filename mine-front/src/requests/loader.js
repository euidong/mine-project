import { useEffect, useState } from 'react';

const useLoading = (axios, arg) => {
  const [record, setRecord] = useState('loading...');
  useEffect(() => {
    const getData = async () => {
      setRecord(await axios(arg));
    }
    getData();
    
  },[axios, arg]);

  return record;
}

export default useLoading;