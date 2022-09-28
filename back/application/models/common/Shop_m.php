<?php
class Shop_m extends CI_Model {
    function getTags($idx) {
        $this->db->select('tag');
        $this->db->from('T_shop');
        $this->db->where('idx', $idx);

        $tag = $this->db->get()->row()['tag'];

        return json_decode($tag, true);
    }

    function setShop($cidx, $name, $address, $base, $floor, $distance, $tag, $url) {
        $this->db->insert('T_shop', [
            'cidx'      => $cidx,
            'name'      => $name,
            'address'   => $address,
            'base'      => $base,
            'floor'     => $floor,
            'distance'  => $distance,
            'tag'       => json_encode($tag),
            'url'       => $url
        ]);

        return $this->db->insert_id();
    }
}
?>