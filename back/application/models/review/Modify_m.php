<?php
class Modify_m extends CI_Model {
    function getTags() {
        $this->db->select('idx, name');
        $this->db->from('T_tag');
        $this->db->order_by('used', 'DESC');
        $this->db->order_by('name', 'ASC');

        return $this->db->get()->result();
    }

    function getModifyData($ridx) {
        $q = $this->db->query("
            SELECT  r.idx AS ridx,
                    s.name, 
                    s.address, 
                    s.base, 
                    s.floor, 
                    c.name AS category, 
                    r.menu,
                    r.star,
                    r.comment,
                    r.comment_good,
                    r.comment_bad,
                    r.tag
            FROM T_review AS r
                LEFT JOIN T_shop AS s ON s.idx = r.sidx
                LEFT JOIN T_category AS c ON c.idx = s.cidx
            WHERE r.idx = $ridx
        ");

        return $q->row();
    }
    
    function setReveiw($ridx, $menu, $star, $comment, $comment_good, $comment_bad, $tag) {
        $this->db->where('idx', $ridx);
        $this->db->update('T_review', [
            'menu'          => $menu,
            'star'          => $star,
            'comment'       => $comment,
            'comment_good'  => $comment_good,
            'comment_bad'   => $comment_bad,
            'tag'           => json_encode($tag)
        ]);
    }
}
?>