<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\AgentModel;
use CodeIgniter\HTTP\URI;
use Config\Services;

class AgentController extends BaseController
{
    public function index()
    {
        //
    }

    public function ViewAgent(){

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

        if($id){

            if((new AgentModel())->CheckAgent($id) != 1){
    
                return $this->response->setJSON ([
                    'response_code' => 404,
                    'message' => "Agent record not found",
                    'errors' => "Agent record not found",
                    'data' => (Object)[]
                ]);
            }

            $result = (new AgentModel())->ViewSingleAgent($id);
            
            return $this->response->setJSON ([
                'response_code' => 200,
                'message' => (object)[],
                'errors' => (object)[],
                'data' => $result
            ]);
        }
        
        $result = (new AgentModel())->ViewAgent();
        
        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => (object)[],
            'errors' => (object)[],
            'data' => $result
        ]);
    }

    public function ViewActiveAgent(){

        $result = (new AgentModel())->ViewActiveAgent();
        
        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => (object)[],
            'errors' => (object)[],
            'data' => $result
        ]);
    }

    public function AddAgent(){
        
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
        // id	full_name	email	passport_num	passport_dob	passport_issue	passport_expiry	contact	status	

        $data = [
            'full_name'   => $request->getPost('full_name'),
            'email' => $request->getPost('email'),
            'passport_num' => "",
            'passport_dob' => "",
            'passport_issue' => "",
            'passport_expiry' => "",
            'contact' => $request->getPost('contact'),
        ];
        $full_name = $request->getPost('full_name');
        $email = $request->getPost('email');
        $rule = [
            'full_name'   => 'required|is_unique[agent.full_name,{$full_name}]|min_length[3]',
            'email' => 'required|is_unique[agent.email,{$email}]|min_length[3]',
            // 'passport_num' => 'required|min_length[3]',
            // 'passport_dob' => 'required|min_length[3]',
            // 'passport_issue' => 'required|min_length[3]',
            // 'passport_expiry' => 'required|min_length[3]',
            'contact' => 'required|min_length[3]'
        ];

        if (! $this->validateData($data, $rule)) {
            return $this->response->setJSON ([
                'response_code' => 422,
                'message' => 'The given data was invalid.',
                'errors' => $this->validator->getErrors(),
                'data' => (object)[]
            ]);
        }

        if((new AgentModel())->AddAgent($data))

        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => 'Agent record added.',
            'errors' => (object)[],
            'data' => $request->getPost()
        ]);
    }

    public function EditAgent(){
        
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

        if((new AgentModel())->CheckAgent($id) != 1){

            return $this->response->setJSON ([
                'response_code' => 404,
                'message' => "Agent record not found",
                'errors' => "Agent record not found",
                'data' => (Object)[]
            ]);
        }
        
        $data = [];
        
        if($request->getPost('full_name') != ""){
            $data['full_name'] = $request->getPost('full_name');
        }
        
        if($request->getPost('email') != ""){
            $data['email'] = $request->getPost('email');
        }
                
        if($request->getPost('passport_num') != ""){
            $data['passport_num'] = $request->getPost('passport_num');
        }
        
        if($request->getPost('passport_dob') != ""){
            $data['passport_dob'] = $request->getPost('passport_dob');
        }
        
        if($request->getPost('passport_issue') != ""){
            $data['passport_issue'] = $request->getPost('passport_issue');
        }
        
        if($request->getPost('passport_expiry') != ""){
            $data['passport_expiry'] = $request->getPost('passport_expiry');
        }
        
        if($request->getPost('contact') != ""){
            $data['contact'] = $request->getPost('contact');
        }
        
        if($request->getPost('status') != ""){
            $data['status'] = $request->getPost('status');
        }
            
        $result = (new AgentModel())->EditAgent($id, $data);
        
        if(!$result){
            return $this->response->setJSON ([
                'response_code' => 402,
                'message' => "Agent record not updated",
                'errors' => "Agent record not updated",
                'data' => $data
            ]);
        }

        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => "Agent record updated",
            'errors' => $id,
            'data' => $data
        ]);
    }

    

    public function DeleteAgent(){
        
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
        
        if((new AgentModel())->CheckAgent($id) != 1){

            return $this->response->setJSON ([
                'response_code' => 404,
                'message' => "Agent record not found",
                'errors' => "Agent record not found",
                'data' => (Object)[]
            ]);
        }
 
        $result = (new AgentModel())->DeleteAgent($id);
        
        if(!$result){
            return $this->response->setJSON ([
                'response_code' => 402,
                'message' => "Agent record not updated",
                'errors' => "Agent record not updated",
                'data' => $result
            ]);
        }

        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => "Agent record deleted",
            'errors' => $id,
            'data' => $result
        ]);

    }
}
