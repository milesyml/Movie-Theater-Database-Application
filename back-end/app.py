from flask import Flask, request, jsonify, make_response
import mysql.connector
from mysql.connector import Error
from dateutil import parser

app = Flask(__name__)

#SQL Server Details Here
connection = mysql.connector.connect(host="localhost",
                                     user="root",
                                     password="",
                                     database="team36")

def none_convert(input):
    """Converts empty string to None to feed to callproc"""
    if not input:
        return None
    else:
        return input

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/get_users')
def get_users():
    cur = connection.cursor()
    cur.execute('SELECT username FROM user')
    rv = cur.fetchall()
    cur.close()
    return jsonify(rv)

#General (Get company names)
@app.route('/get_companies', methods=['GET'])
def get_companies():
    try:
        if request.method == "GET":
            cur = connection.cursor()
            cur.execute('SELECT name FROM company')
            rv = cur.fetchall()
            cur.close()
            return jsonify(rv)
    except mysql.connector.Error as error:
        msg = "Error occured: {}".format(error)
        return make_response(msg, 500)

#General (Get movie names)
@app.route('/get_movies', methods=['GET'])
def get_movies():
    try:
        if request.method == "GET":
            cur = connection.cursor()
            cur.execute('SELECT name FROM movie')
            rv = cur.fetchall()
            cur.close()
            return jsonify(rv)
    except mysql.connector.Error as error:
        msg = "Error occured: {}".format(error)
        return make_response(msg, 500)

#Screen 1 (User Login)
@app.route('/user_login', methods=['POST'])
def user_login():
    if request.method == "POST":
        details = request.json
        user, pw = details['userName'], details['password']

        try:
            cur = connection.cursor()
            cur.callproc('user_login', [user,pw]) #Call login procedure
            cur.execute('SELECT * FROM userlogin') #Check login results
            rv = cur.fetchall()

            if not rv: #Failed login
                cur.close()
                return make_response('Login Failed', 400)
                
            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return items
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)            


#Screen 3 (User Register)
@app.route('/user_register', methods=['POST'])
def user_register():
    if request.method == "POST":
        details = request.json
        user, pw, first, last = details['userName'], details['password'], details['firstName'], details['lastName']

        try:
            cur = connection.cursor()
            cur.callproc('user_register', [user,pw,first,last])
            connection.commit() #Commit insertion
            cur.close()
            return "User Registered"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 4 (Customer Register)
@app.route('/customer_only_register', methods=['POST'])
def customer_only_register():
    if request.method == "POST":
        details = request.json
        user, pw, first, last = details['userName'], details['password'], details['firstName'], details['lastName']

        try:
            cur = connection.cursor()
            cur.callproc('customer_only_register', [user,pw,first,last])
            connection.commit() #Commit insertion
            cur.close()
            return "Customer Registered"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 4/6 (Credit Card Insertion)
@app.route('/add_credit', methods=['POST'])
def add_credit():
    if request.method == "POST":
        details = request.json
        user, cards  = details['userName'], details['cards'] #List in json

        try:
            cur = connection.cursor()
            for card in cards:
                cur.callproc('customer_add_creditcard', [user,card])
            connection.commit() #Commit insertion
            cur.close()
            return "Cards Added"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)  
            return make_response(msg, 500)     

#Screen 5 (Manager Register)
@app.route('/manager_only_register', methods=['POST'])
def manager_only_register():
    if request.method == "POST":
        details = request.json
        user, pw, first, last = details['userName'], details['password'], details['firstName'], details['lastName']
        comName, street, city = details['comName'], details['street'], details['city']
        state, zipCode = details['state'], details['zipCode']

        try:
            cur = connection.cursor()
            cur.callproc('manager_only_register', [user,pw,first,last,comName,street,city,state,zipCode])
            connection.commit() #Commit insertion
            cur.close()
            return "Manager Registered"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 6 (Manager-Customer Register)
@app.route('/manager_customer_register', methods=['POST'])
def manager_customer_register():
    if request.method == "POST":
        details = request.json
        user, pw, first, last = details['userName'], details['password'], details['firstName'], details['lastName']
        comName, street, city = details['comName'], details['street'], details['city']
        state, zipCode = details['state'], details['zipCode']

        try:
            cur = connection.cursor()
            cur.callproc('manager_customer_register', [user,pw,first,last,comName,street,city,state,zipCode])
            connection.commit() #Commit insertion
            cur.close()
            return "Manager Registered"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 13 (Admin Filter User)
