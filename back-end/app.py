from flask import Flask, render_template, request, jsonify, make_response
import mysql.connector
from mysql.connector import Error
from dateutil import parser

app = Flask(__name__)

#SQL Server Details Here
connection = mysql.connector.connect(host="localhost",
                                     user="test",
                                     password="password1234",
                                     database="team36")

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
        user, pw = details['user'], details['pw']

        cur = connection.cursor()
        cur.callproc('user_login', [user,pw]) #Call login procedure
        cur.execute('SELECT * FROM userlogin') #Check login results
        rv = cur.fetchall()

        if not rv: #Failed login
            cur.close()
            return make_response('Login Failed', 400)
            
        status, isCustomer, isAdmin, isManager = rv[0][1], rv[0][2], rv[0][3], rv[0][4]
        items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
        cur.close()
        return jsonify(items)


#Screen 3 (User Register)
@app.route('/user_register', methods=['POST'])
def user_register():
    if request.method == "POST":
        details = request.json
        user, pw, first, last = details['user'], details['pw'], details['first'], details['last']

        try:
            cur = connection.cursor()
            cur.callproc('user_register', [user,pw,first,last])
            connection.commit() #Commit insertion
            cur.close()
            return "User Registered"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "User already exists"
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
        user, pw, first, last = details['user'], details['pw'], details['first'], details['last']

        try:
            cur = connection.cursor()
            cur.callproc('customer_only_register', [user,pw,first,last])
            connection.commit() #Commit insertion
            cur.close()
            return "Customer Registered"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "User already exists"
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
        user, cards  = details['user'], details['cards'] #List in json

        try:
            cur = connection.cursor()
            for card in cards:
                cur.callproc('customer_add_creditcard', [user,card])
            connection.commit() #Commit insertion
            cur.close()
            return "Cards Added"
        except mysql.connector.IntegrityError as error:
            cur.close()
            msg = "Credit Card already exists: {}".format(error)
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
        user, pw, first, last = details['user'], details['pw'], details['first'], details['last']
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
            msg = "User already exists"
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
        user, pw, first, last = details['user'], details['pw'], details['first'], details['last']
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
            msg = "User already exists"
            return make_response(msg, 400)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 500)

#Screen 13 (Admin Filter User)

#Screen 13 (User Approval)
@app.route('/admin_approve_user', methods=['POST'])
def approve_user():
    if request.method == "POST":
        user = request.json['user']

        try:
            cur = connection.cursor()
            cur.callproc('admin_approve_user', [user])
            connection.commit() #Commit update
            cur.close()
            return "User Approved"
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 400)

#Screen 13 (User Decline)
@app.route('/admin_decline_user', methods=['POST'])
def decline_user():
    if request.method == "POST":
        user = request.json['user']

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
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 400)

#Screen 14 (Admin Filter Company)

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
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 400)

#Screen 16 (Company Detail for Employee)
@app.route('/admin_view_comDetail_emp', methods=['POST'])
def admin_view_comDetail_emp():
    if request.method == "POST":
        comName = request.json['comName']

        try:
            cur = connection.cursor()
            cur.callproc('admin_view_comDetail_emp', [comName])
            cur.execute('select concat(empfirstname, " ", emplastname) from adcomdetailemp')
            rv = cur.fetchall()
            cur.close()
            return jsonify(rv)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 400)

#Screen 16 (Company Detail for Theater)
@app.route('/admin_view_comDetail_th', methods=['POST'])
def admin_view_comDetail_th():
    if request.method == "POST":
        comName = request.json['comName']

        try:
            cur = connection.cursor()
            cur.callproc('admin_view_comDetail_th', [comName])
            cur.execute("""SELECT thName, concat(firstname, ' ', lastname) as manName, thCity, thState, thCapacity FROM 
                            team36.adcomdetailth inner join user on thManagerUsername = username; """)
            rv = cur.fetchall()
            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(items)
        except mysql.connector.Error as error:
            cur.close()
            msg = "Failed to execute stored procedure: {}".format(error)
            return make_response(msg, 400)

#Screen 17 (Create Movie)
@app.route('/admin_create_mov', methods=['POST'])
def admin_create_mov():
    if request.method == "POST":
        details = request.json
        name, duration, date = details['name'], details['duration'], details['date']

        try:
            cur = connection.cursor()
            cur.callproc('admin_create_mov', [name, duration, date])
            connection.commit() #Commit insertion
            cur.close()
            return "Movie Created"
        except mysql.connector.Error as error:
            cur.close()
            return "Failed to execute stored procedure: {}".format(error)

#Screen 18 (Manager Filter Theater)

