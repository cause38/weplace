<?php
class Main_m extends CI_Model {
    function getRecentReviews() {
        $q = $this->db->query("
            SELECT s.idx, r.menu, r.star, s.name, r.comment, DATE(r.wdate) AS wdate
            FROM T_review AS r
                LEFT JOIN T_shop AS s
                ON r.sidx = s.idx
            ORDER BY r.wdate DESC
            LIMIT 5
        ");

        return $q->result();
    }
}
?>