#Untested
@app.route('/admin_filter_user', methods=['POST'])
def admin_filter_user():
    if request.method == "POST":
        details = request.json
        user, status = details['userName'], details['status']
        sortBy, sortDirection = details['sortBy'], details['sortDirection']

        try:
            cur = connection.cursor()
            cur.callproc('admin_filter_user', [user, status, sortBy, sortDirection]) 
            cur.execute('SELECT * FROM adfilteruser')
            rv = cur.fetchall()

            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(items)
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)   

#Screen 13 (User Approval)
@app.route('/admin_approve_user', methods=['POST'])
def approve_user():
    if request.method == "POST":
        user = request.json['userName']

        try:
            cur = connection.cursor()
            cur.callproc('admin_approve_user', [user])
            connection.commit() #Commit update
            cur.close()
            return "User Approved"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 13 (User Decline)
@app.route('/admin_decline_user', methods=['POST'])
def decline_user():
    if request.method == "POST":
        user = request.json['userName']

        try:
            cur = connection.cursor()
            cur.execute("select status from user where username = '{}'".format(user))
            rv = cur.fetchall()
            if str(rv[0][0]) == 'approved': #Check current approval status
                return make_response("Unable to decline approved user",400)
            cur.callproc('admin_decline_user', [user])
            connection.commit() #Commit update
            cur.close()
            return "User Declined"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 14 (Admin Filter Company)
#Untested
@app.route('/admin_filter_company', methods=['POST'])
def admin_filter_company():
    if request.method == "POST":
        details = request.json
        comName, minCity, maxCity = details['comName'], none_convert(details['minCity']), none_convert(details['maxCity'])
        minTheater, maxTheater = none_convert(details['minTheater']), none_convert(details['maxTheater'])
        minEmployee, maxEmployee = none_convert(details['minEmployee']), none_convert(details['maxEmployee'])
        sortBy, sortDirection = details['sortBy'], details['sortDirection']

        if minCity and maxCity:
            if minCity > maxCity:
                return make_response("Minimum number of cities must be less than the maximum",400) 
        if minTheater and maxTheater:
            if minTheater > maxTheater:
                return make_response("Minimum number of theaters must be less than the maximum",400) 
        if minEmployee and maxEmployee:
            if minEmployee > maxEmployee:
                return make_response("Minimum number of employees must be less than the maximum",400) 

        try:
            cur = connection.cursor()
            cur.callproc('admin_filter_company', [comName,minCity,maxCity,minTheater,maxTheater,minEmployee,maxEmployee,sortBy,sortDirection]) 
            cur.execute('SELECT * FROM adfiltercom')
            rv = cur.fetchall()

            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(items)
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)  

#Screen 15 (Get Eligible Managers)
# @app.route('/get_eligible_managers', methods=['GET'])
# def get_eligible_managers():
#     if request.method == "GET":
#         cur = connection.cursor()
#         cur.execute(""" select concat(firstname,' ',lastname) as fullName from user where username in 
#                         (select username from manager where username not in 
#                         (select managerusername from theater)); """)
#         rv = cur.fetchall()
#         cur.close()
#         return jsonify(rv)

@app.route('/get_eligible_managers', methods=['POST'])
def get_eligible_managers():
    if request.method == "POST":
        comName = request.json['comName']

        try:
            cur = connection.cursor()
            cur.execute(""" select concat(firstname,' ',lastname) as fullName from user where username in
                            (select username from manager 
                            where username not in (select managerusername from theater where company = '{}')
                            and company = '{}');""".format(comName,comName))
            rv = cur.fetchall()
            cur.close()
            return jsonify(rv)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Error occured: {}".format(error)
            return make_response(msg, 400)

#Screen 15 (Admin Create Theater)
@app.route('/admin_create_theater', methods=['POST'])
def admin_create_theater():
    if request.method == "POST":
        details = request.json
        thName, comName, street = details['thName'], details['comName'], details['street']
        city, state, zipCode,  = details['city'], details['state'], details['zipCode']
        capacity, managerUser = details['capacity'], details['managerUser']

        try:
            cur = connection.cursor()
            cur.callproc('admin_create_theater', [thName, comName, street, city, state, zipCode, capacity, managerUser])
            connection.commit() #Commit insertion
            cur.close()
            return "Theater Created"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 16 (Combine Theater and Employee)
