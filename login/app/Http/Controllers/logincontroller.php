<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

use App\Models\userdetails;


class logincontroller extends Controller
{
    
    public function getcountry(){
        //for getting data from the the table named 'cron'
        $users = DB::table('countries')->get();
 
        return $users;
    } 

    public function getstate($one){
        //for getting data from the the table named 'cron'
        $users = DB::table('states')->where('country_id',$one)->get();
 
        return $users;
    } 

    public function addData(Request $request)
    {
        
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required',
            'country_id' => 'required',
            'state_id' => 'required',
        ]);

        $user = new userdetails();
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
     
        $user->country_id = $request->country_id;
        $user->state_id = $request->state_id;
        
        if ($user->save()) {
            return response()->json(['message' => 'Success']);
        } else {
            return response()->json(['message' => 'Oops, something went wrong.'], 500);
        }
        
       
    }

}
