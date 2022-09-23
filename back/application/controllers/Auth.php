<?php
use chriskacerguis\Restserver\RestController;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

class Auth extends RestController {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
    }

    public function login_post()
    {
        $id = trim($this->post('id'));
        $pw = trim($this->post('pw'));
        if ($id && $pw) {
            $this->load->model('auth/user');
            $data = $this->user->login($id, $pw);
            
            if (!empty($data)) {
                $this->response([
                    'state' => 200,
                    'msg'   => 'OK',
                    'data'  => [
                        'id' => $data->unique_key,
                        'name' => $data->name
                    ]
                ]);
            } else {
                $this->response([
                    'state' => 401,
                    'msg'   => '계정 정보가 확인되지 않습니다.'
                ]);
            }
        } else {
            $this->response([
                'state' => 400,
                'msg'   => '아이디 또는 비밀번호를 입력해주세요.'
            ]);
        }
    }
}
?>