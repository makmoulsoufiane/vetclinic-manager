<?php

namespace App\Http\Controllers;

use App\Models\Owner;
use App\Models\User;
use Illuminate\Http\Request;

class OwnerController extends Controller
{
    /**
     * Get all owners with optional search
     */
    public function index(Request $request)
    {
        $query = Owner::query();
        $user = $request->user();

        if ($user->isVeterinarian()) {
            $query->where('veterinarian_id', $user->id);
        }

        if($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($builder) use ($search) {
                $builder->where('fullName', 'like', "%{$search}%")
                    ->orWhere('telephone', 'like', "%{$search}%");
            });
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
        $user = $request->user();
        $rules = [
            'fullName' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
            'email' => 'nullable|string|email|max:255',
            'adresse' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
        ];

        if ($user->isAdmin()) {
            $rules['veterinarian_id'] = 'required|exists:users,id';
        }

        $validated = $request->validate($rules);

        if ($user->isVeterinarian()) {
            $validated['veterinarian_id'] = $user->id;
        } else {
            $veterinarian = User::find($validated['veterinarian_id']);
            if (!$veterinarian || !$veterinarian->isVeterinarian()) {
                return response()->json([
                    'message' => 'Selected user is not a veterinarian.',
                ], 422);
            }
        }

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
        $this->authorizeOwner(request()->user(), $owner);

        return response()->json($owner);
    }

    /**
     * Update owner
     */
    public function update(Request $request, Owner $owner)
    {
        $user = $request->user();
        $this->authorizeOwner($user, $owner);

        $rules = [
            'fullName' => 'sometimes|string|max:255',
            'telephone' => 'sometimes|string|max:20',
            'email' => 'sometimes|string|email|max:255',
            'adresse' => 'sometimes|string|max:255',
            'ville' => 'sometimes|string|max:255',
        ];

        if ($user->isAdmin()) {
            $rules['veterinarian_id'] = 'sometimes|exists:users,id';
        }

        $validated = $request->validate($rules);

        if (isset($validated['veterinarian_id'])) {
            $veterinarian = User::find($validated['veterinarian_id']);
            if (!$veterinarian || !$veterinarian->isVeterinarian()) {
                return response()->json([
                    'message' => 'Selected user is not a veterinarian.',
                ], 422);
            }
        }

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
        $this->authorizeOwner(request()->user(), $owner);

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
        $this->authorizeOwner(request()->user(), $owner);

        return response()->json(
            $owner->animals()->get()
        );
    }

    private function authorizeOwner(User $user, Owner $owner): void
    {
        if ($user->isVeterinarian() && $owner->veterinarian_id !== $user->id) {
            abort(403);
        }
    }
}
