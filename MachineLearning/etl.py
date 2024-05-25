import os
import mysql.connector
import pandas as pd
from mysql.connector import errorcode

class DATABASE:
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
        self.create_tables()

    def table_exists(self, table_name):
        self.cursor.execute(f"SHOW TABLES LIKE '{table_name}'")
        result = self.cursor.fetchone()
        return result is not None

    def create_tables(self):
        tables = {
            'historical_data': (
                "CREATE TABLE IF NOT EXISTS `historical_data` ("
                "  `id` INT AUTO_INCREMENT PRIMARY KEY,"
                "  `symbol` VARCHAR(10) NOT NULL,"
                "  `date` DATE NOT NULL,"
                "  `open_price` DECIMAL(10, 2) NOT NULL,"
                "  `close_price` DECIMAL(10, 2) NOT NULL,"
                "  `volume` INT NOT NULL"
                ") ENGINE=InnoDB"
            ),
            'model_results': (
                "CREATE TABLE IF NOT EXISTS `model_results` ("
                "  `id` INT AUTO_INCREMENT PRIMARY KEY,"
                "  `model_name` VARCHAR(255) NOT NULL,"
                "  `prediction_date` DATE NOT NULL,"
                "  `symbol` VARCHAR(10) NOT NULL,"
                "  `predicted_price` DECIMAL(10, 2) NOT NULL,"
                "  `actual_price` DECIMAL(10, 2)"
                ") ENGINE=InnoDB"
            )
        }

        for table_name, table_definition in tables.items():
            if not self.table_exists(table_name):
                try:
                    print(f"Creating table {table_name}...")
                    self.cursor.execute(table_definition)
                except mysql.connector.Error as err:
                    print(err.msg)
                else:
                    print(f"Table {table_name} created successfully.")
            else:
                print(f"Table {table_name} already exists.")

    def insert_data(self, table, data):
        placeholders = ', '.join(['%s'] * len(data))
        columns = ', '.join(data.keys())
        sql = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
        self.cursor.execute(sql, list(data.values()))
        self.connection.commit()

    def fetch_data(self, query):
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def close(self):
        self.cursor.close()
        self.connection.close()


class ETL:
    def __init__(self, db):
        self.db = db

    def extract(self, file_path):
        if not os.path.exists(file_path):
            print(f"Error: File {file_path} does not exist.")
            return None
        try:
            data = pd.read_csv(file_path)
            print(f"Data extracted successfully from {file_path}")
            return data
        except Exception as e:
            print(f"Error extracting data from {file_path}: {e}")
            return None

    def transform(self, data):
        try:
            data.rename(columns={
                'Date': 'date',
                'Open': 'open_price',
                'Close': 'close_price',
                'Volume': 'volume'
            }, inplace=True)
            data['symbol'] = 'BITCOIN'
            print("Data transformed successfully")
            return data[['date', 'symbol', 'open_price', 'close_price', 'volume']]
        except Exception as e:
            print(f"Error transforming data: {e}")
            return None

    def load(self, table, data):
        try:
            for _, row in data.iterrows():
                self.db.insert_data(table, row.to_dict())
            print(f"Data loaded successfully into {table}")
        except Exception as e:
            print(f"Error loading data into {table}: {e}")

if __name__ == "__main__":
    db = DATABASE(host='localhost', user='root', password='riad', database='peakpredict')
    etl = ETL(db)

    file_path = 'C:/Users/Riad/OneDrive/Bureau/pfa/DSS/Financial_Predictive_Analysis_Platform/MachineLearning/data/BITCOIN.csv'
    if os.path.exists(file_path):
        print(f"File {file_path} exists.")
    else:
        print(f"File {file_path} does not exist.")
    
    data = etl.extract(file_path)
    if data is not None:
        transformed_data = etl.transform(data)
        if transformed_data is not None:
            etl.load('historical_data', transformed_data)

    db.close()
