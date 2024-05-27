class HistoricalData:
    def __init__(self, id, symbol, date, open_price, close_price, volume):
        self.id = id
        self.symbol = symbol
        self.date = date
        self.open_price = open_price
        self.close_price = close_price
        self.volume = volume

class ModelResult:
    def __init__(self, id, model_name, prediction_date, symbol, predicted_price, actual_price=None):
        self.id = id
        self.model_name = model_name
        self.prediction_date = prediction_date
        self.symbol = symbol
        self.predicted_price = predicted_price
        self.actual_price = actual_price