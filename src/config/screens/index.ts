import Main from '@screens/main';
import Splash from '@screens/splash';
import SignIn from '@screens/sign-in';
import {TEACHER, STUDENT, LOCAL_ADMIN, ADMIN} from '@constants/roles';
import {IRole} from 'types/role';

const SHARED_SCREENS = {
  Initial: Splash,
};
const GUEST_SCREENS = {
  Main: SignIn,
  Initial: Splash,
};
const TEACHER_SCREENS = {
  ...SHARED_SCREENS,
  Main,
};
const STUDENT_SCREENS = {
  ...SHARED_SCREENS,
  Main,
};
const ADMIN_SCREENS = {
  ...SHARED_SCREENS,
  Main,
};
const LOCAL_ADMIN_SCREENS = {
  ...SHARED_SCREENS,
  Main,
};

export const getScreens = (role: IRole | undefined) => {
  const screens = {
    '': GUEST_SCREENS,
    [TEACHER]: TEACHER_SCREENS,
    [STUDENT]: STUDENT_SCREENS,
    [ADMIN]: ADMIN_SCREENS,
    [LOCAL_ADMIN]: LOCAL_ADMIN_SCREENS,
  };
  return {initial: 'Initial', screens: screens[role ?? '']};
};
