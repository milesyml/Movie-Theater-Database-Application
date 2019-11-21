from flask import Flask, render_template, request
from flask_mysqldb import MySQL

app = Flask(__name__)

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

@app.route('/user_register', methods=['POST'])
def user_register():
    if request.method == "POST":
        user = request.json['user']
        pw = request.json['pw']
        first = request.json['first']
        last = request.json['last']

        try:
            cur = mysql.connection.cursor()
            cur.callproc('user_register', [user,pw,first,last])
            mysql.connection.commit() #Commit insertion
            cur.close()
            return "User Registered"
        except:
            return "Error occured"

if __name__ == '__main__':
    app.run(debug=True)