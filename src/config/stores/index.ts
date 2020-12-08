import {AuthStore, AuthContext} from '@stores/auth';
import {UserStore, UserContext} from '@stores/user';

const authStore = new AuthStore();
const userStore = new UserStore();

const entities = [
  {Provider: AuthContext.Provider, store: authStore},
  {Provider: UserContext.Provider, store: userStore},
];
export default entities;
