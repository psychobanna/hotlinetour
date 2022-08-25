<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\BookingModel;
use App\Models\TicketModel;
// use App\Models\AgentModel;
use CodeIgniter\HTTP\URI;
use Config\Services;

class BookingController extends BaseController
{
    public function index()
    {
        //
    }

    public function ViewBooking(){

        $result = (new BookingModel())->ViewBookings();
        
        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => (object)[],
            'errors' => (object)[],
            'data' => $result
        ]);
    }

    public function ViewBookingById(){

        $id = $this->request->uri->getSegment(3);

        
        $result = (new BookingModel())->ViewBookingbyID($id);
        
        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => (object)[],
            'errors' => (object)[],
            'data' => $result[0]
        ]);

    }
    public function ViewBookingByAgent(){

        $id = $this->request->uri->getSegment(3);

        $result = (new BookingModel())->ViewActiveAgent();
        
        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => (object)[],
            'errors' => (object)[],
            'data' => $result
        ]);
    }

    public function AddBooking(){
        
        $request = Services::request();
        // `id`, `title_name`, `first_name`, `middle_name`, `last_name`, `agent_id`, `email`, `phone`, `amount`, `payment_id`, `date_time`, `payment_status`

        $ticket = (new TicketModel())->ViewTicket();        

        if($ticket[0]->qty == 0){
            return $this->response->setJSON ([
                'response_code' => 422,
                'message' => 'Sorry, Tickets sold out.',
                'errors' => 'Sorry, Tickets sold out.',
                'data' => (object)[]
            ]);  
        }  

        $data = [
            'title_name'   => $request->getPost('title_name'),
            'first_name' => $request->getPost('first_name'),
            'middle_name' => $request->getPost('middle_name'),
            'last_name' => $request->getPost('last_name'),
            'agent_id' => $request->getPost('agent_id'),
            'email' => $request->getPost('email'),
            'phone' => $request->getPost('phone'),
            'amount' => $request->getPost('amount'),
            'payment_id' => $request->getPost('payment_id'),
        ];
        
        $payment_id = $request->getPost('payment_id');

        $rule = [
            'payment_id'   => 'required|is_unique[booking.payment_id,{$payment_id}]|min_length[3]',
            'title_name' => 'required|min_length[3]',
            'first_name' => 'required|min_length[3]',
            'middle_name' => 'required|min_length[3]',
            'last_name' => 'required|min_length[3]',
            'agent_id' => 'required|min_length[1]',
            'email' => 'required|min_length[3]',
            'phone' => 'required|min_length[3]',
            'amount' => 'required',
        ];

        if (! $this->validateData($data, $rule)) {
            return $this->response->setJSON ([
                'response_code' => 422,
                'message' => 'The given data was invalid.',
                'errors' => $this->validator->getErrors(),
                'data' => (object)[]
            ]);
        }
        $response  = (new BookingModel())->AddBooking($data);
        if($response['result']){

            (new TicketModel())->UpdateTicketQuantity(1, 1);

            return $this->response->setJSON ([
                'response_code' => 200,
                'message' => 'Booking record added.',
                'errors' => (object)[],
                'data' => $response
            ]);
        }else{

            return $this->response->setJSON ([
                'response_code' => 422,
                'message' => 'Booking record not added.',
                'errors' => (object)[],
                'data' => $response
            ]);            
        }
    }

    
    public function TicketStatus(){

        $result = (new TicketModel())->ViewTicket();
        
        return $this->response->setJSON ([
            'response_code' => 200,
            'message' => (object)[],
            'errors' => (object)[],
            'data' => $result[0]->qty
        ]);
    }
}
