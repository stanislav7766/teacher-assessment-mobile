<h1>Export Data Routes</h1>

## <h2>Route: '/export-data'</h2>

- body: empty
- token: user, university
- Returns: data: string, err: string | nill

<div>compare role from user with ADMIN role, LOCAL_ADMIN role. Returns users login-password list <br/>
should use id from user (ADMIN\LOCAL_ADMIN) with id from university for this<br/>
returns example</div>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі відсутні керуючі"//etc
    //data for admin
    `Керуючі:
    Пупкін Семен Петрович: login_here password_here;
    Семечук Борис Андрійович? login_here password_here;`
    //data for local_admin
    `Викладачі:
    Пупкін Семен Петрович: login_here password_here;
    Семечук Борис Андрійович? login_here password_here;
    Студенти:
    Пупкін Семен Петрович: login_here password_here;
    Семечук Борис Андрійович? login_here password_here;`
  ...
```
