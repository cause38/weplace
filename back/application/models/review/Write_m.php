<?php
class Write_m extends CI_Model {
    function getCategories() {
        $this->db->select('*');
        $this->db->from('T_category');
        $this->db->order_by('idx', 'ASC');

        return $this->db->get()->result();
    }

    function getTags() {
        $this->db->select('idx, name');
        $this->db->from('T_tag');
        $this->db->order_by('used', 'DESC');
        $this->db->order_by('name', 'ASC');

        return $this->db->get()->result();
    }
}
?>