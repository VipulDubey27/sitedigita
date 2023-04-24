<?php
class Home_model extends CI_Model
{
  function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }

    public function saverecords($data)
	{
    $aaa = $this->db->insert('contact_us',$data);
    // echo $this->db->last_query(); die;
    if($aaa){
      return true;
    }else {
      return false;
    }
   }
}

    ?>