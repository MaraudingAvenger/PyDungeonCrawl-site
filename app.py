from flask import Flask, render_template
import os
import secrets

if not os.path.exists('.secret_key'):
    with open(".secret_key", "w") as f:
        f.write(secrets.token_urlsafe(16))

secret = open('.secret_key', 'r').read()

# App Initialization
app = Flask(__name__)

app.secret_key = secret

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/heroes')
def heroes():
    return render_template('heroes.html')

@app.route('/villains')
def villains():
    return render_template('villains.html')

@app.route('/api')
def api():
    return render_template('api.html')

if __name__ == '__main__':
    app.run(debug=True)