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

        $method = $this->input->server('REQUEST_METHOD');
        switch($method) {
            case 'POST': $token = trim($this->post('token')); break;
            case 'GET': $token = trim($this->get('token')); break;
            case 'PUT': $token = trim($this->put('token')); break;
            case 'DELETE': $token = trim($this->delete('token')); break;
        }
        
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

    public function myInfo_get() {
        $data = [
            'basic'     => $this->mypage_m->getBasicInfo($this->idx),
            'reviews'   => $this->mypage_m->getReviewsInfo($this->idx),
            'favorites' => $this->mypage_m->getFavoritesInfo($this->idx)
        ];

        $this->response([
            'state' => 200,
            'msg'   => 'OK',
            'data'  => $data 
        ]);
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

    public function changeName_put() {
        $this->load->model('auth_m');

        $name = trim($this->put('name'));

        if (!$name) {
            $this->response([
                'state' => 401,
                'msg'   => '닉네임을 입력해주세요.'
            ]);
        }
        
        $hasName = $this->auth_m->getNickname($name);

        if ($hasName) {
            $this->response([
                'state' => 402,
                'msg'   => '이미 사용중인 닉네임입니다.'
            ]);
        } else {
            $this->mypage_m->setName($this->idx, $name);
            $this->response([
                'state' => 200,
                'msg'   => '닉네임이 변경되었습니다.'
            ]);
        }
    }

    public function deleteReview_delete() {
        $ridx = trim($this->delete('idx'));

        if (!$ridx) {
            $this->response([
                'state' => 401,
                'msg'   => '리뷰를 선택해주세요.'
            ]);
        }

        $isMyReview = $this->mypage_m->checkReview($this->idx, $ridx);

        if (!$isMyReview) {
            $this->response([
                'state' => 402,
                'msg'   => '비정상적인 접근입니다.'
            ]);
        }

        $this->mypage_m->deleteReview($ridx);
        $this->response([
            'state' => 200,
            'msg'   => '리뷰가 삭제되었습니다.'
        ]);
    }
}
?>