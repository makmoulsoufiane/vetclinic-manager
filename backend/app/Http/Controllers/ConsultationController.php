<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Consultation;
use App\Models\User;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    /**
     * Get all consultations
     */
    public function index(Request $request)
    {
        $query = Consultation::query();
        $user = $request->user();

        if ($user->isVeterinarian()) {
            $query->whereHas('animal.owner', function ($builder) use ($user) {
                $builder->where('veterinarian_id', $user->id);
            });
        }

        if($request->has('animal_id')) {
            $query->where('animal_id', $request->input('animal_id'));
        }

        return response()->json(
            $query->orderBy('date_consultation', 'desc')->paginate(15)
        );
    }

    /**
     * Create a new consultation
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'animal_id' => 'required|exists:animals,id',
            'date_consultation' => 'required|date',
            'motif' => 'required|string|max:255',
            'diagnostic' => 'nullable|string',
            'traitement' => 'nullable|string',
            'notes' => 'nullable|string',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        $animal = Animal::with('owner')->findOrFail($validated['animal_id']);
        if ($user->isVeterinarian() && $animal->owner?->veterinarian_id !== $user->id) {
            abort(403);
        }

        if ($user->isVeterinarian()) {
            $validated['user_id'] = $user->id;
        } elseif (isset($validated['user_id'])) {
            $veterinarian = User::find($validated['user_id']);
            if (!$veterinarian || !$veterinarian->isVeterinarian()) {
                return response()->json([
                    'message' => 'Selected user is not a veterinarian.',
                ], 422);
            }
        }

        $consultation = Consultation::create($validated);

        return response()->json([
            'message' => 'Consultation created successfully',
            'consultation' => $consultation,
        ], 201);
    }

    /**
     * Get single consultation details
     */
    public function show(Consultation $consultation)
    {
        $this->authorizeConsultation(request()->user(), $consultation);

        return response()->json($consultation);
    }

    /**
     * Update consultation
     */
    public function update(Request $request, Consultation $consultation)
    {
        $user = $request->user();
        $this->authorizeConsultation($user, $consultation);

        $validated = $request->validate([
            'date_consultation' => 'sometimes|date',
            'motif' => 'sometimes|string|max:255',
            'diagnostic' => 'sometimes|string',
            'traitement' => 'sometimes|string',
            'notes' => 'sometimes|string',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        if ($user->isVeterinarian()) {
            unset($validated['user_id']);
        } elseif (isset($validated['user_id'])) {
            $veterinarian = User::find($validated['user_id']);
            if (!$veterinarian || !$veterinarian->isVeterinarian()) {
                return response()->json([
                    'message' => 'Selected user is not a veterinarian.',
                ], 422);
            }
        }

        $consultation->update($validated);

        return response()->json([
            'message' => 'Consultation updated successfully',
            'consultation' => $consultation,
        ]);
    }

    /**
     * Delete consultation
     */
    public function destroy(Consultation $consultation)
    {
        $this->authorizeConsultation(request()->user(), $consultation);

        // Delete related documents
        $consultation->documents()->delete();

        $consultation->delete();

        return response()->json([
            'message' => 'Consultation deleted successfully',
        ]);
    }

    /**
     * Get all documents for a consultation
     */
    public function getDocuments(Consultation $consultation)
    {
        $this->authorizeConsultation(request()->user(), $consultation);

        return response()->json(
            $consultation->documents()->get()
        );
    }

    private function authorizeConsultation(User $user, Consultation $consultation): void
    {
        $consultation->loadMissing('animal.owner');

        if ($user->isVeterinarian() && $consultation->animal?->owner?->veterinarian_id !== $user->id) {
            abort(403);
        }
    }
}
