import {AuthStore, AuthContext} from '@stores/auth';
import {UserStore, UserContext} from '@stores/user';
import {UniversityStore, UniversityContext} from '@stores/university';

const authStore = new AuthStore();
const userStore = new UserStore();
const universityStore = new UniversityStore();

const entities = [
  {Provider: AuthContext.Provider, store: authStore},
  {Provider: UserContext.Provider, store: userStore},
  {Provider: UniversityContext.Provider, store: universityStore},
];
export default entities;
