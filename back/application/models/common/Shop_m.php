<?php
class Shop_m extends CI_Model {
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
    
    function getTags($idx) {
        $this->db->select('tag');
        $this->db->from('T_shop');
        $this->db->where('idx', $idx);

        $tag = $this->db->get()->row()->tag;

        return json_decode($tag, true);
    }

    function getShopByShopIdx($shopIdx) {
        $q = $this->db->query("
            SELECT  s.idx, 
                    c.name AS category, 
                    s.name, 
                    s.address,
                    s.base,
                    s.floor,
                    ROUND(sc.star, 1) AS star, 
                    IFNULL(sc.review, 0) AS review, 
                    IFNULL(fc.favorite, 0) AS favorite, 
                    s.distance, 
                    s.url, 
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
            WHERE s.idx = $shopIdx
            GROUP BY s.idx
        ");

        return (array)$q->row() ?? [];
    }

    function getShopByShopId($shopId) {
        $q = $this->db->query("
            SELECT s.idx, s.cidx, s.base, s.floor, ROUND(sc.star, 1) AS star
            FROM T_shop AS s
                LEFT JOIN (
                    SELECT sidx, AVG(star) AS star
                    FROM T_review
                    GROUP BY sidx
                ) AS sc ON sc.sidx = s.idx
            WHERE s.shopId = $shopId
        ");

        return (array)$q->row() ?? [];
    }

    function setShop($cidx, $name, $address, $base, $floor, $distance, $tag, $url, $shopId) {
        $this->db->insert('T_shop', [
            'cidx'      => $cidx,
            'name'      => $name,
            'address'   => $address,
            'base'      => $base,
            'floor'     => $floor,
            'distance'  => $distance,
            'tag'       => json_encode($tag),
            'url'       => $url,
            'shopId'    => $shopId
        ]);

        return $this->db->insert_id();
    }

    function setTags($shopIdx, $tag) {
        $this->db->where('idx', $shopIdx);
        $this->db->update('T_shop', ['tag' => json_encode($tag)]);
    }
}
?>