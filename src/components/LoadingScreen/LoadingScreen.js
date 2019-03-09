import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import logo from '../../assets/plexus_logo_dark.jpg';
import { ROOT } from '../../constants/Routes';
import './LoadingScreen.css';

const LoadingScreen = ({ pageFound }) => (
  <div className='loadScreen'>
    <img
      src={logo}
      style={{
        position: 'relative',
        top: '30px'
      }}
      alt='Red Apple Logo'
    />
    {pageFound &&
      <div style={{ marginTop: '60px' }}>
        <CircularProgress color="secondary" />
      </div>
    }
    {!pageFound &&
      <Fragment>
        <div className='pageNotFoundText'> 404 - page not found </div>
        <Link to={ROOT} className="return-to-site">Return to Site</Link>
      </Fragment>
    }
  </div>
)

LoadingScreen.defaultProps = {
  pageFound: false
};

LoadingScreen.propTypes = {
  pageFound: PropTypes.bool
};

export default LoadingScreen;
