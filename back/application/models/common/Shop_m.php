<?php
class Shop_m extends CI_Model {
    function getTags($idx) {
        $this->db->select('tag');
        $this->db->from('T_shop');
        $this->db->where('idx', $idx);

        $tag = $this->db->get()->row()['tag'];

        return json_decode($tag, true);
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
            'tag'       => $tag,
            'url'       => $url,
            'shopId'    => $shopId
        ]);

        return $this->db->insert_id();
    }
}
?>