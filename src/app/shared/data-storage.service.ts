import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn:'root'})
export class DataStorageService {
    constructor(private http : HttpClient , private recipeService : RecipeService , private authService : AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        if(recipes.length>0){
            this.http.put(
                'https://angular-learn-da763-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
                recipes)
                .subscribe(response => {
                    console.log(response);
                });
        }else{
            console.log('Good!');
        }
        
    }

    fetchRecipes(){
        //'take' tells RxJS that i only want to take 1 value from that observable and after it should auto unsubscribe
        return this.http
            .get<Recipe[]>('https://angular-learn-da763-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(
                        recipe => {
                            return {...recipe , ingredients: recipe.ingredients ? recipe.ingredients : []};
                    })  
                }),
                tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }));       
    }
}