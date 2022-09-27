<?php
class User_m extends CI_Model {

    function getIdxByToken($token) {
        $this->db->select('idx');
        $this->db->from('T_user');
        $this->db->where('token LIKE BINARY', $token);

        $q = $this->db->get()->row();

        return is_null($q) ? false : $q->idx;
    }
}
?>