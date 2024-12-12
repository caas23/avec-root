import json
from pymongo import MongoClient

filename = "lund.json"
username = "aule-caas"
password = "CUWs9rSE0I1xSKDT"

# MongoDB URI
uri = f"mongodb+srv://{username}:{password}@cluster0.k5lbc.mongodb.net/avec?retryWrites=true&w=majority&tls=false&connectTimeoutMS=60000&socketTimeoutMS=60000&appName=Cluster0"

# Connect to MongoDB
client = MongoClient(uri)
db = client["avec"]
collection = db["cities"]

# Load GeoJSON data
with open(f"./data/{filename}", "r", encoding="utf-8") as file:
    data = json.load(file)

# Insert data into MongoDB
collection.insert_one(data)

# Create a 2dsphere index for geospatial queries
collection.create_index([("geometry", "2dsphere")])

print(data[:100])
print("Data imported successfully!")