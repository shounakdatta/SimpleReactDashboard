import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { styles } from './LanguageManagerStyles';

class LanguageManager extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      columns: []
    }
  }

  render() {
    const { title, data, columns, options } = this.props;
    return (
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

LanguageManager.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
};

export default withStyles(styles)(LanguageManager);
