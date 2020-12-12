<h1>Faculty Routes</h1>

## <h2>Route: '/faculties'</h2>

- body: empty
- token: user, university
- Returns: data: string[], err: string | null

<div>compare role from user with server roles<br/>
ADMIN: returns university faculties list;<br/>
LOCAL_ADMIN: returns his faculties list<br/>
should use id from user with id from university for this<br/>
returns example</div>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі відсутні факультети"
    "Виникла помилка, спробуйте пізніше"//etc
    //data admin
    ['ІХФ', 'ПБФ', 'РТФ','ТЕФ', 'ФМФ', 'ФІОТ', 'ФБТ', 'ФЕА', 'ФЕЛ', 'ФЛ', 'ФММ', 'ФПМ', 'ФСП', 'ХТФ']
    //data local_admin
    ['ІХФ', 'ПБФ']
  ...
```
