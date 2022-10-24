<?php
use chriskacerguis\Restserver\RestController;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

class Favorite extends RestController {

    public $idx;

    function __construct()
    {
        parent::__construct();
        $this->load->model('common/favorite_m');
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

    public function index_post() {
        $sidx = trim($this->post('idx'));

        if (!$sidx) {
            $this->response([
                'state' => 401,
                'msg'   => '매장을 선택해주세요.'
            ]);
        }

        $this->favorite_m->setFavorite($this->idx, $sidx);
        $this->response([
            'state' => 200,
            'msg'   => '찜 목록에 추가되었습니다.'
        ]);
    }

    public function index_delete() {
        $sidx = trim($this->delete('idx'));

        if (!$sidx) {
            $this->response([
                'state' => 401,
                'msg'   => '매장을 선택해주세요.'
            ]);
        }

        $this->favorite_m->deleteFavorite($this->idx, $sidx);
        $this->response([
            'state' => 200,
            'msg'   => '찜 목록에서 삭제되었습니다.'
        ]);
    }
}
?>