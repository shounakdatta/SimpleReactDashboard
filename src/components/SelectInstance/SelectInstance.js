import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { styles } from './SelectInstanceStyles'

class SelectInstance extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      columns: []
    }
  }

  render() {
    const { data, columns } = this.props;
    const options = {
      filterType: 'dropdown',
      download: false,
      print: false,
      viewColumns: false,
      filter: false,
      selectableRows: false
    }
    return (
      <MUIDataTable
        title={"Plexus Instance Manager"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

SelectInstance.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default withStyles(styles)(SelectInstance);
