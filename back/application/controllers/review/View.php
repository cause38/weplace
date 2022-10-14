<?php
use chriskacerguis\Restserver\RestController;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

class View extends RestController {

    function __construct()
    {
        parent::__construct();
        $this->load->model('review/view_m');
        $this->load->model('common/shop_m');
        $this->load->model('common/review_m');
    }

    public function index_get() {
        $shopIdx  = trim($this->get('idx'))          ?: $this->response(['state' => 401, 'msg' => '등록되지 않은 매장입니다.']);
        $token    = trim($this->get('token') ?? '');
        $favorite = false;

        $idx = 0;
        if ($token) {
            $this->load->model('common/user_m');

            $idx = $this->user_m->getIdxByToken($token);
            if (!$idx) {
                $this->response([
                    'state' => 400,
                    'msg' => '비정상적인 접근입니다.'
                ]);
            }
            $isFavorite = $this->view_m->getFavorite($shopIdx, $idx);
        }

        $shopInfo = $this->shop_m->getShopByShopIdx($shopIdx);

        if (!$shopInfo) {
            $this->response([
                'state' => 401,
                'msg' => '등록되지 않은 매장입니다.'
            ]);
        }

        $shopInfo['tag'] = json_decode($shopInfo['tag'], true);
        $allTag = $this->shop_m->getAllTag();
        $tags   = $shopInfo['tag'];
        foreach ($tags as $kk => $t) {
            foreach ($allTag as $a) {
                if ($a->idx == $t) {
                    $shopInfo['tag'][$kk] = $a->name;
                    break;
                }
            }
        }


        $review = $this->view_m->getReview($shopIdx, $idx);
        foreach ($review as $k => $v) {
            $review[$k]->tag = json_decode($v->tag);
            $vtag = $v->tag;
            foreach ($vtag as $kk => $t) {
                foreach ($allTag as $a) {
                    if ($a->idx == $t) {
                        $review[$k]->tag[$kk] = $a->name;
                        break;
                    }
                }
            }

            $images = $this->review_m->getReviewImage($v->idx);
            $image = [];
            foreach ($images as $img) {
                $image[] = $img->image;
            }
            $review[$k]->image = $image;

            $review[$k]->isMine = !!$v->isMine;
        }

        $data = [
            'shopInfo'   => $shopInfo,
            'isFavorite' => $isFavorite,
            'review'     => $review
        ];

        $this->response([
            'state' => 200,
            'msg'   => 'OK',
            'data'  => $data
        ]);
    }

    public function index_delete() {
        $this->load->model('common/user_m');

        $ridx  = trim($this->delete('idx'));
        $token = trim($this->get('token'));

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

        if (!$ridx) {
            $this->response([
                'state' => 401,
                'msg'   => '리뷰를 선택해주세요.'
            ]);
        }

        $isMyReview = $this->review_m->checkReview($idx, $ridx);

        if (!$isMyReview) {
            $this->response([
                'state' => 402,
                'msg'   => '비정상적인 접근입니다.'
            ]);
        }

        $this->review_m->deleteReview($ridx);
        $this->response([
            'state' => 200,
            'msg'   => '리뷰가 삭제되었습니다.'
        ]);
    }
}
?>