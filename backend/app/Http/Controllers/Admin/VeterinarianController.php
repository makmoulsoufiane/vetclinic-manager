<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class VeterinarianController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query()->where('role', User::ROLE_VETERINARIAN);

        if ($request->filled('search')) {
            $search = $request->input('search');

            $query->where(function ($builder) use ($search) {
                $builder->where('fullName', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return response()->json($query->orderBy('fullName')->paginate(15));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $veterinarian = User::create([
            'fullName' => $validated['fullName'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => User::ROLE_VETERINARIAN,
        ]);

        return response()->json([
            'message' => 'Veterinarian created successfully',
            'veterinarian' => $veterinarian,
        ], 201);
    }

    public function show(User $veterinarian)
    {
        $this->ensureVeterinarian($veterinarian);

        return response()->json($veterinarian);
    }

    public function update(Request $request, User $veterinarian)
    {
        $this->ensureVeterinarian($veterinarian);

        $validated = $request->validate([
            'fullName' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $veterinarian->id,
            'password' => 'sometimes|string|min:8|confirmed',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $veterinarian->update($validated);

        return response()->json([
            'message' => 'Veterinarian updated successfully',
            'veterinarian' => $veterinarian,
        ]);
    }

    public function destroy(User $veterinarian)
    {
        $this->ensureVeterinarian($veterinarian);

        if ($veterinarian->owners()->exists()) {
            return response()->json([
                'message' => 'Cannot delete veterinarian with assigned records.',
            ], 422);
        }

        $veterinarian->delete();

        return response()->json([
            'message' => 'Veterinarian deleted successfully',
        ]);
    }

    private function ensureVeterinarian(User $user): void
    {
        if (!$user->isVeterinarian()) {
            abort(404);
        }
    }
}
