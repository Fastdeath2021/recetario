import React from "react";
import { Recipe } from "./Recipe";
import "./RecipeInput.css";
import { Search } from "./Search";

class RecipeInput extends React.Component {
  constructor(props) {
    super(props);
    this.root = props.root;
    this.state = {
      id: props.data ? props.data.id : null,
      portions: props.data ? props.data.portions : 0,
      name: props.data ? props.data.name : "nueva receta",
      cook_time: props.data ? props.data.cook_time : 0,
      procedure: props.data ? props.data.procedure : "procedimiento",
      baseIngredients: props.data ? props.data.baseIngredients : [],
      calculatedIngredients: props.data ? props.data.calculatedIngredients : [],
    };
  }

  deleteIngredient(index) {
    this.setState((p) => {
      let baseIngredients = [...p.baseIngredients];
      baseIngredients.splice(index, 1);
      return { baseIngredients: baseIngredients };
    });
  }

  async saveRecipe() {
    let response = await fetch("http://localhost:5002/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    });
    if (response.status == 200) {
      let data = await response.json();
      let recipeId = data.recipe_id;
      this.root.setComponent(
        Recipe,
        Object.assign({}, this.state, { id: recipeId })
      );
    }
  }

  updateBaseIngredients(index, key, value) {
    this.setState((p) => {
      p.baseIngredients[index][key] = value;
      return p;
    });
  }

  updateRecipe(key, value) {
    this.setState((p) => {
      p[key] = value;
      return p;
    });
  }

  calculateIngredients(portions) {
    if (!portions) {
      this.setState(() => ({ portions: portions }));
    }
    this.setState((previous) => {
      let calculatedIngredients = [];

      previous.baseIngredients.forEach((ingredient) => {
        let value = portions * ingredient.quantity;

        calculatedIngredients.push({
          name: ingredient.name,
          quantity: value,
          unit: ingredient.unit,
        });
      });

      return {
        calculatedIngredients: calculatedIngredients,
        portions: portions,
      };
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="receta-detail">
        <div className="detail">
          <div className="receta-info">
            <img
              className="icon icon-back"
               onClick={() => this.root.setComponent(Search, null)}
            ></img>
            <input
              className="edit-recipe-name"
              value={this.state.name}
              onChange={(e) => this.updateRecipe("name", e.target.value)}
            ></input>
            <div className="cook-time">
              <img className="icon icon-clock edit"></img>
              <p>tiempo de coccion</p>
              <input
                type="number"
                className="edit-cook-time"
                value={this.state.cook_time}
                onChange={(e) => this.updateRecipe("cook_time", e.target.value)}
              ></input>
              <p>minutos</p>
            </div>
            <div className="preparacion">
              <h1 className="mt">Metodo:</h1>
              <textarea
                value={this.state.procedure}
                onChange={(e) => this.updateRecipe("procedure", e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="ingredientes">
            <h1 className="i">Ingredientes:</h1>
            <label>Porciones</label>
            <input
                className="portions-input"
              type="number"
              onChange={(e) => this.calculateIngredients(e.target.value)}
              value={this.state.portions}
            ></input>
            <table>
              <tr>
                <th className="name">Nombre</th>
                <th className="Cant">Cantidad</th>
              </tr>

              {this.state.baseIngredients.map((ingredient, index) => {
                return (
                  <tr className="ingredient-row">
                    <td className="h">
                      <input className="ingredient-name"  
                        value={ingredient.name}
                        onChange={(e) =>
                          this.updateBaseIngredients(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      ></input>
                    </td>
                    <td className="h">
                      <input 
                        type="number"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          this.updateBaseIngredients(
                            index,
                            "quantity",
                            e.target.value
                          )
                        }
                      ></input>
                    </td>
                    <td>
                      <input className="input-unit"
                        value={ingredient.unit}
                        onChange={(e) =>
                          this.updateBaseIngredients(
                            index,
                            "unit",
                            e.target.value
                          )
                        }
                      ></input>
                    </td>
                    <td>
                      <button className="edit-buttons"
                        onClick={(e) => this.deleteIngredient(index)}
                      >Borrar</button>
                    </td>
                  </tr>
                );
              })}
            </table>
            <button className="edit-buttons add"
              onClick={() =>
                this.setState((p) => {
                  let baseIngredients = [...p.baseIngredients];
                  baseIngredients.push({
                    name: "nombre",
                    quantity: 0,
                    unit: "gr",
                  });
                  return { baseIngredients: baseIngredients };
                })
              }
            >
              Agregar ingrediente
            </button>
          </div>
        </div>
        <button className="edit-buttons save" onClick={(e) => this.saveRecipe()}>Guardar receta</button>
      </div>
    );
  }
}

export { RecipeInput };
