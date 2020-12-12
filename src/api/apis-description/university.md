<h1>University Routes</h1>

## <h2>Route: '/universities'</h2>

- body: empty
- token: user, university
- Returns: data: IUniversities, err: string | null

<div>compare role from user with server roles<br/>
any role: returns full universities list<br/>
should use id from user<br/></div>
<span>interfaces</span>

```javascript
type IUniversity = {
  rating: number, //university's rating
  preview: string,
  name: string,
  id: string,
};
type IUniversities = Array<IUniversity>;
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі відсутні університети"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    [
     {
        rating: 4.6,
        preview: 'https://strana.ua/img/article/1262/5_main-v1551691292.jpeg',
        name: 'Национальный медицинский университет имени А. А. Богомольца',
        id: 'vfvfdvgtfhd',
      },
      {
        rating: 4.8,
        id: 'ffrgddsfgbtg',
        preview: 'https://kpi.ua/files/styles/story/public/images-story/2020-kp16-1.jpg?itok=t3zFp5Dv',
        name: 'Національний технічний університет України «Київський політехнічний інститут імені Ігоря Сікорського»',
      }
    ]
  ...
```
