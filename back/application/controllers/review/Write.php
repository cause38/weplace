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
        $this->load->model('common/review_m');
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

        $shopIdx      = trim($this->post('idx'));
        $shop         = trim($this->post('name'))         ?: $this->response(['state' => 401, 'msg' => '매장을 선택해주세요.']);
        $address      = trim($this->post('address'));
        $distance     = trim($this->post('distance'));
        $url          = trim($this->post('url'));
        $shopId       = explode('/', $url);
        $shopId       = end($shopId);
        $base         = trim($this->post('base'))         ?: $this->response(['state' => 402, 'msg' => '지상/지하를 선택해주세요.']);
        $floor        = trim($this->post('floor'))        ?: $this->response(['state' => 403, 'msg' => '층수를 선택해주세요.']);
        $category     = trim($this->post('cidx'))         ?: $this->response(['state' => 404, 'msg' => '카테고리를 선택해주세요.']);
        $menu         = trim($this->post('menu'))         ?: $this->response(['state' => 405, 'msg' => '메뉴명을 입력해주세요.']);
        $star         = trim($this->post('star'))         ?: $this->response(['state' => 406, 'msg' => '별점을 선택해주세요.']);
        $comment      = trim($this->post('comment'))      ?: $this->response(['state' => 407, 'msg' => '한줄평을 입력해주세요.']);
        $comment_good = trim($this->post('comment_good')) ?: $this->response(['state' => 408, 'msg' => '장점을 입력해주세요.']);
        $comment_bad  = trim($this->post('comment_bad'))  ?: $this->response(['state' => 409, 'msg' => '단점을 입력해주세요.']);
        $tag          = explode(',', trim($this->post('tag') ?: '')); // option
        foreach($tag as $k => $v) $tag[$k] = (int)trim($v);

        
        // image
        $this->load->helper(array('form', 'url'));

        $config = array(
            'upload_path' => "./uploads/review/",
            'allowed_types' => "gif|jpg|png|jpeg|webp",
            'overwrite' => FALSE,
            'max_size' => "10240"
        );
    
        $this->load->library('upload',$config);

        if(!$this->upload->do_multi_upload('reviewImg')) {
            foreach ($this->upload->get_multi_upload_data() as $data) unlink($data['full_path']);
            if ($this->upload->error_msg !== []) {
                $this->response([
                    'state' => 410,
                    'msg' => $this->upload->error_msg
                ]);
            }
        }


        // tag 사용량 증가
        $this->review_m->setUsedTags($tag);

        if (!$shopIdx) {
            // shop 등록
            $shopIdx = $this->shop_m->setShop($category, $shop, $address, $base, $floor, $distance, $tag, $url, $shopId);
        } else {
            // shop tag 병합
            $shopTag = $tag + $this->shop_m->getTags($shopIdx);
            $this->shop_m->setTags($shopIdx, $shopTag);
        }

        // review 등록
        $ridx = $this->write_m->setReview($idx, $shopIdx, $menu, $star, $comment, $comment_good, $comment_bad, $tag);

        // review 이미지 등록
        foreach ($this->upload->get_multi_upload_data() as $data) {
            $this->review_m->setReviewImage($ridx, $data['file_name']);
        }

        $this->response([
            'state' => 200,
            'msg'   => '리뷰가 등록되었습니다.',
            'data'  => ['shopIdx' => $shopIdx]
        ]);
    }

    public function mapInfo_post() {
        $this->load->model('common/shop_m');

        $json = trim($this->post('json')) ?: $this->response(['state' => 400, 'msg' => '데이터를 확인할 수 없습니다.']);
        $json = json_decode($json, true);

        $main = [];
        $sub = [];
        foreach($json as $shop) {
            $_data = $this->shop_m->getShopByShopId($shop['id']);
            $data = [
                'address' => $shop['road_address_name'],
                'distance' => round((int)$shop['distance'] / 70) ?: 1,
                'name' => $shop['place_name'],
                'url' => $shop['place_url']
            ];

            if ($_data) {
                $main[] = $_data + $data;
            } else {
                $sub[] = $data;
            }
        }

        $result = [
            'main' => $main,
            'sub'  => $sub
        ];

        $this->response([
            'state' => 200,
            'msg'   => 'OK',
            'data'  => $result
        ]);
    }
}
?>