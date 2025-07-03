from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
import requests
import pandas as pd
import random
from datetime import datetime
from flask_cors import CORS

random_number = random.randint(14364546454654654654651465654, 9168468484867187618761871687171)
app = Flask(__name__, static_folder='static')
app.secret_key = str(random_number)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')  

@app.route('/success')
def success():
    if not session.get('form_submitted'):
        return redirect(url_for('index'))
    session.pop('form_submitted', None)  # Clear after access
    return render_template('success.html')

@app.route('/error')
def error_page():
    if not session.get('form_submitted'):
        return redirect(url_for('index'))
    session.pop('form_submitted', None)  # Clear after access
    return render_template('error.html')

@app.route('/submit', methods=['POST'])
def submit_form():    
    base_url = 'https://erpv14.electrolabgroup.com/'
    endpoint = 'api/resource/Visitor Information'
    url = base_url + endpoint
    headers = {
        'Authorization': 'token 3ee8d03949516d0:6baa361266cf807',
        'Content-Type': 'application/json'
    }
    try:
        form_data = {
            "naming_series": request.form.get('naming_series'),
            "source": request.form.get('source'),
            "status": request.form.get('status'),
            "new_customer_name": (request.form.get('new_customer_name', '') + " | Territory : " + request.form.get('state', '')),
            "state": request.form.get('state'),
            "contact_person": request.form.get('contact_person'),
            "contact_email_id": request.form.get('contact_email_id'),
            "contact_number": request.form.get('contact_number'),
            "remark": request.form.get('remark'),
        }

        response = requests.post(url, json=form_data, headers=headers)
        session['form_submitted'] = True
        if response.ok:
            return redirect(url_for('success'))
        else:
            return redirect(url_for('error_page'))            
    except Exception as e:
        print("Exception details:", str(e))
        flash(f'Error occurred: {str(e)}', 'error')
        session['form_submitted'] = True
        return redirect(url_for('error_page'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8888)
