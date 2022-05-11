import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './Permissions.scss';
import { newId } from '../../../events/MessageService';
import { getUserInvite, sendUserInvite } from './service';
import Topbar from '../../../components/Topbar';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const Permissions = (props: Props) => {
  const history = useHistory();
  const authorization = useSelector((state: any) => state.authorization);
  const users = useSelector((state: any) => state.user.items);
  const [userInviteList, setUserInviteList] = useState<any[]>([]);
  const [userMap, setUserMap] = useState<any>({});
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState({ email: '' });

  useEffect(() => {
    const _userMap: any = {};
    users.forEach((item: any) => {
      _userMap[item._id] = item;
    });
    setUserMap(_userMap);
  }, [users]);

  useEffect(() => {
    if (authorization.isAuth) {
      getUserInvite(props.space, authorization).then((response: any) => {
        setUserInviteList([...response]);
      });
    }
  }, [authorization]);

  const handleChange = (detail: any) => {
    setState({ ...state, [detail.name]: detail.value });
  };

  const addUser = (event: any) => {
    if (event.isValid) {
      sendUserInvite(props.space, state, authorization).then(() => {
        getUserInvite(props.space, authorization).then((response: any) => {
          setUserInviteList([...response]);
        });
      });
    }
  };

  const deleteUser = (userId: string) => {
    console.log('delete user', userId);
  };

  return (
    <div>
      <Topbar title="User administration" />
      <div className="main-section">
        <div className="permissions page-width content-section">
          <form onSubmit={addUser}>
            <div className="permissions__form">
              <input
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Invite an user by e-mail"
                autoFocus
                required
              />
              <button onClick={addUser}>Invite user</button>
            </div>
          </form>
          <div className="permissions__list">
            <table>
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th className="action-column"> </th>
                </tr>
              </thead>
              <tbody>
                {userInviteList.map((user: any) => (
                  <tr key={user._id}>
                    <td>{userMap[user.userId]?.given_name}</td>
                    <td>{userMap[user.userId]?.family_name}</td>
                    <td>{user.email}</td>
                    <td>{user.accepted ? 'Active' : 'Invited'}</td>
                    <td className="action-column">
                      <button
                        className="permissions__list__button button"
                        onClick={() => deleteUser(user._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
