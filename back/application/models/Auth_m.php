<?php
class Auth_m extends CI_Model {
    function login($id, $pw) {
        $this->db->select('token, name, thumb');
        $this->db->from('T_user');
        $this->db->where('uid', $id);
        $this->db->where('upw', md5($pw));

        $q = $this->db->get();
        
        if ($q->num_rows()) {
            $this->db->where('token', $q->row()->token);
            $this->db->update('T_user', ['last_login' => date('Y-m-d H:i:s')]);
        }

        return $q->row();
    }

    function getSameId($id) {
        $this->db->select('idx');
        $this->db->from('T_user');
        $this->db->where('uid', $id);

        $q = $this->db->get();

        return $q->num_rows();
    }

    function setCertCode($id, $type) {
        $this->db->where('uid', $id);
        $this->db->where('state', 'R');
        $this->db->where('type', $type);
        $this->db->update('T_code', [
            'state' => 'F',
            'wdate' => date('Y-m-d H:i:s')
        ]);

        $code = strtoupper(uniqid('we'));
        $data = [
            'uid'   => $id,
            'code'  => $code,
            'state' => 'R',
            'type'  => $type
        ];

        $this->db->insert('T_code', $data);

        return $code;
    }

    function getCertCode($id, $code, $type) {
        $this->db->select('code');
        $this->db->from('T_code');
        $this->db->where('uid', $id);
        $this->db->where('code', $code);
        $this->db->where('type', $type);

        $q = $this->db->get();

        if ($q->num_rows()) {
            $this->db->where('uid', $id);
            $this->db->where('code', $code);
            $this->db->where('type', $type);
            $this->db->update('T_code', [
                'state' => 'S',
                'wdate' => date('Y-m-d H:i:s')
            ]);

            return true;
        } else return false;
    }

    function getNickname($name) {
        $this->db->select('name');
        $this->db->from('T_user');
        $this->db->where('name', $name);

        $q = $this->db->get();

        return $q->num_rows();
    }

    function setRegister($id, $pw, $name) {
        $token = md5(microtime().rand());
        $data = [
            'token' => $token,
            'uid'   => $id,
            'upw'   => md5($pw),
            'name'  => $name
        ];

        $this->db->insert('T_user', $data);
    }

    function setNewPassword($id, $pw) {
        $this->db->where('uid', $id);
        $this->db->update('T_user', [
            'upw' => md5($pw)
        ]);
    }
}
?>