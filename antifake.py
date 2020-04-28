from flask import Flask, escape, request
from detect import check_if_fake
from flask_cors import CORS

app = Flask("antifake")
#跨域请求
CORS(app)
@app.route('/detect', methods=['POST'])
def detect():
    url = 'bruh'
    url = request.form.get('data')
    
    print(url)
    return check_if_fake(url)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='80',debug=True)