<?php
class User extends CI_Model {
    function login($id, $pw) {
        $this->db->select('unique_key, name, thumb');
        $this->db->from('T_user');
        $this->db->where('uid', $id);
        $this->db->where('upw', md5($pw));

        $q = $this->db->get();
        
        if ($q->num_rows()) {
            $this->db->where('unique_key', $q->row()->unique_key);
            $this->db->update('T_user', ['last_login' => date('Y-m-d H:i:s')]);
        }

        return $q->row();
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
}
?>