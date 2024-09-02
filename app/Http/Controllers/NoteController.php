<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $notes = Note::where('author_id', $user->id)->get();
       return response()->json($notes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        $user = $request->user(); // Get the currently authenticated user

        $note = Note::create([
            'title' => $request->title,
            'body' => $request->body,
            'author_id' => $user->id // Set the author_id from the authenticated user
        ]);

        if ($note) {
            return response()->json([
                'message' => 'Note created successfully',
                'note' => $note
            ], 201);
        } else {
            return response()->json([
                'message' => 'Note creation failed'
            ], 500); // Return a 500 status code for server errors
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required',
        ]);
        $user = $request->user();

        $update = Note::query()->where('id', $id)->update([
            'title'=>$request['title'],
            'body'=>$request['body'],
        ]);

        if ($update) {
            return response()->json(["message" => "Note updated successfully"]);
        }else{
            return response()->json(["message" => "Note update failed"]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(Note::findOrFail($id)->delete()){
            return response()->json(["message" => "Note deleted successfully"]);
        }else{
            return response()->json(['message' => 'Note deletion failed']);
        }
    }
}
