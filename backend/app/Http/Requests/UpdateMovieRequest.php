<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMovieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $movieId = $this->route('id');
        
        return [
            'title' => [
                'required',
                'string', 
                'max:255',
                Rule::unique('movies', 'title')->ignore($movieId)
            ],
            'description' => 'required|string',
            'pg_rating_id' => 'required|integer|exists:pg_ratings,id',
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The movie title is required.',
            'title.unique' => 'A movie with this title already exists.',
            'title.max' => 'The movie title must not exceed 255 characters.',
            'description.required' => 'The description field is required.',
            'pg_rating_id.required' => 'Please select a PG rating.',
            'pg_rating_id.exists' => 'The selected PG rating is invalid.',
        ];
    }
}
