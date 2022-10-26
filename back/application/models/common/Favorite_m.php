<?php
class Favorite_m extends CI_Model {

    function setFavorite($uidx, $sidx) {
        $this->db->insert('T_favorite', [
            'uidx' => $uidx,
            'sidx' => $sidx
        ]);
    }

    function deleteFavorite($uidx, $sidx) {
        $this->db->where('uidx', $uidx);
        $this->db->where('sidx', $sidx);
        $this->db->delete('T_favorite');
    }
}
?>