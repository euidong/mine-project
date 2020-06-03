import React from 'react';
import axios from 'axios';

const getAllRecord = () => axios({
    url: process.env.REACT_APP_APISERVER + "/record/list",
    method: "get"
  })
  .then(res => {
    if (res.data.length === 0)
        return "🚩존재하지 않습니다.";
    else 
        return res.data.map(json => <li key={json.nickName}>
          {
            json.nickName + " " + 
            json.time + "초" + 
            json.width + " " + 
            json.height + " " +
            json.minePercent 
          } </li>); 
  })
  .catch(error => {
    return "연결이 불안정합니다.";
  });

export default getAllRecord;