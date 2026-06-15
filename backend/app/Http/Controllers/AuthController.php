<?php
 
namespace App\Http\Controllers;
 
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
 
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
 
        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
 
        $token = $user->createToken('auth_token')->plainTextToken;
 
        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }
 
    public function login(Request $request)
    {
        $data = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);
 
        $user = User::where('email', $data['email'])->first();
 
        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales son incorrectas.'],
            ]);
        }
 
        if (!$user->active) {
            return response()->json(['message' => 'Cuenta desactivada.'], 403);
        }
 
        $token = $user->createToken('auth_token')->plainTextToken;
 
        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }
 
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada correctamente.']);
    }
 
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
 
    public function updateProfile(Request $request)
    {
        $user = $request->user();
    
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'alias'   => 'nullable|string|max:50',
            'bio'     => 'nullable|string|max:500',
            'country' => 'nullable|string|max:100',
            'email'   => 'required|email|unique:users,email,' . $user->id,
        ]);
    
        $user->update($data);
    
        return response()->json($user);
    }
 
    public function changePassword(Request $request)
    {
        $user = $request->user();
 
        $data = $request->validate([
            'current_password' => 'required|string',
            'password'         => 'required|string|min:8|confirmed',
        ]);
 
        if (!Hash::check($data['current_password'], $user->password)) {
            return response()->json([
                'message' => 'La contraseña actual es incorrecta.',
            ], 422);
        }
 
        $user->update([
            'password' => Hash::make($data['password']),
        ]);
 
        return response()->json(['message' => 'Contraseña actualizada correctamente.']);
    }
}
