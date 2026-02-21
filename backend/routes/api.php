<?php

use App\Http\Controllers\Admin\VeterinarianController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\OwnerController;
use App\Http\Controllers\UserController;
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
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected Routes (Require Authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // User Routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    Route::post('/user/change-password', [UserController::class, 'changePassword']);

    // Admin Routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::prefix('veterinarians')->group(function () {
            Route::get('/', [VeterinarianController::class, 'index']);
            Route::post('/', [VeterinarianController::class, 'store']);
            Route::get('/{veterinarian}', [VeterinarianController::class, 'show']);
            Route::put('/{veterinarian}', [VeterinarianController::class, 'update']);
            Route::delete('/{veterinarian}', [VeterinarianController::class, 'destroy']);
        });
    });

    // Owners/Proprietaires Routes (CRUD)
    Route::prefix('owners')->group(function () {
        Route::get('/', [OwnerController::class, 'index']);           // List all owners
        Route::post('/', [OwnerController::class, 'store']);          // Create owner
        Route::get('/{owner}', [OwnerController::class, 'show']);     // Get single owner
        Route::put('/{owner}', [OwnerController::class, 'update']);   // Update owner
        Route::delete('/{owner}', [OwnerController::class, 'destroy']); // Delete owner
        Route::get('/{owner}/animals', [OwnerController::class, 'getAnimals']); // Get owner's animals
    });

    // Animals Routes (CRUD)
    Route::prefix('animals')->group(function () {
        Route::get('/', [AnimalController::class, 'index']);           // List all animals
        Route::post('/', [AnimalController::class, 'store']);          // Create animal
        Route::get('/{animal}', [AnimalController::class, 'show']);    // Get single animal
        Route::put('/{animal}', [AnimalController::class, 'update']);  // Update animal
        Route::delete('/{animal}', [AnimalController::class, 'destroy']); // Delete animal
        Route::get('/{animal}/consultations', [AnimalController::class, 'getConsultations']); // Get animal's consultations
    });

    // Consultations Routes (CRUD)
    Route::prefix('consultations')->group(function () {
        Route::get('/', [ConsultationController::class, 'index']);           // List all consultations
        Route::post('/', [ConsultationController::class, 'store']);          // Create consultation
        Route::get('/{consultation}', [ConsultationController::class, 'show']); // Get single consultation
        Route::put('/{consultation}', [ConsultationController::class, 'update']); // Update consultation
        Route::delete('/{consultation}', [ConsultationController::class, 'destroy']); // Delete consultation
        Route::get('/{consultation}/documents', [ConsultationController::class, 'getDocuments']); // Get consultation's documents
    });

    // Documents Routes (Upload & Management)
    Route::prefix('documents')->group(function () {
        Route::get('/', [DocumentController::class, 'index']);           // List all documents
        Route::post('/', [DocumentController::class, 'store']);          // Upload document
        Route::get('/{document}', [DocumentController::class, 'show']);  // Get single document
        Route::delete('/{document}', [DocumentController::class, 'destroy']); // Delete document
        Route::get('/{document}/download', [DocumentController::class, 'download']); // Download document
    });

});
