<?php

namespace App\Models;

use CodeIgniter\Model;

class PagesModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'Pages';
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


    public function AddPage($data){
        
        $result = $this->db->table('Pages')->insert($data);

        return $result;
    }

    public function EditPage($id, $data){
        
        $db = db_connect();

        $result = $db->table('pages')->set($data)->where('id', $id)->update();
        return $result?$result:$db->error();
    }

    public function ViewPage(){
        $result = $this->db->query("select * from Pages");
        return $result->getResult();
    }

    public function ViewSinglePage($id){
        $result = $this->db->query("select * from pages where id='".$id."'");
        return $result->getResult();
    }
    

    public function ViewActivePage(){
        $result = $this->db->query("select * from pages where status=1");
        return $result->getResult();
    }

    public function DeletePage($id){
        $db = db_connect();
        $result = $db->table('pages')->where('id', $id)->delete();
        return $result?$result:$db->error();
    }

    public function CheckPage($id){
        $result = $this->db->query("select * from pages where id='".$id."'");
        return count($result->getResult());
    }
}
