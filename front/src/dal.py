import mysql.connector as mysql
import pandas as pd



class DataBase:
    def __init__(self):
        pass

    @staticmethod
    def connect():
        return mysql.connect(
            host="localhost",
            user="root",
            password="riad",
        )
