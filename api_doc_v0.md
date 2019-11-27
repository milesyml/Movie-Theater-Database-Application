### Common 1: get users
@api {GET} '/get_users'


@success example
HTTP/1.1 200 OK
[
  [
    "b_allen"
  ],
  [
    "calcultron"
  ],
  [
    "calcultron2"
  ]
]


### Common 2: get company names
@api {GET} '/get_companies'


@success example
HTTP/1.1 200 OK
[
  [
    "4400 Theater Company"
  ],
  [
    "AI Theater Company"
  ],
  [
    "Awesome Theater Company"
  ],
  [
    "EZ Theater Company"
  ]
]

@error example
HTTP/1.1 500
Error occured: {error message}

### Common 3: get movie names
@api {GET} '/get_movies'


@success example
HTTP/1.1 200 OK
[
  [
    "4400 The Movie"
  ],
  [
    "Avengers: Endgame"
  ],
  [
    "Calculus Returns: A ML Story"
  ]
]

@error example
HTTP/1.1 500
Error occured: {error message}



### screen 1: login

@api {POST} '/user_login'

@input example
{
	"user": "calcwizard",
	"pw":"22222222"
}

@success example
HTTP/1.1 200 OK
[
  {
    "isAdmin": 0,
    "isCustomer": 1,
    "isManager": 0,
    "status": "approved",
    "username": "calcwizard"
  }
]

@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500
[for other errors]

### Screen 3: User registration
@api {POST} '/user_register'

@input example
{
	"user": "lanshang",
	"pw":"222222223",
	"first": "tiantian",
	"last": "fu"
}

@success example
HTTP/1.1 200 OK
User Registered


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
[Any other errors]


### Screen 4.1: Customer-only registration
@api {POST} '/customer_only_register'

@input example
{
	"user": "lanshang2",
	"pw":"222222223",
	"first": "tiantian",
	"last": "fu"
}

@success example
HTTP/1.1 200 OK
Customer Registered


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
[Any other errors]

### Screen 4.2/6.2: Customer Add CreditCard
@api {POST} '/add_credit'

@input example
{
	"user": "lanshang2",
	"cards": ["7643278923432678", "7643278923432645"]
}

@success example
HTTP/1.1 200 OK
Cards Added


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
[Any other errors]

### Screen 5: Manager only registration
@api {POST} '/manager_only_register'

@input example
{
	"user": "lanshang3",
	"pw": "fasfdsgfdsgfd",
	"first": "tiantian",
	"last": "fu",
	"comName": "4400 Theater Company",
	"street": "800",
	"city": "Atlanta",
	"state": "GA",
	"zipCode": "30318"
}

@success example
HTTP/1.1 200 OK
Manager Registered


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
[Any other errors]

### Screen 6: Manager-Customer registration
@api {POST} '/manager_customer_register'

@input example
{
	"user": "lanshang3",
	"pw": "fasfdsgfdsgfd",
	"first": "tiantian",
	"last": "fu",
	"comName": "4400 Theater Company",
	"street": "800",
	"city": "Atlanta",
	"state": "GA",
	"zipCode": "30318"
}

@success example
HTTP/1.1 200 OK
Manager Registered


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
[Any other errors]


### Screen 13.1: Admin filter user

### Screen 13.2: Admin approve user
@api {POST} '/admin_approve_user'

@input example
{
	"user": "smith_j"
}

@success example
HTTP/1.1 200 OK
User Approved


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}



### Screen 13.3: Admin decline user 
@api {POST} '/admin_decline_user'

@input example
{
	"user": "smith_j"
}

@success example
HTTP/1.1 200 OK
User Declined


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}



### Screen 14: Admin filter company 


### Screen 15: Admin create theater
@api {POST} '/admin_create_theater'

@input example
{
	"thName": "Theater 1",
	"comName": "4400 Theater Company",
	"street": "123",
	"city": "Atlanta",
	"state": "GA",
	"zipCode": "30318",
	"capacity": 5,
	"managerUser": "wonderwoman"
}

@success example
HTTP/1.1 200 OK
Theater Created


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}

### Screen 16.1: Admin explore company detail: the employees working in that company
@api {POST} '/admin_view_comDetail_emp'

@input example
{
	"comName": "4400 Theater Company"
}

@success example
HTTP/1.1 200 OK
[
  [
    "Claude Shannon"
  ],
  [
    "George P. Burdell"
  ]
]


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}



### Screen 16.2: Admin explore company detail: the theaters in that company
@api {POST} '/admin_view_comDetail_th'