@app.route('/admin_view_comDetail_combined', methods=['POST'])
def admin_view_comDetail_combined():
    if request.method == "POST":
        comName = request.json['comName']

        try:
            cur = connection.cursor()
            cur.callproc('admin_view_comDetail_emp', [comName])
            cur.execute('select concat(empfirstname, " ", emplastname) from adcomdetailemp')
            emp = cur.fetchall()
            emp = [i[0] for i in emp]
            cur.close()

            cur = connection.cursor()
            cur.callproc('admin_view_comDetail_th', [comName])
            cur.execute("""SELECT thName, concat(firstname, ' ', lastname) as manName, thCity, thState, thCapacity FROM 
                            team36.adcomdetailth inner join user on thManagerUsername = username; """)
            rv = cur.fetchall()
            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(emp,items)
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 17 (Create Movie)
@app.route('/admin_create_mov', methods=['POST'])
def admin_create_mov():
    if request.method == "POST":
        details = request.json
        name, duration, date = details['name'], details['duration'], details['releaseDate']

        try:
            cur = connection.cursor()
            cur.callproc('admin_create_mov', [name, duration, date])
            connection.commit() #Commit insertion
            cur.close()
            return "Movie Created"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 18 (Manager Filter Theater)
#Untested
@app.route('/manager_filter_th', methods=['POST'])
def manager_filter_th():
    if request.method == "POST":
        details = request.json
        manUsername, movName = details['manUsername'], details['movName']
        minMovDuration, maxMovDuration = none_convert(details['minMovDuration']), none_convert(details['maxMovDuration'])
        minMovReleaseDate, maxMovReleaseDate = none_convert(details['minMovReleaseDate']), none_convert(details['maxMovReleaseDate'])
        minMovPlayDate, maxMovPlayDate = none_convert(details['minMovPlayDate']), none_convert(details['maxMovPlayDate'])
        includeNotPlayed = none_convert(details['includeNotPlayed'])


        if minMovDuration and maxMovDuration:
            if minMovDuration > maxMovDuration:
                return make_response("Minimum movie duration must be less than the maximum",400)  
        if minMovReleaseDate and maxMovReleaseDate:
            if parser.parse(minMovReleaseDate) > parser.parse(maxMovReleaseDate):
                return make_response("Minimum release date must be before the maximum",400)  
        if minMovPlayDate and maxMovPlayDate:
            if parser.parse(minMovPlayDate) > parser.parse(maxMovPlayDate):
                return make_response("Minimum play date must be before the maximum",400)  

        try:
            cur = connection.cursor()
            cur.callproc('manager_filter_th', [manUsername,movName,minMovDuration,maxMovDuration,minMovReleaseDate,maxMovReleaseDate,minMovPlayDate,maxMovPlayDate,includeNotPlayed]) 
            cur.execute('SELECT * FROM manfilterth')
            rv = cur.fetchall()

            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(items)
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)  

#Screen 19 (Manager Schedule Movie)
@app.route('/manager_schedule_mov', methods=['POST'])
def manager_schedule_mov():
    if request.method == "POST":
        details = request.json
        manName, movName = details['manName'], details['movName']
        releaseDate, playDate = details['releaseDate'], details['playDate']

        if parser.parse(playDate) < parser.parse(releaseDate):
            return make_response("Release Date must be before Play Date",400)

        try:
            cur = connection.cursor()
            cur.callproc('manager_schedule_mov', [manName, movName, releaseDate, playDate])
            connection.commit() #Commit insertion
            cur.close()
            return "Movie Scheduled"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 20 (Get Movie Names, Company Names and Customer's Cards)
@app.route('/screen20_get_all', methods=['POST'])
def screen20_get_all():
    try:
        if request.method == "POST":
            details = request.json
            user = details['userName']

            cur = connection.cursor()
            cur.execute('SELECT name FROM movie')
            movies = cur.fetchall()
            movies = [i[0] for i in movies]
            cur.close()            

            cur = connection.cursor()
            cur.execute('SELECT name FROM company')
            companies = cur.fetchall()
            companies = [i[0] for i in companies]
            cur.close()

            cur = connection.cursor()
            cur.execute("SELECT creditcardnumber FROM creditcard where username = '{}'".format(user))
            cards = cur.fetchall()
            cards = [i[0] for i in cards]
            cur.close()
            return jsonify(movies, companies, cards)
    except mysql.connector.Error as error:
        msg = "Error occured: {}".format(error)
        return make_response(msg, 500)

#Screen 20 (Customer Filter Movie)
#Untested & Logical Constraints Not Done?
@app.route('/customer_filter_mov', methods=['POST'])
def customer_filter_mov():
    if request.method == "POST":
        details = request.json
        movName, comName, city, state = details['movName'], details['comName'], details['city'], details['state']
        minMovPlayDate, maxMovPlayDate = none_convert(details['minMovPlayDate']), none_convert(details['maxMovPlayDate'])

        if minMovPlayDate and maxMovPlayDate:
            if parser.parse(minMovPlayDate) > parser.parse(maxMovPlayDate):
                return make_response("Minimum play date must be before the maximum",400) 

        try:
            cur = connection.cursor()
            cur.callproc('customer_filter_mov', [movName, comName, city, state, minMovPlayDate, maxMovPlayDate]) 
            cur.execute('SELECT * FROM cosfiltermovie')
            rv = cur.fetchall()

            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(items)
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500) 

