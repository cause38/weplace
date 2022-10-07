<?php
class Mypage_m extends CI_Model {
    function getBasicInfo($idx) {
        $this->db->select('uid, name, thumb');
        $this->db->from('T_user');
        $this->db->where('idx', $idx);

        return $this->db->get()->row();
    }

    function getReviewsInfo($idx) {
        $q = $this->db->query("
            SELECT r.idx, r.menu, r.star, s.name, r.comment, DATE(r.wdate) AS wdate
            FROM T_review AS r
                LEFT JOIN T_shop AS s
                ON r.sidx = s.idx
            WHERE r.uidx = $idx
        ");

        return $q->result();
    }

    function getFavoritesInfo($idx) {
        $q = $this->db->query("
            SELECT s.idx, c.name AS category, s.name, ROUND(sc.star, 1) AS star, sc.review, fc.favorite, DATE(f.wdate) AS wdate
            FROM T_favorite AS f
                LEFT JOIN T_shop AS s ON f.sidx = s.idx
                LEFT JOIN T_category AS c ON s.cidx = c.idx
                LEFT JOIN (
                    SELECT sidx, AVG(star) AS star, COUNT(*) AS review
                    FROM T_review
                    GROUP BY sidx
                ) AS sc ON sc.sidx = s.idx
                LEFT JOIN (
                    SELECT sidx, COUNT(*) AS favorite
                    FROM T_favorite
                    GROUP BY sidx
                ) AS fc ON fc.sidx = s.idx
            WHERE f.uidx = $idx
        ");
        
        return $q->result();
    }

    function setProfileImg($idx, $fileName) {
        $this->db->where('idx', $idx);
        $this->db->update('T_user', [
            'thumb' => UPLOAD_PATH . 'profile/' . $fileName
        ]);
    }

    function setName($idx, $name) {
        $this->db->where('idx', $idx);
        $this->db->update('T_user', [
            'name' => $name
        ]);
    }

    function deleteFavorite($uidx, $sidx) {
        $this->db->where('uidx', $uidx);
        $this->db->where('sidx', $sidx);
        $this->db->delete('T_favorite');
    }
}
?>