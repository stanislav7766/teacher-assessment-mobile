<h1>Local Admin Routes</h1>

## <h2>Route: '/local-admins'</h2>

- body: empty
- token: user, university
- Returns: data: ILocalAdmins, err: string | null

<div>compare role from user with ADMIN role<br/>
ADMIN: returns university's local admins list<br/>
should use id from user with id from university for this<br/></div>
<span>interfaces</span>

```javascript
type ILocalAdmin = {
  rating: number, //teacher's rating
  avatar?: string,
  username: string,
  id: string,
  faculties: Array<string>,
};
type ILocalAdmins = Array<ILocalAdmin>;
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі відсутні керуючі"
    "Виникла помилка, спробуйте пізніше"//etc
    //data admin
    [
      {
        rating: 4.6,
        username: 'Шемседінов Тімур Гафарович',
        id: 'fmkrvmfkdcdedded',
        faculties: ['ПБФ'],
      },
      {
        rating: 4.8,
        id: 'cdvrdfvrfmkmrlf',
        username: 'Волокіта Артем Микалайович',
        faculties: ['ПБФ', 'ФІОТ'],
      },
    ]
  ...
```

## <h2>Route: '/local-admins/add'</h2>

- body: see below
- token: user, university
- Returns: data: boolean, err: string | null

<div>compare role from user with ADMIN role; validate body<br/>
ADMIN: returns result operation<br/>
should use id from user with id from university for this<br/></div>
<span>body</span>

```javascript
  ...
    //body
    {localAdminUsername: string, faculties: string[]}
  ...
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі відсутній такий викладач"
    "Виникла помилка, спробуйте пізніше"//etc
    //data admin
    true
  ...
```

## <h2>Route: '/local-admins/delete'</h2>

- body: see below
- token: user, university
- Returns: data: boolean, err: string | null

<div>compare role from user with ADMIN role; validate body<br/>
ADMIN: returns result operation<br/>
should use id from user with id from university for this<br/></div>
<span>body</span>

```javascript
  ...
    //body
    {localAdminId: string}
  ...
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "Виникла помилка, спробуйте пізніше"//etc
    //data admin
    true
  ...
```