@input example
{
	"comName": "4400 Theater Company"
}

@success example
HTTP/1.1 200 OK
[
  {
    "manName": "Claude Shannon",
    "thCapacity": 4,
    "thCity": "San Francisco",
    "thName": "Cinema Star",
    "thState": "CA"
  },
  {
    "manName": "George P. Burdell",
    "thCapacity": 2,
    "thCity": "Seattle",
    "thName": "Jonathan's Movies",
    "thState": "WA"
  },
  {
    "manName": "Manager Two",
    "thCapacity": 8,
    "thCity": "Atlanta",
    "thName": "Overload Cinema",
    "thState": "GA"
  }
]


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}


### Screen 17: Admin create movie
@api {POST} '/admin_create_mov'

@input example
{
	"name": "4400 Theater Company Exploration",
	"duration": 120,
	"date": "2019-11-26"
}

@success example
HTTP/1.1 200 OK
Movie Created


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}

### Screen 18: Manager theater overview


### Screen 19: Manager schedule movie
@api {POST} '/manager_schedule_mov'

@input example
{
	"manName": "georgep",
	"movName": "4400 The Movie",
	"releaseDate": "2019-08-12",
	"playDate": "2019-11-26"
}

@success example
HTTP/1.1 200 OK
Movie Scheduled


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}


### Screen 20.1: Customer explore movie



### Screen 20.2: Customer view movie
@api {POST} '/customer_view_movie'

@input example
{
	"cardNum": "1111111100000000",
	"movName": "4400 The Movie",
	"releaseDate": "2019-08-12",
	"thName": "ABC Theater",
	"comName": "Awesome Theater Company",
	"playDate": "2019-10-12"
}

@success example
HTTP/1.1 200 OK
Viewing Added


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}

### Screen 21: Customer view history
@api {POST} '/customer_view_history'

@input example
{
	"user": "calcultron2"
}

@success example
HTTP/1.1 200 OK
[
  {
    "comName": "4400 Theater Company",
    "creditCardNum": "1111111100000000",
    "movName": "4400 The Movie",
    "movPlayDate": "Tue, 26 Nov 2019 00:00:00 GMT",
    "thName": "Theater 1"
  }
]

-- why the play date is like this????

@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}


### Screen 22.1 User get theater names
@api {GET} '/get_theater'


@success example
HTTP/1.1 200 OK
[
  [
    "ALL"
  ],
  [
    "Star Movies"
  ],
  [
    "Cinema Star"
  ]
]


@error example
HTTP/1.1 500 
Failed to execute stored procedure: {}

### Screen 22.2 User filter theater
@api {POST} '/user_filter_th'

@input example
{
	"thName": "ALL",
	"comName": "ALL",
	"city": "",
	"state": "ALL"
}

@success example
HTTP/1.1 200 OK
[
  {
    "comName": "4400 Theater Company",
    "thCity": "San Francisco",
    "thName": "Cinema Star",
    "thState": "CA",
    "thStreet": "100 Cool Place",
    "thZipcode": "94016"
  },
  {
    "comName": "4400 Theater Company",
    "thCity": "Seattle",
    "thName": "Jonathan's Movies",
    "thState": "WA",
    "thStreet": "67 Pearl Dr",
    "thZipcode": "98101"
  },
  {
    "comName": "4400 Theater Company",
    "thCity": "Atlanta",
    "thName": "Overload Cinema",
    "thState": "GA",
    "thStreet": "1 Main Street",
    "thZipcode": "30332"
  }
]


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}


### Screen 22.3 User visit theater
@api {POST} '/user_visit_th'

@input example
{
	"thName": "Cinema Star",
	"comName": "4400 Theater Company",
	"date": "2019-11-21",
	"user": "DNAhelix"
}

@success example
HTTP/1.1 200 OK
Visit Logged


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}


### Screen 23 User visit theater history
@api {POST} '/user_filter_visitHistory'

@input example
{
	"user": "calcwizard",
	"minDate": "2010-01-01",
	"maxDate": "2020-01-01"
}

-- Note: How to deal with situations like minDate is empty(NULL)??

@success example
HTTP/1.1 200 OK
[
  {
    "comName": "4400 Theater Company",
    "thCity": "San Francisco",
    "thName": "Cinema Star",
    "thState": "CA",
    "thStreet": "100 Cool Place",
    "thZipcode": "94016",
    "visitDate": "Thu, 21 Nov 2019 00:00:00 GMT"
  }
]


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}

