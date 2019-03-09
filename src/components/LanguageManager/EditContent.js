import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

class EditContent extends Component {
  constructor() {
    super();

    this.state = {
      viewContent: [],
      errorMessage: '',
    }
  }

  componentDidUpdate(prevProps) {
    const { viewContent } = this.props;
    if (viewContent !== prevProps.viewContent) {
      this.setState({ viewContent: viewContent });
    }
  }

  setErrorMessage(text) {
    this.setState({
      errorMessage: text
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { viewContent } = this.state;
    // console.log(viewContent);
    this.props.handleSubmit(viewContent)
      .then(this.handleClose.bind(this))
      .catch((err) => { this.setErrorMessage(err) });
  }

  handleClose() {
    this.setState({
      viewContent: [],
      errorMessage: '',
    });
    this.props.handleClose();
  }

  handleChange(e, path) {
    let oldState = { ...this.state };
    const state = _.set(oldState, path, e.target.value);
    this.setState(state);
  }

  getFormInputs(inputs) {
    return inputs.map(
      ({ name, id, path, value }, i) => {
        return (
          <FormControl
            key={`${id}-${i}-FormControl`}
            margin="normal"
            fullWidth
          >
            <InputLabel
              key={`${id}-${i}-label`}
              htmlFor="role"
            >
              {name}
            </InputLabel>
            <Input
              id={id}
              key={`${id}-${i}`}
              path={path}
              value={value}
              onChange={(e) => this.handleChange(e, path)}
            />
          </FormControl>
        );
      }
    )
  }

  getInputObjs(subtitleIndex) {
    const { viewContent } = this.state;
    const contentObj = viewContent.find(
      item => item.LANGUAGE_ID === subtitleIndex+1);
    return [
      {
        name: 'Tooltip',
        id: `tooltip_${!!subtitleIndex ? 'fr':'eng'}`,
        path: ['viewContent', subtitleIndex, 'TOOLTIP'],
        value: contentObj.TOOLTIP
      },
      {
        name: 'Content',
        id: `name_${!!subtitleIndex ? 'fr':'eng'}`,
        path: ['viewContent', subtitleIndex, 'NAME'],
        value: contentObj.NAME
      }
    ];
  }

  getFormElements(subtitles) {
    const { viewContent } = this.state;
    if (viewContent.length) {
      return subtitles.map(
        (subtitle, subtitleIndex) => {
          const inputObjs = this.getInputObjs(subtitleIndex);
          const formInputs = this.getFormInputs(inputObjs);
          return (
            <Fragment key={`${subtitleIndex}-fragment`}>
              <Typography key={`${subtitleIndex}-heading`} variant="subtitle2">
                {subtitle}
              </Typography>
              {formInputs}
            </Fragment>
          )
        }
      );
    }
  }

  render() {
    const { open } = this.props;

    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Content</DialogTitle>
          <DialogContent>
            <form
              style={{ minWidth: 400 }}
              onSubmit={this.handleSubmit.bind(this)}
            >
              {this.getFormElements(['English', 'French'])}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit.bind(this)} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditContent.propTypes = {
  viewContent: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditContent;
