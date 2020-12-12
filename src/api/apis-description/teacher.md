<h1>Teacher Routes</h1>

## <h2>Route: '/teachers'</h2>

- body: see below
- token: user, university
- Returns: data: ITeachers, err: string | null

<div>compare role from user with server roles<br/>
any role: returns teachers list from university<br/>
should use id from user<br/></div>
<span>body</span>

```javascript
//body
{
  universityId: string;
}
```

<span>interfaces</span>

```javascript
type ITeacher = {
  rating: number, //teacher's rating
  avatar?: string,
  username: string,
  id: string,
};
type ITeachers = Array<ITeacher>;
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі відсутні викладачі у обраному університеті"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    [
      {
        rating: 4.5,
        username: 'Шемседінов Тімур Гафарович',
        id: 'fvfvfvbgbgf',
      },
      {
        rating: 4.5
        id: 'vfvfbgbx',
        username: 'Волокіта Артем Микалайович',
      },
    ]
  ...
```

## <h2>Route: '/teachers/faculty-teachers'</h2>

- body: empty
- token: user, university
- Returns: data: ITeachers, err: string | null

<div>compare role from user with LOCAL_ADMIN role<br/>
LOCAL_ADMIN: returns teachers list from local admin's faculties<br/>
should use id from user with id from university<br/></div>
<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі відсутні викладачі"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    [
      {
        rating: 4.5,
        username: 'Шемседінов Тімур Гафарович',
        id: 'fvfvfvbgbgf',
      },
      {
        rating: 4.5
        id: 'vfvfbgbx',
        username: 'Волокіта Артем Микалайович',
      },
    ]
  ...
```

## <h2>Route: '/teachers/faculty-teachers/delete'</h2>

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
  teacherId: string;
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

## <h2>Route: '/teachers/faculty-teachers/add'</h2>

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
  teacherUsername: string;
  faculties: string[];
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
