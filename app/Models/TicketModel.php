<?php

namespace App\Models;

use CodeIgniter\Model;

class TicketModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'ticket';
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
        
        $result = $this->db->table('ticket')->insert($data);

        return $result;
    }

    public function EditTicket($id, $data){
        
        $db = db_connect();

        $result = $db->table('ticket')->set($data)->where('id', $id)->update();
        return $result?$result:$db->error();
    }

    public function ViewTicket(){
        $result = $this->db->query("select * from ticket");
        return $result->getResult();
    }

    public function UpdateTicketQuantity($id, $quantity){
        
        $db = db_connect();

        $ticket = $this->ViewTicket();
        $ticket = $ticket[0];
        $quantity = $ticket->qty - $quantity;

        $result = $db->table('ticket')->set(['qty'=>$quantity])->where('id', $id)->update();
        return $result?$result:$db->error();
    }

}
