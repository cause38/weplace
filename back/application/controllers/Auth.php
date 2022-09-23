<?php
use chriskacerguis\Restserver\RestController;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

class Auth extends RestController {

    function __construct()
    {
        parent::__construct();
        $this->load->model('auth/user');
    }

    public function login_post()
    {
        $id = trim($this->post('id'));
        $pw = trim($this->post('pw'));
        if ($id && $pw) {
            $data = $this->user->login($id, $pw);
            
            if (!empty($data)) {
                $this->response([
                    'state' => 200,
                    'msg'   => 'OK',
                    'data'  => [
                        'id' => $data->unique_key,
                        'name' => $data->name
                    ]
                ]);
            } else {
                $this->response([
                    'state' => 401,
                    'msg'   => '계정 정보가 확인되지 않습니다.'
                ]);
            }
        } else {
            $this->response([
                'state' => 400,
                'msg'   => '아이디 또는 비밀번호를 입력해주세요.'
            ]);
        }
    }

    public function registerCode_post(){
        $id = trim($this->post('id'));

        if (!$id) {
            $this->response([
                'state' => 400,
                'msg'   => '아이디를 입력해주세요.'
            ]);
        } elseif (!filter_var($id, FILTER_VALIDATE_EMAIL)) {
            $this->response([
                'state' => 401,
                'msg'   => '이메일 주소를 확인해주세요.'
            ]);
        } elseif (explode('@', $id)[1] !== 'weballin.com') {
            $this->response([
                'state' => 402,
                'msg'   => '사용할 수 없는 이메일입니다.\n weballin 계정으로 가입해주세요.'
            ]);
        } else {
            $isSameId = $this->user->getSameId($id);

            if ($isSameId) {
                $this->response([
                    'state' => 403,
                    'msg'   => '이미 사용중인 이메일입니다.'
                ]);
            } else {
                $this->load->library('phpmailer_lib');

                $mail = $this->phpmailer_lib->load();
                $code = $this->user->setCertCode($id, 'R'); // 'R' : Register

                // SMTP configuration
                $mail->isSMTP();
                $mail->Host     = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->SMTPKeepAlive = true;
                $mail->Username = 'enquire@weballin.com';
                $mail->Password = 'fnfnetwork@0126';
                $mail->SMTPSecure = 'ssl';
                $mail->Port     = 465;
                $mail->CharSet    = "EUC-KR";
                $mail->Encoding   = "base64";

                $mail->setFrom('enquire@weballin.com', 'Weplace');
                $mail->addAddress('tg.kim@weballin.com');

                $mail->isHTML(true);

                $mail->Subject = iconv('UTF-8', 'EUC-KR', 'Weplace - 인증 코드');
                $mailContent = "<h2>Weplace 인증 코드</h2>
                    <p><strong>인증 코드</strong> : ".$code."</p>";
                $mail->Body = $mailContent;

                // Send email
                if(!$mail->send()){
                    $this->response([
                        'state' => 404,
                        'msg'   => '이메일을 발송하지 못했습니다.\n' . $mail->ErrorInfo
                    ]);
                }else{
                    $this->response([
                        'state' => 200,
                        'msg'   => '이메일이 발송되었습니다.\n인증번호를 입력해주세요.'
                    ]);;
                }
            }
        }
    }

    public function registerCode_get(){
        $id = trim($this->get('id'));
        $code = trim($this->get('code'));

        if (!$id) {
            $this->response([
                'state' => 400,
                'msg'   => '아이디를 입력해주세요.'
            ]);
        } elseif (!$code) {
            $this->response([
                'state' => 401,
                'msg'   => '인증번호를 입력해주세요.'
            ]);
        } else {
            $isMatched = $this->user->getCertCode($id, $code, 'R'); // 'R' : Register

            if (!$isMatched) {
                $this->response([
                    'state' => 402,
                    'msg'   => '인증번호가 일치하지 않습니다.'
                ]);
            } else {
                $this->response([
                    'state' => 200,
                    'msg'   => '인증이 완료되었습니다.'
                ]);
            }
        }
    }

    public function nickname_get() {
        $name = trim($this->get('name'));

        if (!$name) {
            $this->response([
                'state' => 400,
                'msg'   => '닉네임을 입력해주세요.'
            ]);
        } else {
            $hasName = $this->user->getNickname($name);

            if ($hasName) {
                $this->response([
                    'state' => 401,
                    'msg'   => '이미 사용중인 닉네임입니다.'
                ]);
            } else {
                $this->response([
                    'state' => 200,
                    'msg'   => '사용 가능한 닉네임입니다.'
                ]);
            }
        }
    }

    public function register_post()
    {
        $id = trim($this->post('id'));
        $pw = trim($this->post('pw'));
        $pw2 = trim($this->post('pw2'));
        $name = trim($this->post('name'));

        if (!$id) {
            $this->response([
                'state' => 400,
                'msg'   => '아이디를 입력해주세요.'
            ]);
        } elseif (!filter_var($id, FILTER_VALIDATE_EMAIL)) {
            $this->response([
                'state' => 401,
                'msg'   => '이메일 주소를 확인해주세요.'
            ]);
        } elseif (explode('@', $id)[1] !== 'weballin.com') {
            $this->response([
                'state' => 402,
                'msg'   => '사용할 수 없는 이메일입니다.\n weballin 계정으로 가입해주세요.'
            ]);
        } elseif ($this->user->getSameId($id)) {
            $this->response([
                'state' => 403,
                'msg'   => '이미 사용중인 이메일입니다.'
            ]);
        } elseif (!$pw) {
            $this->response([
                'state' => 404,
                'msg'   => '비밀번호를 입력해주세요.'
            ]);
        } elseif ($pw !== $pw2) {
            $this->response([
                'state' => 405,
                'msg'   => '비밀번호가 일치하지 않습니다.'
            ]);
        } elseif (!$name) {
            $this->response([
                'state' => 406,
                'msg'   => '닉네임을 입력해주세요.'
            ]);
        } elseif ($this->user->getNickname($name)) {
            $this->response([
                'state' => 407,
                'msg'   => '이미 사용중인 닉네임입니다.'
            ]);
        } else {
            $this->user->setRegister($id, $pw, $name);
            $this->response([
                'state' => 200,
                'msg'   => '회원가입이 완료되었습니다!'
            ]);
        }
    }
}
?>