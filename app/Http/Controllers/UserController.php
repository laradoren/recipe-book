<?php
namespace App\Http\Controllers;

use App\User;
use App\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'name'=>'required|string',
            'email'=>'required|email|unique:users',
            'password'=>'required|string|min:6',
        ]);

        if($validator->fails())
        {
            return response()->json([
                "success"=>false,
                "message"=>$validator->messages()->toArray(),
            ], 400);
        }
        

        $registerComplete = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=> Hash::make($request->password), 
        ]);

        $profileCreate = Profile::create([
            'name'=>$request->name
        ]);            

            return response()->json([
                'success'=>true
            ]);   
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->only('email','password'),
        [
            'email'=>'required|email',
            'password'=>'required|string|min:6',
        ]
        );

        if($validator->fails())
        {
            return response()->json([
                "success"=>false,
                "message"=>$validator->messages()->toArray(),
            ], 400);
        }

        $jwt_token = null;

        $input = $request->only("email","password");

        if(!$jwt_token = JWTAuth::attempt($input))
        {
            return response()->json([
                'success'=>false,
                'message'=>'invalid email or password'
            ]);

        }

        $user = User::where('email',$request->email)->first();
        
        return response()->json([
            'success'=>true,
            'token'=>$jwt_token,
            'id' => $user->id,
            'name' => $user->name
        ]);
    } 

}