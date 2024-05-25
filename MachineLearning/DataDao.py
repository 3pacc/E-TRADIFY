import mysql.connector

class DataDAO:
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connection = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        )
        self.cursor = self.connection.cursor()

    def insert_historical_data(self, data):
        placeholders = ', '.join(['%s'] * len(data))
        columns = ', '.join(data.keys())
        sql = f"INSERT INTO historical_data ({columns}) VALUES ({placeholders})"
        self.cursor.execute(sql, list(data.values()))
        self.connection.commit()

    def fetch_all_historical_data(self):
        self.cursor.execute("SELECT * FROM historical_data")
        return self.cursor.fetchall()

    def insert_model_result(self, data):
        placeholders = ', '.join(['%s'] * len(data))
        columns = ', '.join(data.keys())
        sql = f"INSERT INTO model_results ({columns}) VALUES ({placeholders})"
        self.cursor.execute(sql, list(data.values()))
        self.connection.commit()

    def fetch_all_model_results(self):
        self.cursor.execute("SELECT * FROM model_results")
        return self.cursor.fetchall()

    def close(self):
        self.cursor.close()
        self.connection.close()
