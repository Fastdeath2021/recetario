import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { getRecipes } from "./recipes";
import image from "./images/empanadas-pollo-jugosas.jcpg";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.root = props.root;
    this.state = {
      portions: props.data.portions,
      name: props.data.name,
      cook_time: props.data.cook_time,
      procedure: props.data.procedure,
      baseIngredients: props.data.baseIngredients,
      calculatedIngredients: props.data.baseIngredients,
    };
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
            <div className="cook-time">
              <img className="icon icon-clock"></img>
              <p className="tc">
                Tiempo de coccion {this.state.cook_time} minutos
              </p>
            </div>
            <div className="preparacion">
              <h1 className="mt">Metodo:</h1>
              <p>{this.state.procedure}</p>
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
      </div>
    );
  }
}

class RecetaCard extends React.Component {
  constructor(props) {
    super(props);
    this.root = props.root;

    this.state = props.data;
  }

  render() {
    return (
      <div
        className="receta-card"
        onClick={(e) => this.root.root.setComponent(Recipe, this.state)}
      >
        <img src={image}></img>
        <h1>{this.state.name}</h1>
        <p>{this.state.cook_time} minutos</p>
      </div>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.root = props.root;
    this.state = {
      input: null,
      recipes: null,
    };
  }

  async loadRecipes(keyword) {
    let recipes = await getRecipes(keyword);
    this.setState(() => ({ recipes: recipes }));
  }

  updateInput(keyword) {
    this.loadRecipes(keyword);
  }

  render() {
    console.log(this.state.input);

    if (!this.state.recipes) {
      this.loadRecipes();
      return <></>
    }

    return (
      <div className="center-container">
        <div className="fondotitle">
          <h1 className="titulo">Recetario</h1>
        </div>
        <input
          value={this.state.input}
          onChange={(e) => this.updateInput(e.target.value)}
          placeholder="Que receta buscas hoy?"
        ></input>
        <div className="categorias">
          <p>Desayunos</p>
          <p>Almuerzos</p>
          <p>Cenas</p>
          <p>postres</p>
        </div>
        <strong className="recipesfavs">Recetas favoritas</strong>

        <div className="recetas">
          {this.state.recipes.map((recipe) => {
            return <RecetaCard root={this} data={recipe}></RecetaCard>;
          })}
        </div>
      </div>
    );
  }
}

export { Recipe, Search };
