<?php
class Mypage_m extends CI_Model {
    function setProfileImg($idx, $fileName) {
        $this->db->where('idx', $idx);
        $this->db->update('T_user', [
            'thumb' => UPLOAD_PATH . $fileName
        ]);
    }

    function setName($idx, $name) {
        $this->db->where('idx', $idx);
        $this->db->update('T_user', [
            'name' => $name
        ]);
    }
}
?>