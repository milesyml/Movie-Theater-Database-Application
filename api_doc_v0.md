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

### Common 4: get credit cards
@api {GET} '/get_creditcards'


@success example
HTTP/1.1 200 OK
[
  [
    "1111111111000000"
  ],
  [
    "1111111100000000"
  ]
]
@error example
HTTP/1.1 500
Error occured: {error message}



### screen 1: login

@api {POST} '/user_login'

@input example
{
	"username": "calcwizard",
	"password":"222222222"
}

@success example
HTTP/1.1 200 OK
{
    "isAdmin": 0,
    "isCustomer": 1,
    "isManager": 0,
    "status": "approved",
    "username": "calcwizard"
  }

@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500
[for other errors]

### Screen 3: User registration
@api {POST} '/user_register'

@input example
{
	"userName": "lanshang",
	"password":"222222223",
	"firstName": "tiantian",
	"lastName": "fu"
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
	"userName": "lanshang2",
	"password":"222222223",
	"firstName": "tiantian",
	"lastName": "fu"
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
	"userName": "lanshang2",
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
	"userName": "lanshang3",
	"password": "fasfdsgfdsgfd",
	"firstName": "tiantian",
	"lastName": "fu",
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
	"userName": "lanshang3",
	"password": "fasfdsgfdsgfd",
	"firstName": "tiantian",
	"lastName": "fu",
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
@api {POST} '/admin_filter_user'

@input example
{
	"userName": "",
	"status": "ALL",
	"sortBy": "creditCardCount",
	"sortDirection": "DESC"
}

@Note:
-- sortBy can only be one of them: "", "username", "creditCardCount", "userType", "status", default is "username"
-- sortDirection can only be: "ASC", "DESC", "", default is "DESC"

@success example
HTTP/1.1 200 OK
[
  {
    "creditCardCount": 5,
    "status": "approved",
    "userType": "CustomerManager",
    "username": "georgep"
  },
  {
    "creditCardCount": 3,
    "status": "approved",
    "userType": "Customer",
    "username": "ilikemoney$$"
  }
]


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}


### Screen 13.2: Admin approve user
@api {POST} '/admin_approve_user'

@input example
{
	"userName": "smith_j"
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
	"userName": "smith_j"
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
@api {POST} '/admin_filter_company'

@input example
{
	"comName": "ALL",
	"minCity": "",
	"maxCity": "",
	"minTheater": "",
	"maxTheater": "",
	"minEmployee": "",
	"maxEmployee": "",
	"sortBy": "",
	"sortDirection": "ASC"
}

@Note:
- sortBy can only be one of the following: "comName", "numCityCover", "numEmployee", "numTheater", ""


@success example
HTTP/1.1 200 OK
[
  {
    "comName": "4400 Theater Company",
    "numCityCover": 3,
    "numEmployee": 6,
    "numTheater": 3
  },
  {
    "comName": "AI Theater Company",
    "numCityCover": 1,
    "numEmployee": 2,
    "numTheater": 1
  }
]

@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}

### Screen 15.1: Get eligible managers
@api {POST} '/get_eligible_managers'

@input example
{
	"comName": "4400 Theater Company"
}

@success example
HTTP/1.1 200 OK
[
  [
    "Manager One"
  ],
  [
    "Three Three"
  ],
  [
    "Four Four"
  ]
]


@error example
HTTP/1.1 400 BAD REQUEST
Error occured: {}


### Screen 15.2: Admin create theater
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

### Screen 16.3: Admin explore company detail: Both theaters and employees
@api {POST} '/admin_view_comDetail_combined'

@input example
{
	"comName": "4400 Theater Company"
}

@success example
HTTP/1.1 200 OK
[
  [
    "Claude Shannon",
    "George P. Burdell",
    "Manager One",
    "Three Three",
    "Four Four",
    "Marie Curie"
  ],
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
      "manName": "Marie Curie",
      "thCapacity": 5,
      "thCity": "Boulder",
      "thName": "Star Movies",
      "thState": "CA"
    }
  ]
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
	"releaseDate": "2019-11-26"
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
@api {POST} '/manager_filter_th'

@input example
{
	"manUsername": "fatherAI",
	"movName": "",
	"minMovDuration": "",
	"maxMovDuration": "",
	"minMovReleaseDate": "",
	"maxMovReleaseDate": "",
	"minMovPlayDate": "",
	"maxMovPlayDate": "",
	"includeNotPlayed": 1
}
@Note：
- for "includeNotPlayed", 1 means true (checked), 0 means false (not checked)

@success example
HTTP/1.1 200 OK
[
  {
    "movDuration": 130,
    "movName": "4400 The Movie",
    "movPlayDate": null,
    "movReleaseDate": "Mon, 12 Aug 2019 00:00:00 GMT"
  },
  {
    "movDuration": 120,
    "movName": "4400 Theater Company Exploration",
    "movPlayDate": null,
    "movReleaseDate": "Tue, 26 Nov 2019 00:00:00 GMT"
  }
]


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}


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
@api {POST} '/customer_filter_mov'

