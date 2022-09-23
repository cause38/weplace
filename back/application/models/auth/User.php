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
}
?>