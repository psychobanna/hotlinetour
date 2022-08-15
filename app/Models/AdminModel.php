<?php

namespace App\Models;

use CodeIgniter\Config\Services;
use CodeIgniter\Model;

class AdminModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'admin';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['id', 'full_name', 'email', 'username', 'password', 'status'];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [
        'username'     => 'required|alpha_numeric_space|min_length[3]',
        'email'        => 'required|valid_email|is_unique[username.email]',
        'password'     => 'required|min_length[8]'
    ];
    protected $validationMessages = [
        'email' => [
            'is_unique' => 'Sorry. That email has already been taken. Please choose another.',
        ],
    ];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    public function Login($username, $password){
        $db = db_connect();
        $password = $this->encrypter($password);
        $result = $db->query("select * from admin where username='".$username."' and password='".$password."'");
        return count($result->getResult());
    }
    
    public function GenerateToken($username){
        $db = db_connect();
        $result = $db->query("select * from admin where username='".$username."'");
        $count = $result->getResult()[0];
        $token = md5($count->username.time());
        
        $db->query('delete from token where user_id='.$count->id);

        $result = $this->db->table('token')->insert([
            'user_id'=>$count->id,
            'token'=>$token
        ]);

        return ['token'=>$token,"id"=>$count->id]; 
    }
    
    public function CheckAdmin($id, $oldpassword){
        $result = $this->db->query("select * from admin where id='".$id."' and password='".$oldpassword."'");
        return count($result->getResult());
    }

    public function ChangePassword($id, $data){
        
        $db = db_connect();

        $result = $db->table('admin')->set($data)->where('id', $id)->update();
        return $result?$result:$db->error();
    }

    public function ChangePaymentSettings($id, $data){
        
        $db = db_connect();

        $result = $db->table('admin')->set($data)->where('id', $id)->update();
        return $result?$result:$db->error();
    }

    public function ViewPaymentKeyValue(){
        $result = $this->db->query("select company_name,payment_key,payment_value from admin");
        return $result->getResult();
    }

    public function encrypter($password){
        return md5($password);
    }

    public function tokenStatus($token){
        
        $db = db_connect();
        $result = $db->query("select * from token where token='".$token."'");
        $count = count($result->getResult());
        
        
        return $count == 1?true:false;
    }
}
