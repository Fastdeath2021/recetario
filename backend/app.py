from flask import Flask, request
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

    return list(db.find("recipes").values())

@app.route("/recipes", methods=["POST"])
def insert_recipe():
    data = request.json
    db.insert("recipes", data)
    
    return {"status": "ok"}

if __name__ == "__main__":
    app.run("0.0.0.0", 5002)
