<h1>Group Routes</h1>

## <h2>Route: '/groups'</h2>

- params: empty
- token: user, university
- Returns: data: string[], err: string | null

<div>compare role from user with server roles<br/>
LOCAL_ADMIN: returns part groups list(for example groups from LOCAL_ADMIN's faculties)<br/>
should use id from user with id from university for this<br/>
returns example</div>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі відсутні групи"
    "Виникла помилка, спробуйте пізніше"//etc
    //data local_admin
    ['ІЕ-34', 'ТК_56']
  ...
```
