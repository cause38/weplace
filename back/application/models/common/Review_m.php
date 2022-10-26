<?php
class Review_m extends CI_Model {
    function checkReview($idx, $ridx) {
        $this->db->select('idx');
        $this->db->from('T_review');
        $this->db->where('uidx', $idx);
        $this->db->where('idx', $ridx);

        return $this->db->get()->num_rows();
    }

    function deleteReview($ridx) {
        $this->db->where('idx', $ridx);
        $this->db->delete('T_review');
    }

    function getReviewImage($ridx) {
        $this->db->select('image');
        $this->db->from('T_image');
        $this->db->where('ridx', $ridx);

        return $this->db->get()->result();
    }

    function setReviewImage($idx, $fileName) {
        $this->db->insert('T_image', [
            'ridx' => $idx,
            'image' => UPLOAD_PATH . 'review/' . $fileName
        ]);
    }

    function deleteReviewImage($ridx) {
        $this->db->where('ridx', $ridx);
        $this->db->delete('T_image');
    }

    function getReviewTag($ridx) {
        $this->db->select('tag');
        $this->db->from('T_review');
        $this->db->where('idx', $ridx);

        return $this->db->get()->tag ?? [];
    }

    function setUsedTags($tag) {
        foreach ($tag as $idx) {
            $this->db->set('used', 'used+1', FALSE);
            $this->db->where('idx', $idx);
            $this->db->update('T_tag');
        }
    }

}
?>