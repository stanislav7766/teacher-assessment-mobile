<h1>Auth Routes</h1>

<span>access token</span>

```javascript
//in access token payload
type Payload = {
  user: {
    id: string,
    role: IRole, //IRole: "TEACHER" | "STUDENT" | "ADMIN" | "LOCAL_ADMIN";
  },
  university: {
    id: string,
  },
};
```

## <h2>Route: '/auth/sign-in'</h2>

- body: see below
- Returns: data: IResponseData, err: string | null, refresh_token(header httponly)

<div>validate body. if deviceId not exists in sessions db - add new; check count sessions if more than N - replace</div>
<span>body</span>

```javascript
  ...
    //body
    {login: string; password: string, deviceId: string}
  ...
```

<span>interfaces</span>

```javascript
type ICurrentUniversity = {
  preview: string,
  name: string,
  id: string,
};
type ICurrentUser = {
  id: string,
  username: string,
  avatar?: string,
  role: IRole,
};
type IResponseData = {
  user: ICurrentUser,
  university: ICurrentUniversity,
  accessToken: string,
  refreshToken: boolean,
};
```

<span>returns example</span>

```javascript
  ...
    //err
    "В системі не знайдено користувача за наступними даними"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    {
      user: {
        id: 'vfvfvffvfds',
        username: 'Пупкін Василь Генадійович',
        role: IRole
      },
      university: {
        preview: 'https://kpi.ua/files/styles/story/public/images-story/2020-kp16-1.jpg?itok=t3zFp5Dv',
        name: 'Національний технічний університет України «Київський політехнічний інститут імені Ігоря Сікорського»',
        id: 'vfvfvfvffvfd',
      },
      accessToken: 'here access token',
      refreshToken: true,//also token: string - in header httponly (in res.data only created refresh or not)
}
  ...
```

## <h2>Route: '/auth/sign-out'</h2>

- body: none
- Returns: data: boolean, err: string | null

<div>delete header - refresh_token, delete header - access token, delete session from db if you keep it</div>

<span>returns example</span>

```javascript
  ...
    //err
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    true
  ...
```

## <h2>Route: '/auth/refresh-tokens'</h2>

- body: see below
- Returns: data: IResponseData, err: string | null, refresh_token(header httponly)

<div>validate body. check refresh token expire. if deviceId not exists in sessions db - add new; check count sessions if more than N - replace </div>
<span>body</span>

```javascript
  ...
    //body
    {deviceId: string}
  ...
```

<span>interfaces</span>

```javascript
type IResponseData = {
  accessToken: string,
  refreshToken: boolean,
};
```

<span>returns example</span>

```javascript
  ...
    //err
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    {
      accessToken: 'here access token',
      refreshToken: true,//also token: string - in header httponly (in res.data only created refresh or not)
}
  ...
```
