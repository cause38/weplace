<?php
class Lists_m extends CI_Model {
    function getAllCategory() {
        $this->db->select('idx, name');
        $this->db->from('T_category');
        $this->db->order_by('idx', 'ASC');
        
        return $this->db->get()->result();
    }

    function getAllTag($order = false) {
        $this->db->select('idx, name');
        $this->db->from('T_tag');
        if ($order) $this->db->order_by('used', 'DESC');
        $this->db->order_by('idx', 'ASC');

        return $this->db->get()->result();
    }

    function getLists($category, $filter, $favorite, $uidx) {
        $where = '';
        $order_by = '';
        if ($category) $where .= " AND c.idx = $category";
        if ($favorite) $where .= " AND f.uidx = $uidx";
        switch ($filter) {
            case 'recent'   : $order_by = 'sc.wdate DESC'; break;
            case 'star'     : $order_by = 'star DESC'; break;
            case 'distance' : $order_by = 'distance ASC'; break;
            case 'review'   : $order_by = 'review DESC'; break;
            case 'favorite' : $order_by = 'favorite DESC'; break;
        }

        $query = $this->db->query("
            SELECT  s.idx, 
                    c.name AS category, 
                    s.name, 
                    s.distance, 
                    ROUND(sc.star, 1) AS star, 
                    IFNULL(sc.review, 0) AS review, 
                    IFNULL(fc.favorite, 0) AS favorite, 
                    s.tag
            FROM T_shop AS s
                LEFT JOIN T_category AS c ON s.cidx = c.idx
                LEFT JOIN T_favorite AS f ON f.sidx = s.idx
                LEFT JOIN (
                    SELECT sidx, AVG(star) AS star, COUNT(*) AS review, MAX(wdate) AS wdate
                    FROM T_review
                    GROUP BY sidx
                ) AS sc ON sc.sidx = s.idx
                LEFT JOIN (
                    SELECT uidx, sidx, COUNT(*) AS favorite
                    FROM T_favorite
                    GROUP BY sidx
                ) AS fc ON fc.sidx = s.idx
            WHERE 1=1 $where
            GROUP BY s.idx
            ORDER BY $order_by
        ");

        return $query->result();
    }

    function getMyFavorite($uidx) {
        $this->db->select('sidx');
        $this->db->from('T_favorite');
        $this->db->where('uidx', $uidx);

        return $this->db->get()->result();
    }
}
?>