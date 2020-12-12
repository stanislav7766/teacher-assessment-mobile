<h1>Student Routes</h1>

## <h2>Route: '/students/faculty-students'</h2>

- body: empty
- token: user, university
- Returns: data: IStudents, err: string | null

<div>compare role from user with LOCAL_ADMIN role<br/>
LOCAL_ADMIN: returns students list from local admin's faculties<br/>
should use id from user with id from university<br/></div>
<span>interfaces</span>

```javascript
type IStudent = {
  avatar?: string,
  username: string,
  id: string,
};
type IStudents = Array<IStudent>;
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі відсутні студенти"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    [
      {
        username: 'Шемседінов Тімур Гафарович',
        id: 'fvfvfvbgbgf',
      },
      {
        id: 'vfvfbgbx',
        username: 'Волокіта Артем Микалайович',
      },
    ]
  ...
```

## <h2>Route: '/students/faculty-students/delete'</h2>

- body: see below
- token: user, university
- Returns: data: boolean, err: string | null

<div>compare role from user with LOCAL_ADMIN role<br/>
LOCAL_ADMIN: returns result of operation<br/>
should use id from user with id from university<br/></div>
<span>body</span>

```javascript
//body
{
  studentId: string;
}
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    boolean
  ...
```

## <h2>Route: '/students/faculty-students/add'</h2>

- body: see below
- token: user, university
- Returns: data: boolean, err: string | null

<div>compare role from user with LOCAL_ADMIN role<br/>
LOCAL_ADMIN: returns result of operation<br/>
should use id from user with id from university<br/></div>
<span>body</span>

```javascript
//body
{
  studentUsername: string;
  faculty: string;
}
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "Перевірте правильність даних"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    boolean
  ...
```
