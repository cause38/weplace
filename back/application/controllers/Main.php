<?php
use chriskacerguis\Restserver\RestController;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

class Main extends RestController {
    function __construct()
    {
        parent::__construct();
        $this->load->model('main_m');
    }

    public function index_get() {
        $data = [
            'reviews' => $this->main_m->getRecentReviews()
        ];

        $this->response([
            'state' => 200,
            'msg'   => 'OK',
            'data'  => $data
        ]);
    }
}
?>