#Screen 19 (Manager Schedule Movie)
#Untested
@app.route('/manager_schedule_mov', methods=['POST'])
def manager_schedule_mov():
    if request.method == "POST":
        details = request.json
        manName, movName = details['manName'], details['movName']
        releaseDate, playDate = details['releaseDate'], details['playDate']

        if parser.parse(playDate) < parser.parse(releaseDate):
            return "Release Date must be before Play Date"

        try:
            cur = connection.cursor()
            cur.callproc('manager_schedule_mov', [manName, movName, releaseDate, playDate])
            connection.commit() #Commit insertion
            cur.close()
            return "Movie Scheduled"
        except mysql.connector.Error as error:
            cur.close()
            return "Failed to execute stored procedure: {}".format(error)

#Screen 20 (Get Customer's Cards)
@app.route('/get_customer_cards', methods=['POST'])
def get_customer_cards():
    if request.method == "POST":
        details = request.json
        user = details['user']

        cur = connection.cursor()
        cur.execute("SELECT creditcardnumber FROM creditcard where username = '{}'".format(user))
        rv = cur.fetchall()
        cur.close()
        return jsonify(rv)

#Screen 20 (Customer Filter Movie)

#Screen 20 (Customer View Movie)
#Untested & logical constraint of 3 movies per day not added
@app.route('/customer_view_movie', methods=['POST'])
def customer_view_movie():
    if request.method == "POST":
        details = request.json
        cardNum, movName, releaseDate = details['cardNum'], details['movName'], details['releaseDate']
        thName, comName, playDate = details['thName'], details['comName'], details['playDate']

        try:
            cur = connection.cursor()
            cur.callproc('customer_view_movie', [cardNum, movName, releaseDate, thName, comName, playDate])
            connection.commit() #Commit insertion
            cur.close()
            return "Viewing Added"
        except mysql.connector.Error as error:
            cur.close()
            return "Failed to execute stored procedure: {}".format(error)

#Screen 21 (Customer View History)
@app.route('/customer_view_history', methods=['POST'])
def customer_view_history():
    if request.method == "POST":
        user = request.json['user']

        try:
            cur = connection.cursor()
            cur.callproc('customer_view_history', [user])
            cur.execute("select * from cosviewhistory")
            rv = cur.fetchall()
            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(items)
        except mysql.connector.Error as error:
            cur.close()
            return "Failed to execute stored procedure: {}".format(error)

#Screen 22 (Get Theater Names)
@app.route('/get_theater', methods=['GET'])
def get_theater():
    if request.method == "GET":
        cur = connection.cursor()
        cur.execute('SELECT name FROM theater')
        rv = cur.fetchall()
        rv.insert(0,['ALL'])
        cur.close()
        return jsonify(rv)

#Screen 22 (User Filter Theater)
#Untested, procedure needs to be fixed
@app.route('/user_filter_th', methods=['POST'])
def user_filter_th():
    if request.method == "POST":
        details = request.json
        thName, comName, city, state = details['thName'], details['comName'], details['city'], details['state']

        try:
            cur = connection.cursor()
            cur.callproc('user_filter_th', [thName, comName, city, state])
            cur.execute("select * from userfilterth")
            rv = cur.fetchall()
            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(items)
        except mysql.connector.Error as error:
            cur.close()
            return "Failed to execute stored procedure: {}".format(error)

#Screen 22 (User Visit Theater)
#Untested, procedure needs to be fixed
@app.route('/user_visit_th', methods=['POST'])
def user_visit_th():
    if request.method == "POST":
        details = request.json
        thName, comName, date, user = details['thName'], details['comName'], details['date'], details['user']

        try:
            cur = connection.cursor()
            cur.callproc('user_visit_th', [thName, comName, date, user])
            connection.commit() #Commit insertion
            cur.close()
            return "Visit Logged"
        except mysql.connector.Error as error:
            cur.close()
            return "Failed to execute stored procedure: {}".format(error)

#Screen 23 (User Filter Visit History)
#Untested, procedure needs to be fixed
@app.route('/user_filter_visitHistory', methods=['POST'])
def user_filter_visitHistory():
    if request.method == "POST":
        details = request.json
        user, minDate, maxDate = details['user'], details['minDate'], details['maxDate']

        try:
            cur = connection.cursor()
            cur.callproc('user_filter_visitHistory', [user, minDate, maxDate])
            cur.execute("select * from uservisithistory")
            rv = cur.fetchall()
            items = [dict(zip([key[0] for key in cur.description],row)) for row in rv]
            cur.close()
            return jsonify(items)
        except mysql.connector.Error as error:
            cur.close()
            return "Failed to execute stored procedure: {}".format(error)

if __name__ == '__main__':
    app.run(debug=True)