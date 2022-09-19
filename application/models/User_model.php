<?php
class User_model extends CI_Model {
    function getAllUsers() {
        return $this->db->query('SELECT * FROM T_user')->result();
    }
}
?>