<?php
use chriskacerguis\Restserver\RestController;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

class Modify extends RestController {

    public $idx;

    function __construct()
    {
        parent::__construct();
        $this->load->model('review/modify_m');
        $this->load->model('common/user_m');
        $this->load->model('common/review_m');

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

    public function index_get() {
        $ridx = trim($this->get('ridx')) ?: $this->response(['state' => 401, 'msg' => '리뷰를 선택해주세요.']);

        $isMyReview = $this->review_m->checkReview($this->idx, $ridx);
        
        if (!$isMyReview) $this->response(['state' => 402, 'msg' => '비정상적인 접근입니다.']);

        $data = $this->modify_m->getModifyData($ridx);

        $images = $this->review_m->getReviewImage($ridx);
        $image = [];
        foreach ($images as $img) {
            $image[] = $img->image;
        }

        $data->tag   = json_decode($data->tag);
        $data->image = $image;

        $this->response([
            'state' => 200,
            'msg'   => 'OK',
            'data'  => [
                'tag'    => $this->modify_m->getTags(),
                'review' => $data
            ]
        ]);
    }

    public function index_post() {
        $this->load->model('common/shop_m');

        $shopIdx      = trim($this->post('idx'));
        $ridx         = trim($this->post('ridx'))         ?: $this->response(['state' => 401, 'msg' => '리뷰를 선택해주세요.']);
        $menu         = trim($this->post('menu'))         ?: $this->response(['state' => 402, 'msg' => '메뉴명을 입력해주세요.']);
        $star         = trim($this->post('star'))         ?: $this->response(['state' => 403, 'msg' => '별점을 선택해주세요.']);
        $comment      = trim($this->post('comment'))      ?: $this->response(['state' => 404, 'msg' => '한줄평을 입력해주세요.']);
        $comment_good = trim($this->post('comment_good')) ?: $this->response(['state' => 405, 'msg' => '장점을 입력해주세요.']);
        $comment_bad  = trim($this->post('comment_bad'))  ?: $this->response(['state' => 406, 'msg' => '단점을 입력해주세요.']);
        $tag          = trim($this->post('tag') ?: '')    ? explode(',', trim($this->post('tag'))) : []; // option
        foreach($tag as $k => $v) $tag[$k] = (int)trim($v);

        $isMyReview = $this->review_m->checkReview($this->idx, $ridx);
        if (!$isMyReview) $this->response(['state' => 407, 'msg' => '비정상적인 접근입니다.']);

        
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
                    'state' => 408,
                    'msg' => $this->upload->error_msg
                ]);
            }
        }

        // 기존 리뷰 태그 확인
        $reviewTag = $this->review_m->getReviewTag($ridx);

        // 신규 사용 리뷰 확인
        $newTag = array_values(array_diff($tag, $reviewTag));

        // tag 사용량 증가
        $this->review_m->setUsedTags($newTag);

        // shop tag 병합
        $shopTag = $newTag + $this->shop_m->getTags($shopIdx);
        $this->shop_m->setTags($shopIdx, $shopTag);

        // review 등록
        $this->modify_m->setReveiw($ridx, $menu, $star, $comment, $comment_good, $comment_bad, $tag);

        // 기존 review 이미지 삭제
        $images = $this->review_m->getReviewImage($ridx);
        foreach ($images as $img) {
            $image = explode(API_PATH, $img->image);
            $image = './'.end($image);
            unlink($image);
        }
        $this->review_m->deleteReviewImage($ridx);

        // review 이미지 등록
        foreach ($this->upload->get_multi_upload_data() as $data) {
            $this->review_m->setReviewImage($ridx, $data['file_name']);
        }

        $this->response([
            'state' => 200,
            'msg'   => '리뷰가 수정되었습니다.',
            'data'  => ['shopIdx' => $shopIdx]
        ]);
    }
}
?>