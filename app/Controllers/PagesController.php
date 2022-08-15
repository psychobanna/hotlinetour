<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\PagesModel;
// use App\Models\AgentModel;
use CodeIgniter\HTTP\URI;
use Config\Services;

class PagesController extends BaseController
{
    public function index()
    {
        //
    }

    public function ViewPage(){

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
        
        $result = (new PagesModel())->ViewPage();

        $id = $this->request->uri->getSegment(3);
        
        if($id){
            if((new PagesModel())->CheckPage($id) != 1){

                return $this->response->setJSON ([
                    'response_code' => 404,
                    'message' => "page record not found",
                    'errors' => "Page record not found",
                    'data' => (Object)[]
                ]);
            }
        }
 
        
        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => (object)[],
            'errors' => (object)[],
            'data' => $result
        ]);
    }

    public function ViewActivePage(){
        
        $id = $this->request->uri->getSegment(3);
        
        if($id){
            if((new PagesModel())->CheckPage($id) != 1){

                return $this->response->setJSON ([
                    'response_code' => 404,
                    'message' => "page record not found",
                    'errors' => "Page record not found",
                    'data' => (Object)[]
                ]);
            }
        }
 
        $result = (new PagesModel())->ViewActivePage();
        
        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => (object)[],
            'errors' => (object)[],
            'data' => $result
        ]);
    }

    public function AddPage(){
        
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

        $data = [
            'name'   => $request->getPost('name'),
            'content' => $request->getPost('content')
        ];
        $name = $request->getPost('name');
        $content = $request->getPost('content');
        $rule = [
            'name'   => 'required|is_unique[pages.name,{$name}]|min_length[3]',
            'content' => 'required|min_length[3]'
        ];

        if (! $this->validateData($data, $rule)) {
            return $this->response->setJSON ([
                'response_code' => 422,
                'message' => 'The given data was invalid.',
                'errors' => $this->validator->getErrors(),
                'data' => (object)[]
            ]);
        }

        if((new PagesModel())->AddPage($data)){

            return $this->response->setJSON ([
                'response_code' => 200,
                'message' => 'Page record added.',
                'errors' => (object)[],
                'data' => $request->getPost()
            ]);
        }
    }

    public function EditPage(){
        
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
        
        $data = [];
        
        if($request->getPost('name') != ""){
            $data['name'] = $request->getPost('name');
        }
        
        if($request->getPost('content') != ""){
            $data['content'] = $request->getPost('content');
        }
        
        if($request->getPost('status') != ""){
            $data['status'] = $request->getPost('status');
        }
                
        $result = (new PagesModel())->EditPage($id, $data);
        
        if(!$result){
            return $this->response->setJSON ([
                'response_code' => 402,
                'message' => "Pages record not updated",
                'errors' => "Pages record not updated",
                'data' => $data
            ]);
        }

        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => "Pages record updated",
            'errors' => $id,
            'data' => $data
        ]);
    }

    

    public function DeletePage(){
        
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
        
        if((new PagesModel())->CheckPage($id) != 1){

            return $this->response->setJSON ([
                'response_code' => 404,
                'message' => "page record not found",
                'errors' => "Page record not found",
                'data' => (Object)[]
            ]);
        }
 
        $result = (new PagesModel())->DeletePage($id);
        
        if(!$result){
            return $this->response->setJSON ([
                'response_code' => 402,
                'message' => "Page record not updated",
                'errors' => "Page record not updated",
                'data' => $result
            ]);
        }

        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => "Page record deleted",
            'errors' => $id,
            'data' => $result
        ]);

    }
}
