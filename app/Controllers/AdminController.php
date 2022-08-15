<?php

namespace App\Controllers;

use App\Models\AdminModel;
use CodeIgniter\Controller;
use CodeIgniter\Model;
use Config\Services;

class AdminController extends Controller
{

    protected $request;

    public function index()
    {
        return view('welcome_message');
    }


    public function login(){
        
        $request = Services::request();
        
        $data = [
            'username'   => $request->getPost('username'),
            'password' => $request->getPost('password'),
        ];

        $rule = [
            'username'   => 'required|min_length[3]',
            'password' => 'required|min_length[8]',
        ];

        if (! $this->validateData($data, $rule)) {
            return $this->response->setJSON ([
                'response_code' => 422,
                'message' => 'The given data was invalid.',
                'errors' => $this->validator->getErrors(),
                'data' => (object)[]
            ]);
        }

        $result = (new AdminModel)->Login($request->getPost('username'),$request->getPost('password'));

        if($result != 1){
            return $this->response->setJSON ([
                'response_code' => 422,
                'message' => "Username & Password not match",
                'errors' => "Username & Password not match",
                'data' => (Object)[]
            ]);
        }

        $token = (new AdminModel)->GenerateToken($request->getPost('username'));

        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => $token,
            'errors' => (object)[],
            'data' => $request->getPost()
        ]);
    }

    public function ChangePassword(){
        $checkToken = (new AdminController)->checkToken();
        
        if(!$checkToken){
            return $this->response->setJSON ([
                'response_code' => 422,
                'message' => "Sorry, Unauthorized request",
                'errors' => "Sorry, Unauthorized request",
                'data' => (object)[]
            ]);
        }

        $request = Services::request();

        $id = $this->request->uri->getSegment(3);

        $oldpassword = (new AdminModel())->encrypter($request->getPost('oldpassword'));
        $newpassword = (new AdminModel())->encrypter($request->getPost('newpassword'));
        

        if((new AdminModel())->CheckAdmin($id, $oldpassword) != 1){

            return $this->response->setJSON ([
                'response_code' => 404,
                'message' => "Old Password not match",
                'errors' => "Old Password not match",
                'data' => (Object)[]
            ]);
        }
        
        $data = [];

        $data['password'] = $newpassword;
        
        $result = (new AdminModel())->ChangePassword($id, $data);
        
        if(!$result){
            return $this->response->setJSON ([
                'response_code' => 402,
                'message' => "Password not updated",
                'errors' => "Password not updated",
                'data' => $data
            ]);
        }

        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => "Password updated",
            'errors' => $id,
            'data' => $result
        ]);
    }

    public function PaymentSettings(){
        $checkToken = (new AdminController)->checkToken();
        
        if(!$checkToken){
            return $this->response->setJSON ([
                'response_code' => 422,
                'message' => "Sorry, Unauthorized request",
                'errors' => "Sorry, Unauthorized request",
                'data' => (object)[]
            ]);
        }

        $request = Services::request();

        $id = 1;

        $data = [];
        
        if($request->getPost('paymentkey') != ""){
            $data['payment_key'] = $request->getPost('paymentkey');
        }

        if($request->getPost('paymentvalue') != ""){
            $data['payment_value'] = $request->getPost('paymentvalue');
        }

        if($request->getPost('companyname') != ""){
            $data['company_name'] = $request->getPost('companyname');
        }

        
        
        $result = (new AdminModel())->ChangePaymentSettings($id, $data);
        
        if(!$result){
            return $this->response->setJSON ([
                'response_code' => 402,
                'message' => "Payment settings not updated",
                'errors' => "Payment settings not updated",
                'data' => $result
            ]);
        }

        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => "Payment settings updated",
            'errors' => $id,
            'data' => $result
        ]);
    }
    

    public function ViewPaymentKeyValue(){

        $result = (new AdminModel())->ViewPaymentKeyValue();
        
        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => (object)[],
            'errors' => (object)[],
            'data' => $result
        ]);
    }

    public function checkTokenStatus(){
        $request = Services::request();
        $token = $request->getHeaderLine('token');
        $result = (new AdminModel())->tokenStatus($token);
        
        if($result){
            return $this->response->setJSON ([
                'response_code' => 200,
                'message' => "Token exist",
                'errors' => "Token exist",
                'data' => true
            ]);
        }else{
            return $this->response->setJSON ([
                'response_code' => 401,
                'message' => "Token not exist",
                'errors' => "Token not exist",
                'data' => false
            ]);
        }
    }

    public function checkToken(){

        $request = Services::request();
        $token = $request->getHeaderLine('token');
        $result = (new AdminModel())->tokenStatus($token);
        
        if($result){
            return true;
        }else{
            return false;
        }
    }
}
