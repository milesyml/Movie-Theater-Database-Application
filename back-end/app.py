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

#Screen 1
@app.route('/user_login', methods=['POST'])
def user_login():
    if request.method == "POST":
        details = request.json
        user = details['user']
        pw = details['pw']
        cur = connection.cursor()
        cur.callproc('user_login', [user,pw]) #Call login procedure
        cur.execute('SELECT * FROM userlogin') #Check login results
        rv = cur.fetchall()
        cur.close()

        if not rv: #Failed login
            return 'Login Failed'
            
        status, isCustomer, isAdmin, isManager = rv[0][1], rv[0][2], rv[0][3], rv[0][4]

        return str(rv)

#Screen 3
@app.route('/user_register', methods=['POST'])
def user_register():
    if request.method == "POST":
        details = request.json
        user = details['user']
        pw = details['pw']
        first = details['first']
        last = details['last']

        try:
            cur = connection.cursor()
            cur.callproc('user_register', [user,pw,first,last])
            connection.commit() #Commit insertion
            cur.close()
            return "User Registered"
        except mysql.connector.Error as error:
            return "Failed to execute stored procedure: {}".format(error)

#Screen 4
#Similar to user_register

#Get companies (Screen 5/6)
@app.route('/get_companies', methods=['GET'])
def get_companies():
    if request.method == "GET":
        cur = connection.cursor()
        cur.execute('SELECT * FROM company')
        rv = cur.fetchall()
        cur.close()
        return jsonify(rv)

if __name__ == '__main__':
    app.run(debug=True)