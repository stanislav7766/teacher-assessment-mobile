import {TEACHER, STUDENT, LOCAL_ADMIN, ADMIN} from '@constants/roles';
import {IRole} from 'types/role';

type Link = {link: string; screen: string};
type Links = Array<Link>;

const GUEST_LINKS: Links = [];
const TEACHER_LINKS: Links = [
  {link: 'Головна', screen: 'Main'},
  {link: 'Переглянути відгуки', screen: 'Teacher'},
];
const STUDENT_LINKS: Links = [
  {link: 'Головна', screen: 'Main'},
  {link: 'Переглянути відгуки', screen: 'StudentAssessments'},
];
const ADMIN_LINKS: Links = [
  {link: 'Головна', screen: 'Main'},
  {link: 'Додати викладачів', screen: 'AddFacultyTeacher'},
  {link: 'Додати керуючих', screen: 'LocalAdmins'},
  {link: 'Експорт даних', screen: 'ExportData'},
];
const LOCAL_ADMIN_LINKS: Links = [
  {link: 'Головна', screen: 'Main'},
  {link: 'Додати викладачів', screen: 'FacultyTeachers'},
  {link: 'Додати студентів', screen: 'FacultyStudents'},
  {link: 'Згенерувати опитування', screen: 'FacultyAssessments'},
  {link: 'Експорт даних', screen: 'ExportData'},
];

export const getMenuLinks = (role: IRole): Links => {
  const links = {
    [TEACHER]: TEACHER_LINKS,
    [STUDENT]: STUDENT_LINKS,
    [ADMIN]: ADMIN_LINKS,
    [LOCAL_ADMIN]: LOCAL_ADMIN_LINKS,
    '': GUEST_LINKS,
  };
  return links[role];
};
