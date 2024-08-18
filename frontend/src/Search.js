import React from "react";
import { RecipeInput } from "./RecipeInput";
import { Recipe } from "./Recipe";
import { getRecipes } from "./recipes";
import image from "./images/empanadas-pollo-jugosas.jpg";


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

    async loadRecipes() {
        let recipes = await getRecipes(this.state.input);
        this.setState(() => ({ recipes: recipes }));
    }

    updateInput(keyword) {
        this.setState((p)=>({input: keyword}))
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
                    onChange={(e) =>{
                            this.updateInput(e.target.value);
                        }
                    }
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            this.setState((p) => ({recipes: null}))
                        }
                    }}  
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
                <button className="add-recipe" onClick={() => this.root.setComponent(RecipeInput)}>agregar nueva receta</button>
            </div>

        );
    }
}

export { Search }