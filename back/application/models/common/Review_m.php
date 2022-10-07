<?php
class Review_m extends CI_Model {
    function checkReview($idx, $ridx) {
        $this->db->select('idx');
        $this->db->from('T_review');
        $this->db->where('uidx', $idx);

        return $this->db->get()->num_rows();
    }

    function deleteReview($ridx) {
        $this->db->where('idx', $ridx);
        $this->db->delete('T_review');
    }
}
?>