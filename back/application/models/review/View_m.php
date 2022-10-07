<?php
class View_m extends CI_Model {
    function getFavorite($sidx, $uidx) {
        $this->db->select('*');
        $this->db->from('T_favorite');
        $this->db->where('sidx', $sidx);
        $this->db->where('uidx', $uidx);

        return $this->db->get()->num_rows() ? true : false;
    }

    function getReview($sidx, $uidx) {
        $q = $this->db->query("
            SELECT 
                r.idx, 
                r.uidx = $uidx AS isMine,
                u.thumb,
                u.name,
                r.star,
                r.comment,
                r.menu,
                r.tag,
                DATE(r.wdate) AS wdate,
                r.comment_good,
                r.comment_bad
            FROM T_review AS r
                LEFT JOIN T_shop AS s ON s.idx = r.sidx
                LEFT JOIN T_user AS u ON u.idx = r.uidx
            WHERE s.idx = $sidx
            ORDER BY wdate DESC
        ;");

        return $q->result();
    }

    function getReviewImage($ridx) {
        $this->db->select('image');
        $this->db->from('T_image');
        $this->db->where('ridx', $ridx);

        return $this->db->get()->result();
    }
}
?>