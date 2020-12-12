<h1>Review Routes</h1>

## <h2>Route: '/reviews/teacher-reviews'</h2>

- body: see below
- token: user, university
- Returns: data: IReviews, err: string | null

<div>compare role from user with server roles<br/>
any server role: returns teacher's reviews list<br/>
should use id from user for this<br/></div>
<span>body</span>

```javascript
//body
{
  teacherId: string;
}
```

<span>interfaces</span>

```javascript
type IReview = {
  rating: number, //review's rating(average of answers)
  review: string,
  QAs: IQAs, //IQAs: Array<{No: number; question: string; answer: number}>
  id: string,
};
type IReviews = Array<IReview>;
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі відсутні відгуки на обраного викладача"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    [
  {
    rating: 4.6,
    review: `review's text`,
    id: 'fvrkfmrkfmr',
    QAs: QA,//see IQAs
  },
  {
    rating: 4.6,
    review: `review's text`,
    id: 'frfrfkosfr',
    QAs: QA,//see IQAs
  }
    ]
  ...
```

## <h2>Route: '/reviews/student-reviews'</h2>

- body: empty
- token: user, university
- Returns: data: {active: IActiveReviews, leaved: ILeavedReviews}, err: string | null

<div>compare role from user with STUDENT role<br/>
STUDENT: returns his reviews lists<br/>
should use id from user for this<br/></div>
<span>interfaces</span>

```javascript
type IActiveReview = {
  id: string,
  QAs: IQAs,
  teacherId: string,
  avatar?: string,
  username: string,
};

type IActiveReviews = Array<IActiveReview>;

type ILeavedReview = {
  id: string,
  QAs: IQAs,
  teacherId: string,
  review: string,
  username: string,
  avatar?: string,
  rating: number, //review's rating(average of answers)
};

type ILeavedReviews = Array<ILeavedReview>;
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    {
    active: [
     {
        id: 'vfvfvffbf',
        teacherId: 'ffffvfefvrfvgrf',
        QAs: QA,
        username: 'Перепечкін Василь Семенович',
      },
      {
        id: 'fkslfmlrfe',
        teacherId: 'mfvlfe;,rgl',
        QAs: QA,
        username: 'Пупкін Андрій Михайлович',
      }
    ],
    leaved : [
     {
        id: 'fvfvfvfsfesafb',
        QAs: QA,
        teacherId: 'frfkomfrggrfs',
        review: `review's text`,
        username: 'Перепечкін Василь Семенович',
        rating: 4.4,
      },
      {
        id: 'vfvsgrttedgsdbg',
        QAs: QA,
        teacherId: 'fvdsffgbtrsfvr',
        review: `review's text`,
        username: 'Перепечкін Василь Семенович',
        rating: 4.4,
      }]
    }
  ...
```

## <h2>Route: '/reviews/student-reviews/active-review'</h2>

- body: see below
- token: user, university
- Returns: data: IActiveReview| null, err: string | null

<div>compare role from user with STUDENT role; validate body(check activeReview exists for teacherId, validate universityId for teacherId(students can leave reviews for teachers from their university only))<br/>
STUDENT: returns activeReview for selected teacher<br/>
should use id from user with id from university with teacherId from body for this<br/></div>
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
    "Для вас немає активних опитувань на обраного викладача"
    "Тільки студенти університу можуть залишати відгуки"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    {
      id: 'vfvfvffbf',
       teacherId: 'ffffvfefvrfvgrf',
       QAs: QAs,
       username: 'Перепечкін Василь Семенович',
      }
  ...
```

## <h2>Route: '/reviews/student-reviews/leave-review'</h2>

- body: see below
- token: user, university
- Returns: data: boolean, err: string | null

<div>compare role from user with STUDENT role; validate body(check: activeReviewId exists for teacherId(aka isActualReview), QAs, review empty)<br/>
STUDENT: returns result operation<br/>
should use id from user for this<br/></div>
<span>body</span>

```javascript
//body
{
  teacherId: string;
  activeReviewId: string;
  QAs: QAs; //see IQAs (also chech field answer must be 1..5)
  review: string;
}
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "Перевірте чи усі поля заповнені"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
    true
  ...
```

## <h2>Route: '/reviews/generated-reviews'</h2>

- body: empty
- token: user, university
- Returns: data: IGeneratedReviews, err: string | null

<div>compare role from user with LOCAL_ADMIN role<br/>
LOCAL_ADMIN: returns generated reviews list<br/>
should use id from user for this<br/></div>
<span>interfaces</span>

```javascript
type IGeneratedReview = {
  id: string,
  teacherId: string,
  username: string,
  avatar?: string,
  rating: number, //teacher's rating
  groups: string[],
};

export type IGeneratedReviews = Array<IGeneratedReview>;
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі відсутні опитування"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
     [
  {
    id: 'gvdknrmvfk',
    rating: 4.7,
    teacherId: 'fmrkvgmfkvdl',
    username: 'Пупкін Максим Семенович',
    groups: ['ІП-34', 'ІК-34', 'ІС-75'],
  },
  {
    id: 'vrsghtyjcghng',
    rating: 4.7,
    teacherId: 'efgfgfdsdgv',
    username: 'Віолехін Генадій Андрійович',
    groups: ['ІП-34', 'ІК-34', 'ІС-75'],
  },
]
  ...
```

## <h2>Route: '/reviews/generated-reviews/delete'</h2>

- body: see below
- token: user, university
- Returns: data: boolean, err: string | null

<div>compare role from user with LOCAL_ADMIN role<br/>
LOCAL_ADMIN: returns result operation<br/>
should use id from user for this<br/></div>
<span>body</span>

```javascript
//body
{
  reviewId: string;
}
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
     true
  ...
```

## <h2>Route: '/reviews/generated-reviews/add'</h2>

- body: see below
- token: user, university
- Returns: data: boolean, err: string | null

<div>compare role from user with LOCAL_ADMIN role; validate body<br/>
LOCAL_ADMIN: returns result operation<br/>
should use id from user for this<br/></div>
<span>body</span>

```javascript
//body
{
  teacherUsername: string;
  groups: string[];
}
```

<span>returns example</span>

```javascript
  ...
    //err
    "Необхідно авторизуватись"
    "В системі не знайдено обраного викладача"
    "Оберіть хоча б одну группу"
    "Виникла помилка, спробуйте пізніше"//etc
    //data
     true
  ...
```
