import React from 'react'
import {LinearProgress} from '@material-ui/core';


function LoadingScreen() {
  return (
    <div>
      <LinearProgress />
      <center><h3>Loading...</h3></center>
    </div>
  )
}

export default LoadingScreen;
