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

    function setReview($uidx, $sidx, $menu, $star, $comment, $comment_good, $comment_bad, $tag) {
        $this->db->insert('T_review', [
            'uidx'          => $uidx,
            'sidx'          => $sidx,
            'menu'          => $menu,
            'star'          => $star,
            'comment'       => $comment,
            'comment_good'  => $comment_good,
            'comment_bad'   => $comment_bad,
            'tag'           => json_encode($tag)
        ]);

        return $this->db->insert_id();
    }
}
?>