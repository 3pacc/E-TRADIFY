import os
import pandas as pd
import numpy as np
import math
import datetime as dt
import yfinance as yf
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
from xgboost import XGBRegressor

# Step 1: Charger les données
crypto_currency = 'BTC'
against_currency = 'USD'
start = dt.datetime(2012, 1, 1)
end = dt.datetime.now()
bitcoindf = yf.download(f'{crypto_currency}-{against_currency}', start, end)
bitcoindf = bitcoindf.reset_index()
bitcoindf = bitcoindf.rename(columns={'Date': 'date','Open':'open','High':'high','Low':'low','Close':'close', 'Adj Close':'adj_close','Volume':'volume'})
bitcoindf.head()

# Step 2: Préparation des données
bitcoindf = bitcoindf.fillna(method='ffill')
closedf = bitcoindf[['date','close']]
closedf = closedf[closedf['date'] > '2014-04-10']
close_stock = closedf.copy()
del closedf['date']
scaler = MinMaxScaler(feature_range=(0, 1))
closedf = scaler.fit_transform(np.array(closedf).reshape(-1, 1))

# Step 3: Séparation des données en ensembles d'entraînement et de test
training_size = int(len(closedf)*0.70)
test_size = len(closedf) - training_size
train_data, test_data = closedf[0:training_size, :], closedf[training_size:len(closedf), :1]

# Step 4: Création des datasets pour l'entraînement et le test
def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset)-time_step-1):
        a = dataset[i:(i+time_step), 0]
        dataX.append(a)
        dataY.append(dataset[i + time_step, 0])
    return np.array(dataX), np.array(dataY)

time_step = 20
X_train, y_train = create_dataset(train_data, time_step)
X_test, y_test = create_dataset(test_data, time_step)

# Step 5: Entraînement du modèle XGBoost
my_model = XGBRegressor(n_estimators=1000)
my_model.fit(X_train, y_train, verbose=False)

# Step 6: Faire des prédictions sur les données de test
predictions = my_model.predict(X_test)

# Step 7: Calculer les erreurs de prédiction
mae = mean_absolute_error(y_test, predictions)
rmse = math.sqrt(mean_squared_error(y_test, predictions))

# Inverser la transformation pour obtenir les valeurs prédictives et réelles d'origine
test_predict = my_model.predict(X_test).reshape(-1,1)
test_predict = scaler.inverse_transform(test_predict)
original_ytest = scaler.inverse_transform(y_test.reshape(-1,1))

# Step 8: Prédiction pour le jour suivant
last_data = test_data[-time_step:].reshape(1, -1)
next_day_prediction_scaled = my_model.predict(last_data)
next_day_prediction = scaler.inverse_transform(next_day_prediction_scaled.reshape(-1, 1))

# Déterminer si "Buy" ou "Sell"
current_price = original_ytest[-1][0]  # Convertir en float
next_day_price = next_day_prediction[0, 0]
decision = "Buy" if next_day_price > current_price else "Sell"
accuracy = (1 - mae / current_price) * 100

# Afficher le résultat pour le jour suivant
print(f"Current price: {current_price:.2f}")
print(f"Predicted price for the next day: {next_day_price:.2f}")
print(f"Decision: {decision}")
print(f"Prediction accuracy: {accuracy:.2f}%")

# Visualisation des résultats
plt.figure(figsize=(14, 7))
plt.plot(original_ytest, color='blue', label='Actual Prices')
plt.plot(test_predict, color='red', label='Predicted Prices')
plt.title('Actual vs Predicted Prices')
plt.xlabel('Time')
plt.ylabel('Price')
plt.legend()
plt.show()