<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Owner;
use App\Models\User;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    /**
     * Get all animals
     */
    public function index(Request $request)
    {
        $query = Animal::query();
        $user = $request->user();

        if ($user->isVeterinarian()) {
            $query->whereHas('owner', function ($builder) use ($user) {
                $builder->where('veterinarian_id', $user->id);
            });
        }

        if($request->has('owner_id')) {
            $query->where('owner_id', $request->input('owner_id'));
        }

        return response()->json(
            $query->paginate(15)
        );
    }

    /**
     * Create a new animal
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'espece' => 'required|string|max:255',
            'race' => 'required|string|max:255',
            'date_naissance' => 'required|date',
            'sexe' => 'required|string|in:male,female',
            'numero_identification' => 'nullable|string|max:255|unique:animals',
            'owner_id' => 'required|exists:owners,id',
        ]);

        $owner = Owner::findOrFail($validated['owner_id']);

        if ($user->isVeterinarian() && $owner->veterinarian_id !== $user->id) {
            abort(403);
        }

        $animal = Animal::create($validated);

        return response()->json([
            'message' => 'Animal created successfully',
            'animal' => $animal,
        ], 201);
    }

    /**
     * Get single animal details
     */
    public function show(Animal $animal)
    {
        $this->authorizeAnimal(request()->user(), $animal);

        return response()->json($animal);
    }

    /**
     * Update animal
     */
    public function update(Request $request, Animal $animal)
    {
        $this->authorizeAnimal($request->user(), $animal);

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'espece' => 'sometimes|string|max:255',
            'race' => 'sometimes|string|max:255',
            'date_naissance' => 'sometimes|date',
            'sexe' => 'sometimes|string|in:male,female',
            'numero_identification' => 'sometimes|string|max:255|unique:animals,numero_identification,' . $animal->id,
        ]);

        $animal->update($validated);

        return response()->json([
            'message' => 'Animal updated successfully',
            'animal' => $animal,
        ]);
    }

    /**
     * Delete animal
     */
    public function destroy(Animal $animal)
    {
        $this->authorizeAnimal(request()->user(), $animal);

        $animal->delete();

        return response()->json([
            'message' => 'Animal deleted successfully',
        ]);
    }

    /**
     * Get consultations for an animal
     */
    public function getConsultations(Animal $animal)
    {
        $this->authorizeAnimal(request()->user(), $animal);

        return response()->json(
            $animal->consultations()->get()
        );
    }

    private function authorizeAnimal(User $user, Animal $animal): void
    {
        if ($user->isVeterinarian() && $animal->owner?->veterinarian_id !== $user->id) {
            abort(403);
        }
    }
}
