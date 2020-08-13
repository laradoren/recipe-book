<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApiRecipeRequest;
use Illuminate\Http\Request;
use App\Recipe;
use App\Comment;
use App\Like;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    public function index()
    {
      $recipes = Recipe::orderBy('created_at', 'desc')->get();
        foreach ($recipes as $elem) {          
          $elem->image  = Storage::url($elem->image);
        }
        return $recipes->toJson();
    }    

    public function create(ApiRecipeRequest $request)
    {
      $image_path_recipe = $request->file('image')->store('downloaded_images');
      $validate_data_recipe = $request->all();
      $validate_data_recipe['image'] = $image_path_recipe;
      $newrecipe = Recipe::create($validate_data_recipe);
      
      return $newrecipe->toJson();
    }

    public function show($id)
    {
      $recipe = Recipe::where('id',$id)->first();
      $recipe->image = Storage::url($recipe->image);
      return $recipe->toJson();
    }

    public function update(Request $request, $id)
    {
      $recipe = Recipe::find($id);
      $params = $request->all();
      if ($request->has('image')) {
        $path = $request->file('image')->store('downloaded_images');
        if ($path !== $recipe->image) {
            Storage::delete($recipe->image);
            $params["image"]=$path;
        } 
      }
      $recipe->update($params);
      return response()->json([
        'message' => 'recipe update',
        'recipe' => $recipe,
      ]);           
    }

    public function delete($id)
    {
        Recipe::find($id)->delete();
        $comments = Comment::where('recipe', $id)->delete();
        return response()->json('Recipe delete!',200);;
    }

    public function showMy($id)
    {
      $recipes = Recipe::orderBy('created_at', 'desc')->where('user_id', $id)->get();
        foreach ($recipes as $elem) {          
          $elem->image  = Storage::url($elem->image);
        }
        return $recipes->toJson();
    }

    public function indexLike($id) {
      $recipe = Recipe::find($id);
      return response()->json([
        'likes' => $recipe->likes
      ]);
    }

    public function like(Request $request, $id) {
      $recipeId = $id;
      $userId = $request->all();
      $currentRecipe = Recipe::where('id', $recipeId)->first();
      $onlyRecipes = Like::where('recipe_id', $recipeId)->get();
      if($onlyRecipes->isEmpty()) {
        Like::create([
            'user_id' => $userId[0],
            'recipe_id' => $recipeId
        ]);
        $currentRecipe->likes = $currentRecipe->likes + 1;
        $currentRecipe->save();
      } else {
        $recipesWithUser = $onlyRecipes->where('user_id', $userId[0])->first();
        
        if(!$recipesWithUser) {
          Like::create([
            'user_id' => $userId[0],
            'recipe_id' => $recipeId
          ]);
          $currentRecipe->likes = $currentRecipe->likes + 1;
          $currentRecipe->save();
        } else {
          $isRecipeLiked = $recipesWithUser->isLiked;
          
          if($isRecipeLiked) {
            $currentRecipe->likes = $currentRecipe->likes - 1;
            $currentRecipe->save();
            $recipesWithUser->isLiked = false;
            $recipesWithUser->save();
          } else {
            $currentRecipe->likes = $currentRecipe->likes + 1;
            $currentRecipe->save();
            $recipesWithUser->isLiked = true;
            $recipesWithUser->save();
          }
          
        }
      }

      return response()->json([
        'likes' => $currentRecipe->likes
      ]);
    }
}
