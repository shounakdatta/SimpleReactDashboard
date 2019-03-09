import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { styles } from './RoleManagerStyles';

class RoleManager extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      columns: []
    }
  }

  render() {
    const { data, columns, options } = this.props;
    return (
      <MUIDataTable
        title={"Manage Roles"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

RoleManager.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoleManager);
