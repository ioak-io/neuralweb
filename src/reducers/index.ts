import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import UserReducer from './UserReducer';
import RoleReducer from './RoleReducer';
import SpaceReducer from './SpaceReducer';
import CompanyReducer from './CompanyReducer';
import FolderReducer from './FolderReducer';
import NoteReducer from './NoteReducer';
import TagReducer from './TagReducer';

export default combineReducers({
  authorization: AuthReducer,
  profile: ProfileReducer,
  user: UserReducer,
  role: RoleReducer,
  company: CompanyReducer,
  space: SpaceReducer,
  folder: FolderReducer,
  note: NoteReducer,
  tag: TagReducer,
});
