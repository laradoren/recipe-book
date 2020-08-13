<?php

namespace App\Http\Controllers;
use App\Profile;
use App\User;
use App\Recipe;
use App\Comment;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index($id)
    {
      $profile = Profile::where('id',$id)->first();
      if($profile->image != null) {
        $profile->image = Storage::url($profile->image);
      }
      return $profile->toJson();
    }

    public function update(Request $request, $id)
    {
      $profile = Profile::find($id);
      $params = $request->all();
      if ($request->has('image')) {
        $path = $request->file('image')->store('downloaded_images');
        if ($path !== $profile->image) {
            Storage::delete($profile->image);
            $params["image"]=$path;
        } 
      }
      $profile->update($params);
      return response()->json([
        'message' => 'profile update',
        'profile' => $profile,
      ]);           
    }

    public function delete($id)
    {
        Profile::find($id)->delete();
        User::find($id)->delete();
        Recipe::where('user_id',$id)->delete();
        Comment::where('user',$id)->delete();
        return response()->json('Profile delete!',200);;
    }

}
