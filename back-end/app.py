from flask import Flask, render_template, request, jsonify
import mysql.connector
from mysql.connector import Error

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
    cur.execute('SELECT * FROM user')
    rv = cur.fetchall()
    cur.close()
    return str(rv)

#General (Get company names)
@app.route('/get_companies', methods=['GET'])
def get_companies():
    if request.method == "GET":
        cur = connection.cursor()
        cur.execute('SELECT * FROM company')
        rv = cur.fetchall()
        cur.close()
        return jsonify(rv)

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
        cur.close()

        if not rv: #Failed login
            return 'Login Failed'
            
        status, isCustomer, isAdmin, isManager = rv[0][1], rv[0][2], rv[0][3], rv[0][4]

        return str(rv)

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
        except mysql.connector.Error as error:
            cur.close()
            return "Failed to execute stored procedure: {}".format(error)

#Screen 4 (Customer Register)
#Similar to user_register

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
        except mysql.connector.Error as error:
            cur.close()
            return "Failed to execute stored procedure: {}".format(error)      

#Screen 5 (Manager Register)

#Screen 6 (Manager-Customer Register)

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
            return "Failed to execute stored procedure: {}".format(error)

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
                return "Unable to decline approved user"
            cur.callproc('admin_decline_user', [user])
            connection.commit() #Commit update
            cur.close()
            return "User Declined"
        except mysql.connector.Error as error:
            cur.close()
            return "Failed to execute stored procedure: {}".format(error)

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
            return "Error occured: {}".format(error)

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
            return "Failed to execute stored procedure: {}".format(error)

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
            return "Failed to execute stored procedure: {}".format(error)

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
            return "Failed to execute stored procedure: {}".format(error)

if __name__ == '__main__':
    app.run(debug=True)