import Splash from '@screens/splash';
import SignIn from '@screens/sign-in';
import Universities from '@screens/universities';
import University from '@screens/university';
import Teacher from '@screens/teacher';
import StudentAssessments from '@screens/student-assessments';
import LeaveAssessment from '@screens/leave-assessment';
import AddLocalAdmin from '@screens/add-local-admin';
import LocalAdmins from '@screens/local-admins';
import AddFacultyTeacher from '@screens/add-faculty-teacher';
import FacultyStudents from '@screens/faculty-students';
import AddFacultyStudent from '@screens/add-faculty-student';
import FacultyTeachers from '@screens/faculty-teachers';
import FacultyAssessments from '@screens/faculty-assessments';
import AddFacultyAssessment from '@screens/add-faculty-assessment';
import {TEACHER, STUDENT, LOCAL_ADMIN, ADMIN} from '@constants/roles';
import {IRole} from 'types/role';

const SHARED_SCREENS = {
  Initial: Splash,
  University,
  Teacher,
};
const GUEST_SCREENS = {
  Main: SignIn,
  Initial: Splash,
};
const TEACHER_SCREENS = {
  ...SHARED_SCREENS,
  Main: Universities,
};
const STUDENT_SCREENS = {
  ...SHARED_SCREENS,
  Main: Universities,
  StudentAssessments,
  LeaveAssessment,
};
const ADMIN_SCREENS = {
  ...SHARED_SCREENS,
  Main: Universities,
  AddLocalAdmin,
  LocalAdmins,
};
const LOCAL_ADMIN_SCREENS = {
  ...SHARED_SCREENS,
  Main: Universities,
  FacultyTeachers,
  AddFacultyTeacher,
  FacultyStudents,
  AddFacultyStudent,
  FacultyAssessments,
  AddFacultyAssessment,
};

export const getScreens = (role: IRole) => {
  const screens = {
    '': GUEST_SCREENS,
    [TEACHER]: TEACHER_SCREENS,
    [STUDENT]: STUDENT_SCREENS,
    [ADMIN]: ADMIN_SCREENS,
    [LOCAL_ADMIN]: LOCAL_ADMIN_SCREENS,
  };
  return {initial: 'Initial', screens: screens[role]};
};
