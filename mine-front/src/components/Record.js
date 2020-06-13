import React from 'react';
import getAllRecord from '../requests/record/getAllRecord';
import useLoading from '../requests/loader';

function Record(props) {
  const record = useLoading(getAllRecord, props);
  return (
      <>
          <div className={'Record'}>
              <h1> Record </h1>
              <ol style={{paddingLeft:"0px"}}>
                  {record}
              </ol>
          </div>
      </>
  );
}

export default Record;