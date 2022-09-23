<?php
use chriskacerguis\Restserver\RestController;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

class Login extends RestController {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
    }

    public function index_get($id, $pw)
    {
        $this->load->model('auth/user');
		$data = $this->user->login($id, $pw);
		
        if (!empty($data)) {
            $this->response([
                'state' => 'OK',
                'data' => [
                    'id' => $data->unique_key,
                    'name' => $data->name
                ]
            ], 200);
        } else {
            $this->response([
                'state' => '계정 정보가 확인되지 않습니다.'
            ], 400);
        }

		
    }

    public function index_post()
    {
        // ....
    }

    public function index_put()
    {
        // ....
    }

    public function index_delete()
    {
        // ....
    }
}
?>