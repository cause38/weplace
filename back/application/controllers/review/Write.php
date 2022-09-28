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
}
?>