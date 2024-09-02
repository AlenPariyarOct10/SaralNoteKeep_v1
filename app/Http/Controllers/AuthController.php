<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => ($request->password),
        ]);

        return response()->json([
            'user' => $user,
        ]);
    }

    public function login(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Retrieve credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // Attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                // If the credentials are incorrect, return an Unauthorized response
                return response()->json(['error' => 'Invalid email or password'], 401);
            }
        } catch (JWTException $e) {
            // If something went wrong with creating the token, return an error response
            return response()->json(['error' => 'Could not create token'], 500);
        }

        // If authentication is successful, return the token along with user details
        return response()->json([
            'token' => $token,
            'user' => auth()->user(), // Get the authenticated user
        ]);
    }

    public function getUser(Request $request)
    {
        return response()->json(['user' => Auth::user()]);
    }


}
