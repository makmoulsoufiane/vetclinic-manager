<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication Routes (Public)
Route::post('/auth/register', 'App\Http\Controllers\AuthController@register');
Route::post('/auth/login', 'App\Http\Controllers\AuthController@login');
Route::post('/auth/logout', 'App\Http\Controllers\AuthController@logout')->middleware('auth:sanctum');

// Protected Routes (Require Authentication)
Route::middleware('auth:sanctum')->group(function () {

    // User Routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/user/profile', 'App\Http\Controllers\UserController@updateProfile');
    Route::post('/user/change-password', 'App\Http\Controllers\UserController@changePassword');

    // Owners/Proprietaires Routes (CRUD)
    Route::prefix('owners')->group(function () {
        Route::get('/', 'App\Http\Controllers\OwnerController@index');           // List all owners
        Route::post('/', 'App\Http\Controllers\OwnerController@store');          // Create owner
        Route::get('/{owner}', 'App\Http\Controllers\OwnerController@show');     // Get single owner
        Route::put('/{owner}', 'App\Http\Controllers\OwnerController@update');   // Update owner
        Route::delete('/{owner}', 'App\Http\Controllers\OwnerController@destroy'); // Delete owner
        Route::get('/{owner}/animals', 'App\Http\Controllers\OwnerController@getAnimals'); // Get owner's animals
    });

    // Animals Routes (CRUD)
    Route::prefix('animals')->group(function () {
        Route::get('/', 'App\Http\Controllers\AnimalController@index');           // List all animals
        Route::post('/', 'App\Http\Controllers\AnimalController@store');          // Create animal
        Route::get('/{animal}', 'App\Http\Controllers\AnimalController@show');    // Get single animal
        Route::put('/{animal}', 'App\Http\Controllers\AnimalController@update');  // Update animal
        Route::delete('/{animal}', 'App\Http\Controllers\AnimalController@destroy'); // Delete animal
        Route::get('/{animal}/consultations', 'App\Http\Controllers\AnimalController@getConsultations'); // Get animal's consultations
    });

    // Consultations Routes (CRUD)
    Route::prefix('consultations')->group(function () {
        Route::get('/', 'App\Http\Controllers\ConsultationController@index');           // List all consultations
        Route::post('/', 'App\Http\Controllers\ConsultationController@store');          // Create consultation
        Route::get('/{consultation}', 'App\Http\Controllers\ConsultationController@show'); // Get single consultation
        Route::put('/{consultation}', 'App\Http\Controllers\ConsultationController@update'); // Update consultation
        Route::delete('/{consultation}', 'App\Http\Controllers\ConsultationController@destroy'); // Delete consultation
        Route::get('/{consultation}/documents', 'App\Http\Controllers\ConsultationController@getDocuments'); // Get consultation's documents
    });

    // Documents Routes (Upload & Management)
    Route::prefix('documents')->group(function () {
        Route::get('/', 'App\Http\Controllers\DocumentController@index');           // List all documents
        Route::post('/', 'App\Http\Controllers\DocumentController@store');          // Upload document
        Route::get('/{document}', 'App\Http\Controllers\DocumentController@show');  // Get single document
        Route::delete('/{document}', 'App\Http\Controllers\DocumentController@destroy'); // Delete document
        Route::get('/{document}/download', 'App\Http\Controllers\DocumentController@download'); // Download document
    });

});
