<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApiCommentRequest;
use Illuminate\Http\Request;
use App\Comment;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class CommentController extends Controller
{
    public function index($id)
    {
      $comments = Comment::where('recipe', $id)->orderBy('created_at', 'desc')->get();         
      return $comments->toJson();
    }    

    public function create(ApiCommentRequest $request)
    {
      $comment = $request->all();
      $newcomment = Comment::create($comment);
      return $newcomment->toJson();
    }

    public function update(Request $request, $id)
    {
      $comment = Comment::find($id);
      $params = $request->all();
      $comment->update($params);
      return response()->json([
        'message' => 'comment update',
        'comment' => $comment,
      ]);           
    }

    public function delete($id)
    {
        Comment::find($id)->delete();
        return response()->json('Comment delete!',200);
    }

    public function showMy($id)
    {
      $comments = Comment::where('user', $id)->orderBy('created_at', 'desc')->get();
      return $comments->toJson();
    }
}

