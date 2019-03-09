import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingAnimation = () => {
  return (
    <div className="loading-wrapper">
      <CircularProgress color="secondary" />
    </div>
  );
}

export default LoadingAnimation;
