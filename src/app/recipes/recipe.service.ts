import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";


@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    private recipes:Recipe[] = [
    //     new Recipe('cheeseCake' ,
    //      'cake with cheese base , cherries on top and crumbles from bottom',
    //      'https://www.thespruceeats.com/thmb/r8TCBwuaBBV5oBKc5vXzP7JvllU=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/gluten-free-new-york-cheesecake-1450985-hero-01-dc54f9daf38044238b495c7cefc191fa.jpg',
    //      [
    //         new Ingredient('white cheese',1) ,
    //          new Ingredient('berries' , 5) ,
    //          new Ingredient('eggs' , 1) , 
    //          new Ingredient('milk' ,1),
    //          new Ingredient('bread crumbs',1) 
    //      ])
    //   ,    new Recipe('cheeseCake2' , 
    //   'cake with cheese base , crumbles on top and  cherries from bottom',
    //   'https://www.thespruceeats.com/thmb/r8TCBwuaBBV5oBKc5vXzP7JvllU=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/gluten-free-new-york-cheesecake-1450985-hero-01-dc54f9daf38044238b495c7cefc191fa.jpg',
    //   [new Ingredient('white cheese',1) ,
    //    new Ingredient('berries' , 5) ,
    //    new Ingredient('eggs' , 1) ,
    //     new Ingredient('milk' , 1),
    //     new Ingredient('bread crumbs',1) ]
    //      )
        
    ];

    constructor(private slService :ShoppingListService){}


        setRecipes(recipes : Recipe[]){
            this.recipes = recipes;
            this.recipesChanged.next(this.recipes.slice());
        }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(id:number){
        return this.recipes[id];

    }

    addIngredientsToShoppingList(ingredients : Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number , newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index , 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}