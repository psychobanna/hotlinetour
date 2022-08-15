<?php

namespace App\Models;

use CodeIgniter\Model;

class AgentModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'agents';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
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


    // public function AddAgent($full_name, $email, $passport_num, $passport_dob, $passport_issue, $passport_expiry, $contact){
    public function AddAgent($data){
        
        $result = $this->db->table('agent')->insert($data);

        return $result;
    }

    public function EditAgent($id, $data){
        
        $db = db_connect();

        $result = $db->table('agent')->set($data)->where('id', $id)->update();
        return $result?$result:$db->error();
    }

    public function ViewAgent(){
        $result = $this->db->query("select * from agent");
        return $result->getResult();
    }

    public function ViewSingleAgent($id){
        $result = $this->db->query("select * from agent where id='".$id."'");
        $result = $result->getResult();
        return $result;
    }
    

    public function ViewActiveAgent(){
        $result = $this->db->query("select * from agent where status=1");
        return $result->getResult();
    }

    public function DeleteAgent($id){
        $db = db_connect();
        $result = $db->table('agent')->where('id', $id)->delete();
        return $result?$result:$db->error();
    }

    public function CheckAgent($id){
        $result = $this->db->query("select * from agent where id='".$id."'");
        return count($result->getResult());
    }
}
