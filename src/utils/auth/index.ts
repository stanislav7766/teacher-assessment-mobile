import {defaultUniversity} from '@constants/university';
import {defaultUser} from '@constants/user';
import {setCurrent} from '@utils/storage/current';
import {setToken} from '@utils/storage/tokens';
import {ISignInParams, ISignOutParams} from './types';

export const signOut = ({onSignOut}: ISignOutParams = {}) => {
  Promise.all([
    setToken(false, 'refresh'),
    setToken('', 'access'),
    setCurrent(defaultUser, 'user'),
    setCurrent(defaultUniversity, 'university'),
  ])
    .then(() => {})
    .catch(_err => {});
  onSignOut && onSignOut();
};

export const signIn = ({onSignIn, access, refresh, user, university}: ISignInParams) => {
  Promise.all([
    setToken(refresh, 'refresh'),
    setToken(access, 'access'),
    setCurrent(user, 'user'),
    setCurrent(university, 'university'),
  ])
    .then(() => {})
    .catch(_err => {});
  onSignIn && onSignIn();
};
