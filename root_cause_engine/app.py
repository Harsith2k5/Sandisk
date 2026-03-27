from flask import Flask, render_template, request, jsonify
from engine import generate_output

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json

    result = generate_output(data)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)