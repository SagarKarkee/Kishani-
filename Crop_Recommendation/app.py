from flask import Flask, request, render_template
import numpy as np
import pickle

# Load pre-trained models and scalers
model = pickle.load(open('model.pkl', 'rb'))
sc = pickle.load(open('standscaler.pkl', 'rb'))
mx = pickle.load(open('minmaxscaler.pkl', 'rb'))

app = Flask(__name__)

# Home route
@app.route('/')
def index():
    return render_template("index.html")

# Prediction route
@app.route("/predict", methods=['POST'])
def predict():
    try:
        # Fetch data from form
        N = float(request.form['Nitrogen'])
        P = float(request.form['Phosporus'])
        K = float(request.form['Potassium'])
        temp = float(request.form['Temperature'])
        humidity = float(request.form['Humidity'])
        ph = float(request.form['pH'])
        rainfall = float(request.form['Rainfall'])

        # Prepare feature list for prediction
        feature_list = [N, P, K, temp, humidity, ph, rainfall]
        single_pred = np.array(feature_list).reshape(1, -1)

        # Apply scaling transformations
        mx_features = mx.transform(single_pred)
        sc_mx_features = sc.transform(mx_features)

        # Generate prediction
        prediction = model.predict(sc_mx_features)

        # Define crop dictionary for interpretation
        crop_dict = {
            1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut", 6: "Papaya", 7: "Orange",
            8: "Apple", 9: "Muskmelon", 10: "Watermelon", 11: "Grapes", 12: "Mango", 13: "Banana",
            14: "Pomegranate", 15: "Lentil", 16: "Blackgram", 17: "Mungbean", 18: "Mothbeans",
            19: "Pigeonpeas", 20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
        }

        # Get result from the prediction
        if prediction[0] in crop_dict:
            crop = crop_dict[prediction[0]]
            result = f"{crop} is the best crop to be cultivated right there."
        else:
            result = "Sorry, we could not determine the best crop to be cultivated with the provided data."

    except Exception as e:
        result = f"Error: {str(e)}"

    # Render result back to index.html
    return render_template('index.html', result=result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

