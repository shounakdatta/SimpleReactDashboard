import _ from 'lodash';
import { fromJS } from 'immutable';
import {
  GET_ROLES,
  SAVE_ROLE,
  DELETE_ROLE,
  GET_LANG,
  EDIT_SCREEN,
  DELETE_SCREEN,
  EDIT_VIEW,
  DELETE_VIEW,
  EDIT_CONTENT,
  SAVE_LANG,
} from '../constants/ActionTypes';

const initialState = fromJS({
    roles: [],
    langViews: [],
    version: '',
});

export default (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case GET_ROLES:
      newState = newState.set('roles', _.get(action, 'payload', []));
      return newState;
    case SAVE_ROLE:
      let roleIndex = newState.get('roles')
        .findIndex(role => role.role_id === action.payload.role_id);
      let saveRoles = newState.get('roles');
      if (roleIndex === -1) {
        saveRoles.push(_.get(action, 'payload', {}));
      }
      else {
        saveRoles[roleIndex] = _.get(action, 'payload', {});
      }
      newState = newState.set('roles', saveRoles);
      return newState;
    case DELETE_ROLE:
      const deleteRoles = newState.get('roles')
        .filter((role) => role.role_id !== _.get(action, 'payload'));
      newState = newState.set('roles', deleteRoles);
      return newState;
    case GET_LANG:
      newState = newState.set(
        'langViews',
        _.get(action, ['payload', 'langViews'], [])
      );
      newState = newState.set(
        'version',
        _.get(action, ['payload', 'version'], '')
      );
      return newState;
    case EDIT_SCREEN:
      let editLangScreens = newState.get('langViews');
      const screenIndex = editLangScreens.findIndex(screen => screen.NAME
          === _.get(action, ['payload', 'oldScreenName']));

      if (
        screenIndex !== -1
        && _.get(action, ['payload', 'newScreenName'], false)
      ) {
        editLangScreens[screenIndex].NAME = _.get(
          action, ['payload', 'newScreenName']
        );
      }
      else if (_.get(action, ['payload', 'newScreenName'], false)) {
        const newScreen = {
          NAME: _.get(action, ['payload', 'newScreenName']),
          CONTENT: [
            {
              LABEL: 'undefined',
              CONTENT: [
                {
                  NAME: 'New Content',
                  TOOLTIP: 'New Content',
                  LANGUAGE_ID: 1,
                },
                {
                  NAME: 'New Content_trans',
                  TOOLTIP: 'New Content_trans',
                  LANGUAGE_ID: 2,
                }
              ]
            }
          ]
        }
        editLangScreens.push(newScreen);
      }

      newState = newState.set('langViews', editLangScreens);
      return newState;
    case DELETE_SCREEN:
      const deleteLangScreens = newState.get('langViews').filter(
        (screen) => {
          return screen.NAME !== _.get(action, 'payload', '');
        }
      );
      newState = newState.set('langViews', deleteLangScreens);
      return newState;
    case EDIT_VIEW:
      let editLangViews = newState.get('langViews');
      const screenViewIndex = editLangViews.findIndex(screen => screen.NAME
          === _.get(action, ['payload', 'selectedScreen']));
      const viewIndex = editLangViews[screenViewIndex].CONTENT
        .findIndex(view => view.LABEL
          === _.get(action, ['payload', 'oldViewName']));

      if (
        screenViewIndex !== -1
        && viewIndex !== -1
        && _.get(action, ['payload', 'newViewName'], false)
      ) {
        editLangViews[screenViewIndex].CONTENT[viewIndex].LABEL = _.get(
          action, ['payload', 'newViewName']
        );
      }
      else if (
        screenViewIndex !== -1
        && _.get(action, ['payload', 'newViewName'], false)
      ) {
        const newView = {
          LABEL: _.get(action, ['payload', 'newViewName']),
          CONTENT: [
            {
              NAME: 'New Content',
              TOOLTIP: 'New Content',
              LANGUAGE_ID: 1,
            },
            {
              NAME: 'New Content_trans',
              TOOLTIP: 'New Content_trans',
              LANGUAGE_ID: 2,
            }
          ]
        }
        editLangViews[screenViewIndex].CONTENT.push(newView);
      }
      newState = newState.set('langViews', editLangViews);
      return newState;
    case DELETE_VIEW:
      const deleteViewScreenName =  _.get(action, ['payload', 'screenName'], '');
      const deleteViewScreenIndex =  newState.get('langViews').findIndex(
        (screen) => screen.NAME === deleteViewScreenName);
      const undeletedLangScreens = newState.get('langViews');
      const deletedLangViews = undeletedLangScreens[deleteViewScreenIndex]
        .CONTENT.filter((view) => {
          return view.LABEL !== _.get(action, ['payload', 'viewName']);
        }
      );
      const deletedLangScreens = _.set(
        undeletedLangScreens,
        [deleteViewScreenIndex, 'CONTENT'],
        deletedLangViews
      );
      newState = newState.set('langViews', deletedLangScreens);
      return newState;
    case EDIT_CONTENT:
      const uneditedContentLangViews = newState.get('langViews');
      const editContentScreenName = _.get(action, ['payload', 'selectedScreen']);
      const editContentScreenIndex = uneditedContentLangViews.findIndex(screen =>
        screen.NAME === editContentScreenName
      );
      const editContentViewName = _.get(action, ['payload', 'selectedView']);
      const editContentViewIndex = uneditedContentLangViews[editContentScreenIndex]
        .CONTENT
        .findIndex(view =>
          view.NAME === editContentViewName
        );
      const viewContent = _.get(
        action,
        [
          'payload',
          'viewContent',
          [
            {
              NAME: 'New Content',
              TOOLTIP: 'New Content',
              LANGUAGE_ID: 1,
            },
            {
              NAME: 'New Content_trans',
              TOOLTIP: 'New Content_trans',
              LANGUAGE_ID: 2,
            }
          ]
        ]);
      const editedContentLangViews = _.set(
        uneditedContentLangViews,
        [editContentScreenIndex, 'CONTENT', editContentViewIndex, 'CONTENT'],
        viewContent
      );
      newState = newState.set('langViews', editedContentLangViews);
      return newState;
    case SAVE_LANG:
      newState = newState.set(
        'version',
        _.get(action, 'payload', '')
      );
      return newState;
    default:
      return state;
  }
}
