<?php
use chriskacerguis\Restserver\RestController;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

class Write extends RestController {

    function __construct()
    {
        parent::__construct();
        $this->load->model('review/write_m');
    }

    public function index_get() {
        $data = [
            'category' => $this->write_m->getCategories(),
            'tag'      => $this->write_m->getTags()
        ];

        $this->response([
            'state' => 200,
            'msg'   => 'OK',
            'data'  => $data
        ]);
    }

    public function index_post() {
        $this->load->model('common/user_m');
        $this->load->model('common/shop_m');

        $token = trim($this->post('token'));
        
        if (!$token) {
            $this->response([
                'state' => 400,
                'msg' => '비정상적인 접근입니다.'
            ]);
        }

        $idx = $this->user_m->getIdxByToken($token);
        if (!$idx) {
            $this->response([
                'state' => 400,
                'msg' => '비정상적인 접근입니다.'
            ]);
        }

        $shopIdx      = trim($this->post('shopIdx'));
        $shop         = trim($this->post('shop'))         ?: $this->response(['state' => 401, 'msg' => '매장을 선택해주세요.']);
        $address      = trim($this->post('address'));
        $distance     = trim($this->post('distance'));
        $url          = trim($this->post('url'));
        $base         = trim($this->post('base'))         ?: $this->response(['state' => 403, 'msg' => '지상/지하를 선택해주세요.']);
        $floor        = trim($this->post('floor'))        ?: $this->response(['state' => 404, 'msg' => '층수를 선택해주세요.']);
        $category     = trim($this->post('category'))     ?: $this->response(['state' => 405, 'msg' => '카테고리를 선택해주세요.']);
        $menu         = trim($this->post('menu'))         ?: $this->response(['state' => 406, 'msg' => '메뉴명을 입력해주세요.']);
        $star         = trim($this->post('star'))         ?: $this->response(['state' => 407, 'msg' => '별점을 선택해주세요.']);
        $comment      = trim($this->post('comment'))      ?: $this->response(['state' => 408, 'msg' => '한줄평을 입력해주세요.']);
        $comment_good = trim($this->post('comment_good')) ?: $this->response(['state' => 409, 'msg' => '장점을 입력해주세요.']);
        $comment_bad  = trim($this->post('comment_bad'))  ?: $this->response(['state' => 410, 'msg' => '단점을 입력해주세요.']);
        $tag          = trim($this->post('tag')); // option

        
        // image
        $this->load->helper(array('form', 'url'));

        $config = array(
            'upload_path' => "./uploads/review/",
            'allowed_types' => "gif|jpg|png|jpeg|webp",
            'overwrite' => FALSE,
            'max_size' => "10240000"
        );
    
        $this->load->library('upload',$config);

        if(!$this->upload->do_multi_upload('reviewImg')) {
            foreach ($this->upload->get_multi_upload_data() as $data) unlink($data['full_path']);
            $this->response([
                'state' => 411,
                'msg' => $this->upload->error_msg
            ]);
        }


        // tag 사용량 증가
        $this->write_m->setUsedTags($tag);

        if (!$shopIdx) {
            // shop 등록
            $shopIdx = $this->shop_m->setShop($category, $shop, $address, $base, $floor, $distance, $tag, $url);
        } else {
            // shop tag 병합
            $tag += $this->shop_m->getTags($shopIdx);
        }

        // review 등록
        $ridx = $this->write_m->setReveiw($idx, $shopIdx, $menu, $star, $comment, $comment_good, $comment_bad, $tag);

        // review 이미지 등록
        foreach ($this->upload->get_multi_upload_data() as $data) {
            $this->write_m->setReviewImg($ridx, $data['file_name']);
        }

        $this->response([
            'state' => 200,
            'msg' => '리뷰가 등록되었습니다.'
        ]);
    }
}
?>