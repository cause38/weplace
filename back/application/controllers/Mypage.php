<?php
use chriskacerguis\Restserver\RestController;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

class Mypage extends RestController {

    public $idx;

    function __construct()
    {
        parent::__construct();
        $this->load->model('mypage_m');
        $this->load->model('common/user_m');

        $token = trim($this->post('token'));
        if (!$token) {
            $this->response([
                'state' => 400,
                'msg' => '비정상적인 접근입니다.'
            ]);
        }

        $this->idx = $this->user_m->getIdxByToken($token);
        if (!$this->idx) {
            $this->response([
                'state' => 400,
                'msg' => '비정상적인 접근입니다.'
            ]);
        }
    }

    public function changeProfileImg_post() {
        $this->load->helper(array('form', 'url'));

        $config = array(
            'upload_path' => "./uploads/",
            'allowed_types' => "gif|jpg|png|jpeg|pdf",
            'overwrite' => FALSE,
            'max_size' => "10240000"
        );
    
        $this->load->library('upload',$config);
    
        if($this->upload->do_upload('profileImg')) {
            $this->mypage_m->setProfileImg($this->idx, $this->upload->data()['file_name']);
            $this->response([
                'state' => 200,
                'msg' => '프로필 사진이 변경되었습니다.'
            ]);
        } else {
            $this->response([
                'state' => 401,
                'msg' => $this->upload->error_msg
            ]);
        }
    }
}
?>