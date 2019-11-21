from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

#SQL Server Details Here
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'test'
app.config['MYSQL_PASSWORD'] = 'password1234'
app.config['MYSQL_DB'] = 'team36'

mysql = MySQL(app)

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/get_users')
def get_users():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM user')
    rv = cur.fetchall()
    cur.close()
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
            cur = mysql.connection.cursor()
            cur.callproc('user_register', [user,pw,first,last])
            mysql.connection.commit() #Commit insertion
            cur.close()
            return "User Registered"
        except:
            return "Error occured"

#Get companies (Screen 5/6)
@app.route('/get_companies', methods=['GET'])
def get_companies():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM company')
    rv = cur.fetchall()
    cur.close()
    return jsonify(rv)

if __name__ == '__main__':
    app.run(debug=True)