import pymongo

client = pymongo.MongoClient("mongodb://0.0.0.0:27017/")


db = client["recetario"]



def create_recipe():
    db["recipes"].insert_one({
        "name": "nueva receta",
        "portions": 1,
        "cook_time": 10,
        "procedure": "some procedure",
        "baseIngredients": [
            {
                "name": "ingredient",
                "quantity": 100,
                "unit": "gr"
            }
        ]
    })

def get_recipes():
    return [recipe for recipe in db["recipes"].find()]

