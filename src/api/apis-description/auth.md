<h1>Auth Routes</h1>

<span>user, university interfaces (token)</span>

```javascript
//in token
type IUniversity = {
  rating: number,
  preview: string,
  name: string,
  id: string,
};
type IUser = {
  id: string,
  username: string,
  rating?: number,
  avatar?: string,
  role: IRole, //IRole: "TEACHER" | "STUDENT" | "ADMIN" | "LOCAL_ADMIN"
};
```

## <h2>Route: '/auth/sign-in'</h2>

- body: see below
- Returns: data: tokens(headers or response ?), err: string | null

<div>validate body</div>
<span>body</span>

```javascript
  ...
    //body
    {login: string; password: string}
  ...
```

<span>returns example</span>

```javascript
  ...
    //err
    "В системі не знайдено користувача за наступними даними"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
  ...
```
