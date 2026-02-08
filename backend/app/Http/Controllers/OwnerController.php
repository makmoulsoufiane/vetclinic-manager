<?php

namespace App\Http\Controllers;

use App\Models\Owner;
use Illuminate\Http\Request;

class OwnerController extends Controller
{
    /**
     * Get all owners with optional search
     */
    public function index(Request $request)
    {
        $query = Owner::query();

        if($request->has('search')) {
            $search = $request->input('search');
            $query->where('fullName', 'like', "%{$search}%")
                  ->orWhere('telephone', 'like', "%{$search}%");
        }

        return response()->json(
            $query->paginate(15)
        );
    }

    /**
     * Create a new owner
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullName' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
            'email' => 'nullable|string|email|max:255',
            'adresse' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
        ]);

        $owner = Owner::create($validated);

        return response()->json([
            'message' => 'Owner created successfully',
            'owner' => $owner,
        ], 201);
    }

    /**
     * Get single owner details
     */
    public function show(Owner $owner)
    {
        return response()->json($owner);
    }

    /**
     * Update owner
     */
    public function update(Request $request, Owner $owner)
    {
        $validated = $request->validate([
            'fullName' => 'sometimes|string|max:255',
            'telephone' => 'sometimes|string|max:20',
            'email' => 'sometimes|string|email|max:255',
            'adresse' => 'sometimes|string|max:255',
            'ville' => 'sometimes|string|max:255',
        ]);

        $owner->update($validated);

        return response()->json([
            'message' => 'Owner updated successfully',
            'owner' => $owner,
        ]);
    }

    /**
     * Delete owner
     */
    public function destroy(Owner $owner)
    {
        $owner->delete();

        return response()->json([
            'message' => 'Owner deleted successfully',
        ]);
    }

    /**
     * Get all animals belonging to an owner
     */
    public function getAnimals(Owner $owner)
    {
        return response()->json(
            $owner->animals()->get()
        );
    }
}
