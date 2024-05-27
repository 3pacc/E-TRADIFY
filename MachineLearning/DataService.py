from DataDao import DataDAO

class DataService:
    def __init__(self, host, user, password, database):
        self.dao = DataDAO(host, user, password, database)

    def add_historical_data(self, data):
        self.dao.insert_historical_data(data)

    def get_all_historical_data(self):
        return self.dao.fetch_all_historical_data()

    def add_model_result(self, data):
        self.dao.insert_model_result(data)

    def get_all_model_results(self):
        return self.dao.fetch_all_model_results()

    def close(self):
        self.dao.close()