#Screen 20 (Customer View Movie)
#Please test logical constraint
@app.route('/customer_view_movie', methods=['POST'])
def customer_view_movie():
    if request.method == "POST":
        details = request.json
        cardNum, movName, releaseDate = details['cardNum'], details['movName'], details['releaseDate']
        thName, comName, playDate = details['thName'], details['comName'], details['playDate']

        try:
            cur = connection.cursor()
            cur.execute("""select * from customerviewmovie where creditcardnumber in
                        (select creditcardnumber from creditcard where username = 
                        (select username from creditcard where creditcardnumber = '{}'))
                        and viewdate = '{}';""".format(cardNum,playDate))
            rv = cur.fetchall()
            if len(rv) > 3:
                return make_response("Viewing more than 3 movies a day is not permitted", 400)
            
            cur.callproc('customer_view_mov', [cardNum, movName, releaseDate, thName, comName, playDate])
            connection.commit() #Commit insertion
            cur.close()
            return "Viewing Added"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 21 (Customer View History)
@app.route('/customer_view_history', methods=['POST'])
def customer_view_history():
    if request.method == "POST":
        user = request.json['userName']

        try:
            cur = connection.cursor()
            cur.callproc('customer_view_history', [user])
            cur.execute("select * from cosviewhistory")
            rv = cur.fetchall()
            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(items)
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 22 (Get Theater Names and Company Names)
@app.route('/screen22_get_all', methods=['GET'])
def screen22_get_all():
    try:
        if request.method == "GET":
            cur = connection.cursor()
            cur.execute('SELECT name FROM theater')
            theater = cur.fetchall()
            theater = [i[0] for i in theater]
            theater.insert(0,'ALL')
            cur.close()

            cur = connection.cursor()
            cur.execute('SELECT name FROM company')
            companies = cur.fetchall()
            companies = [i[0] for i in companies]
            cur.close()

            return jsonify(theater, companies)
    except mysql.connector.Error as error:
        cur.close()
        msg = "Error occured: {}".format(error)
        return make_response(msg, 500)


#Screen 22 (User Filter Theater)
@app.route('/user_filter_th', methods=['POST'])
def user_filter_th():
    if request.method == "POST":
        details = request.json
        thName, comName, city, state = details['thName'], details['comName'], details['city'], details['state']

        try:
            cur = connection.cursor()
            cur.callproc('user_filter_th', [thName, comName, city, state])
            cur.execute("select thName as theater, concat(thStreet,', ',thCity,', ',thState,' ',thZipcode) as address, comName as company from userfilterth")
            rv = cur.fetchall()
            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(items)
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 22 (User Visit Theater)
@app.route('/user_visit_th', methods=['POST'])
def user_visit_th():
    if request.method == "POST":
        details = request.json
        thName, comName, date, user = details['thName'], details['comName'], details['date'], details['userName']

        try:
            cur = connection.cursor()
            cur.callproc('user_visit_th', [thName, comName, date, user])
            connection.commit() #Commit insertion
            cur.close()
            return "Visit Logged"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 23 (User Filter Visit History)
@app.route('/user_filter_visitHistory', methods=['POST'])
def user_filter_visitHistory():
    if request.method == "POST":
        details = request.json
        user, minDate, maxDate, comName = details['userName'], details['minDate'], details['maxDate'], details['comName']
        minDate = none_convert(minDate)
        maxDate = none_convert(maxDate)

        if minDate and maxDate:
            if parser.parse(minDate) > parser.parse(maxDate):
                return make_response("Minimum Date must be before Maximum Date",400)           
        try:
            cur = connection.cursor()
            cur.callproc('user_filter_visitHistory', [user, minDate, maxDate])
            if comName == 'ALL':
                cur.execute("select thName as theater, concat(thStreet,', ',thCity,', ',thState,' ',thZipcode) as address, comName as company, visitDate from uservisithistory")
            else:    
                cur.execute("select thName as theater, concat(thStreet,', ',thCity,', ',thState,' ',thZipcode) as address, comName as company, visitDate from uservisithistory where comName = '{}'".format(comName))
            rv = cur.fetchall()
            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(items)
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Input Error: {}".format(error)
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

if __name__ == '__main__':
    app.run(debug=True)