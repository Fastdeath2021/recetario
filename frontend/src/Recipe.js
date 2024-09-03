import React from "react";
import { Search } from "./Search";
import { RecipeInput } from "./RecipeInput";
import "./Recipe.css"



class Recipe extends React.Component {
    constructor(props) {
      super(props);
      this.root = props.root;
      this.state = {
        category: props.data.category ? props.data.category : "desayuno",
        id: props.data.id,
        portions: props.data.portions,
        name: props.data.name,
        cook_time: props.data.cook_time,
        procedure: props.data.procedure,
        baseIngredients: props.data.baseIngredients,
        calculatedIngredients: props.data.baseIngredients,
      };
    }
    async deleteRecipe (){
        let response = await fetch (
            "http://localhost:5002/recipes?id="+this.state.id,
            {
                method: "DELETE"
            }
        )
        if (response.status == 200) {
            this.root.setComponent(Search)
        }
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
      return (
        <div className="receta-detail">
          <div className="detail">
            <div className="receta-info">
              <img
                className="icon icon-back"
                onClick={() => this.root.setComponent(Search, null)}
              ></img>
              <h1 className="nom">{this.state.name}</h1>
              <p className="category-label">{this.state.category}</p>
              <button onClick={(e)=> this.root.setComponent(RecipeInput, this.state)}>modificar receta</button>
              <div className="cook-time">
                <img className="icon icon-clock"></img>
                <p className="tc">
                  Tiempo de coccion {this.state.cook_time} minutos
                </p>
              </div>
              <div className="preparacion">
                <h1 className="mt">Metodo:</h1>
                {typeof this.state.procedure == "object" &&
                this.state.procedure.map ((step, index) => {
                  return (
                    <div> 
                    <p>{index+1}. {step.content}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="ingredientes">
              <h1 className="i">Ingredientes:</h1>
              <label>Porciones</label>
              <input
                onChange={(e) => this.calculateIngredients(e.target.value)}
                value={this.state.portions}
              ></input>
              <table>
                <tr>
                  <th className="name">Nombre</th>
                  <th className="Cant">Cantidad</th>
                </tr>
  
                {this.state.calculatedIngredients.map((ingredient) => {
                  return (
                    <tr>
                      <td className="h">{ingredient.name}</td>
                      <td className="h">
                        {ingredient.quantity}
                        {ingredient.unit}
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          <button onClick={(e)=> this.deleteRecipe() }>eliminar receta</button>
        </div>
      );
    }
  }
  
  export {Recipe}