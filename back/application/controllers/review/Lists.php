<?php
use chriskacerguis\Restserver\RestController;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

class Lists extends RestController {

    function __construct()
    {
        parent::__construct();
        $this->load->model('review/lists_m');
        $this->load->model('common/shop_m');
    }

    public function filters_get() {
        $data = [
            'category' => $this->shop_m->getAllCategory(),
            'tag'      => $this->shop_m->getAllTag(true)
        ];

        $this->response([
            'state' => 200,
            'msg'   => 'OK',
            'data'  => $data
        ]);
    }

    public function index_get() {
        $category = trim($this->get('category') ?? 0);
        $filter   = trim($this->get('filter') ?? 'recent');
        $favorite = trim($this->get('favorite') ?? false);
        $favorite = $favorite === 'true' ? true : false;
        $tag      = json_decode(trim($this->get('tag') ?? '[]'), true);
        $token    = trim($this->get('token') ?? '');
        $idx      = 0;
        $myFavorite = [];

        if ($token) {
            $this->load->model('common/user_m');

            $idx = $this->user_m->getIdxByToken($token);
            if (!$idx) {
                $this->response([
                    'state' => 400,
                    'msg' => '비정상적인 접근입니다.'
                ]);
            }
            $myFavorite = $this->lists_m->getMyFavorite($idx);
        }

        $data = $this->lists_m->getLists($category, $filter, $favorite, $idx);

        $allTag = $this->shop_m->getAllTag();

        foreach ($data as $k => $v) {
            $vidx = $v->idx;
            $vtag = json_decode($v->tag, true);
            $data[$k]->tag = json_decode($v->tag);

            $data[$k]->isFavorite = false;
            foreach($myFavorite as $fav) {
                if ($vidx == $fav->sidx) {
                    $data[$k]->isFavorite = true;
                    break;
                }
            }
            
            foreach($tag as $t) {
                if (!in_array($t, $vtag)) {
                    unset($data[$k]);
                    break;
                }
            }
        }

        $data = array_values(array_filter($data));

        foreach ($data as $k => $v) {
            $vtag = $v->tag;
            foreach ($vtag as $kk => $t) {
                foreach ($allTag as $a) {
                    if ($a->idx == $t) {
                        $data[$k]->tag[$kk] = $a->name;
                        break;
                    }
                }
            }
        }

        $this->response([
            'state' => 200,
            'msg'   => 'OK',
            'data'  => $data
        ]);
    }
}
?>