<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Get all documents
     */
    public function index(Request $request)
    {
        $query = Document::query();
        $user = $request->user();

        if ($user->isVeterinarian()) {
            $query->whereHas('consultation.animal.owner', function ($builder) use ($user) {
                $builder->where('veterinarian_id', $user->id);
            });
        }

        if($request->has('consultation_id')) {
            $query->where('consultation_id', $request->input('consultation_id'));
        }

        return response()->json(
            $query->paginate(15)
        );
    }

    /**
     * Upload a new document
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'consultation_id' => 'required|exists:consultations,id',
            'fichier' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240', // 10MB max
            'notes' => 'nullable|string',
        ]);

        $consultation = \App\Models\Consultation::with('animal.owner')->findOrFail($validated['consultation_id']);
        if ($user->isVeterinarian() && $consultation->animal?->owner?->veterinarian_id !== $user->id) {
            abort(403);
        }

        // Store the file
        $file = $request->file('fichier');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('documents', $filename, 'public');

        $document = Document::create([
            'consultation_id' => $validated['consultation_id'],
            'nom_fichier' => $file->getClientOriginalName(),
            'chemin' => $path,
            'type' => $file->extension(),
            'taille' => $file->getSize(),
            'notes' => $validated['notes'] ?? null,
        ]);

        return response()->json([
            'message' => 'Document uploaded successfully',
            'document' => $document,
        ], 201);
    }

    /**
     * Get single document details
     */
    public function show(Document $document)
    {
        $this->authorizeDocument(request()->user(), $document);

        return response()->json($document);
    }

    /**
     * Download document
     */
    public function download(Document $document)
    {
        $this->authorizeDocument(request()->user(), $document);

        if (!Storage::disk('public')->exists($document->chemin)) {
            return response()->json([
                'message' => 'Document not found',
            ], 404);
        }

        return Storage::disk('public')->download($document->chemin, $document->nom_fichier);
    }

    /**
     * Delete document
     */
    public function destroy(Document $document)
    {
        $this->authorizeDocument(request()->user(), $document);

        // Delete file from storage
        if (Storage::disk('public')->exists($document->chemin)) {
            Storage::disk('public')->delete($document->chemin);
        }

        $document->delete();

        return response()->json([
            'message' => 'Document deleted successfully',
        ]);
    }

    private function authorizeDocument(User $user, Document $document): void
    {
        $document->loadMissing('consultation.animal.owner');

        if ($user->isVeterinarian() && $document->consultation?->animal?->owner?->veterinarian_id !== $user->id) {
            abort(403);
        }
    }
}