@input example
{
	"movName": "ALL",
	"comName": "ALL",
	"city": "",
	"state": "ALL",
	"minMovPlayDate": "",
	"maxMovPlayDate": ""
}

@success example
HTTP/1.1 200 OK
[
  {
    "comName": "4400 Theater Company",
    "movName": "4400 The Movie",
    "movPlayDate": "Thu, 12 Sep 2019 00:00:00 GMT",
    "movReleaseDate": "Mon, 12 Aug 2019 00:00:00 GMT",
    "thCity": "San Francisco",
    "thName": "Cinema Star",
    "thState": "CA",
    "thStreet": "100 Cool Place",
    "thZipcode": "94016"
  },
  {
    "comName": "Awesome Theater Company",
    "movName": "4400 The Movie",
    "movPlayDate": "Sat, 12 Oct 2019 00:00:00 GMT",
    "movReleaseDate": "Mon, 12 Aug 2019 00:00:00 GMT",
    "thCity": "Austin",
    "thName": "ABC Theater",
    "thState": "TX",
    "thStreet": "880 Color Dr",
    "thZipcode": "73301"
  }
]

@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}



### Screen 20.2: Get Movie Names, Company Names and Customer's Cards
@api {POST} '/screen20_get_all'

@input example
{
	"userName": "georgep"
}

@success example
HTTP/1.1 200 OK
[
  [
    "4400 The Movie",
    "Avengers: Endgame",
    "Calculus Returns: A ML Story",
    "George P Burdell's Life Story",
    "Georgia Tech The Movie",
    "How to Train Your Dragon",
    "Spaceballs",
    "Spider-Man: Into the Spider-Verse",
    "The First Pokemon Movie",
    "The King's Speech"
  ],
  [
    "4400 Theater Company",
    "AI Theater Company",
    "Awesome Theater Company",
    "EZ Theater Company"
  ],
  [
    "1111111111110000",
    "1111111111111000",
    "1111111111111100",
    "1111111111111110",
    "1111111111111111"
  ]
]


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}


### Screen 20.3: Customer view movie
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
Viewing more than 3 movies a day is not permitted

HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}

### Screen 21: Customer view history
@api {POST} '/customer_view_history'

@input example
{
	"userName": "georgep"
}

@success example
HTTP/1.1 200 OK
[
  {
    "comName": "EZ Theater Company",
    "creditCardNum": "1111111111111100",
    "movName": "How to Train Your Dragon",
    "movPlayDate": "Thu, 25 Mar 2010 00:00:00 GMT",
    "thName": "Star Movies"
  },
  {
    "comName": "4400 Theater Company",
    "creditCardNum": "1111111111111111",
    "movName": "How to Train Your Dragon",
    "movPlayDate": "Fri, 02 Apr 2010 00:00:00 GMT",
    "thName": "Cinema Star"
  },
  {
    "comName": "EZ Theater Company",
    "creditCardNum": "1111111111111111",
    "movName": "How to Train Your Dragon",
    "movPlayDate": "Mon, 22 Mar 2010 00:00:00 GMT",
    "thName": "Main Movies"
  },
  {
    "comName": "EZ Theater Company",
    "creditCardNum": "1111111111111111",
    "movName": "How to Train Your Dragon",
    "movPlayDate": "Tue, 23 Mar 2010 00:00:00 GMT",
    "thName": "Main Movies"
  }
]

-- why the play date is like this????

@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}


### Screen 22.1 User get theater names and company names
@api {GET} '/screen22_get_all'


@success example
HTTP/1.1 200 OK
[
  [
    "ALL",
    "Star Movies",
    "Cinema Star",
    "Main Movies",
    "Jonathan's Movies",
    "ML Movies",
    "ABC Theater",
    "Star Movies"
  ],
  [
    "4400 Theater Company",
    "AI Theater Company",
    "Awesome Theater Company",
    "EZ Theater Company"
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
    "address": "100 Cool Place, San Francisco, CA 94016",
    "company": "4400 Theater Company",
    "theater": "Cinema Star"
  },
  {
    "address": "67 Pearl Dr, Seattle, WA 98101",
    "company": "4400 Theater Company",
    "theater": "Jonathan's Movies"
  },
  {
    "address": "4400 Rocks Ave, Boulder, CA 80301",
    "company": "4400 Theater Company",
    "theater": "Star Movies"
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
	"userName": "DNAhelix"
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
	"userName": "calcwizard",
	"minDate": "",
	"maxDate": "",
	"comName": "EZ Theater Company"
}


@success example
HTTP/1.1 200 OK
[
  {
    "address": "123 Main St, New York, NY 10001",
    "company": "EZ Theater Company",
    "theater": "Main Movies",
    "visitDate": "Mon, 22 Mar 2010 00:00:00 GMT"
  },
  {
    "address": "745 GT St, Atlanta, GA 30332",
    "company": "EZ Theater Company",
    "theater": "Star Movies",
    "visitDate": "Thu, 25 Mar 2010 00:00:00 GMT"
  }
]


@error example
HTTP/1.1 400 BAD REQUEST
Input Error: {} [for integrity errors]

HTTP/1.1 500 
Failed to execute stored procedure: {}

