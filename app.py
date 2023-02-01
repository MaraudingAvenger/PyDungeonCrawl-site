from flask import Flask, render_template

app = Flask(__name__)


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


if __name__ == "__main__":
    app.run(debug=True)