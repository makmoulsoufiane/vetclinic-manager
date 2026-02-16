<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    /**
     * Get all consultations
     */
    public function index(Request $request)
    {
        $query = Consultation::query();

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
        $validated = $request->validate([
            'animal_id' => 'required|exists:animals,id',
            'date_consultation' => 'required|date',
            'motif' => 'required|string|max:255',
            'diagnostic' => 'nullable|string',
            'traitement' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

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
        return response()->json($consultation);
    }

    /**
     * Update consultation
     */
    public function update(Request $request, Consultation $consultation)
    {
        $validated = $request->validate([
            'date_consultation' => 'sometimes|date',
            'motif' => 'sometimes|string|max:255',
            'diagnostic' => 'sometimes|string',
            'traitement' => 'sometimes|string',
            'notes' => 'sometimes|string',
        ]);

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
        return response()->json(
            $consultation->documents()->get()
        );
    }
}
