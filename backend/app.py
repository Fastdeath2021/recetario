from flask import Flask, request, jsonify
from flask_cors import CORS
from db import DBEngine

db = DBEngine("test")

app = Flask(__name__)
CORS (app)


class Ingredient:
    def __init__(self) -> None:
        self.name = "Ingredient"
        self.quantity = 100
        self.unit = "gr"


class Recipe:
    def __init__(self) -> None:
        self.portions = 1
        self.name = "Nombre"
        self.cook_time = 10
        self.procedure ="procedimiento"
        self.baseIngredients = [
            Ingredient(),
            Ingredient()
        ]
    
    def data(self):
        recipe = self.__dict__
        recipe["baseIngredients"] = [i.__dict__ for i in self.baseIngredients]
        return recipe

recipe = {
    "portions": 1,
    "name": "Empanadas de Pollo",
    "cook_time": 10,
    "procedure": "absnkxjjksaxhbsnkabjxhbjsa",
    "baseIngredients": [
        {
            "name": "Harina",
            "quantity": 500,
            "unit": "gr",
        },
        {
            "name": "Pollo",
            "quantity": 250,
            "unit": "gr",
        },
    ],
}



@app.route("/", methods=["GET"])
def index():
    return "hola mundo"



@app.route("/recetas", methods=["GET"])
def receta():
    keyword = request.args.get("keyword")

    # TODO: usar el keyword para buscar recetas
    # que contenga el keyword en el nombre

    print("Parametro de la peticion:", keyword)

    if keyword == "undefined" or keyword == "null":
        keyword = None

    if keyword:
        all_recipes = list(db.find("recipes").values())
        recipes= []
        for recipe in all_recipes:
            if keyword.lower() in recipe.get("name").lower():
                recipes.append(recipe)
                continue
            if any ([keyword.lower() in ingredient.get("name") for ingredient in recipe.get("baseIngredients")]):
                recipes.append(recipe)
                continue
        return recipes  

    return list(db.find("recipes").values())

@app.route("/recipes", methods=["POST"])
def insert_recipe():
    data = request.json
    recipe_id = None
    if data.get("id"):
        recipe_id = data.get("id")
        query = {"id": data.get("id")}
        db.update("recipes", query, data)
    else:  
        recipe_id = db.insert("recipes", data)
    
    return {"recipe_id": recipe_id}

@app.route("/recipes", methods=["DELETE"])
def delete_recipe():
    recipe_id = request.args.get("id")
    if recipe_id: 
        db.delete("recipes", {"id": recipe_id})
        return jsonify(status="ok"), 200
    else:
        return jsonify(error="noid"), 500



if __name__ == "__main__":
    app.run("0.0.0.0", 5002)
