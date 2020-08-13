<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApiRecipeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    public function wantsJson()
    {
    
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required',
            'ingredients'=>'required',
            'description'=>'required',
            'image'=>'file|required|mimes:jpeg,bmp,png',
            
        ];
    }
    public function messages()
    {
        return [
            'required' => 'Обовязковое поле',
            'file'=>'Завантажуйте тільки зображення'
        ];
    }
}
