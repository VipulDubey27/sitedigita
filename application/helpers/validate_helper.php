<?php

    if (!defined('BASEPATH')) exit('No direct script access allowed');
  function validate($demo)
    {
         $array = array();
        foreach($demo as $key => $row)
        {    
              $string=$row;
              if($string!=''){
              if (preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $string))
              {
                   $string = str_replace( array( '\'', '"',';', '<', '>','|','=','?','*','!','#','$','&','%'), '', $string);
                   $array[$key] =$string;
                   // one or more of the 'special characters' found in $string
              }
              else{
                 $array[$key] =$string; 
              }
              }
            else {
                 $array[$key] =$string;
                }
        }
        return $array;

    }



    if ( ! function_exists('check_user_logged_in'))
     {
        function check_user_logged_in()
          {
             $CI     = &get_instance();
             $CI->load->library('session');
             $userid = $CI->session->userdata('id');
             if($userid)
             redirect('/');
          }
     }

    if ( ! function_exists('get_breadcums_banner'))
     {
        function get_breadcums_banner()
          {
             $CI     = &get_instance();
             $CI->load->library('session');
             $CI->load->model('common_model');
             $breadcums=$CI->common_model->get_banner(); 
             return $breadcums;
          }
     }


     if ( ! function_exists('check_library_access'))
     {
        function check_library_access()
          {
             $CI     = &get_instance();
             $CI->load->library('session');
             $userid = $CI->session->userdata('id');

             $library_access = $CI->db->select('access_technical_library')->limit(1)->get_where('employee_details', ['c_id' => $userid])->row()->access_technical_library;

             if( ! $library_access)
             redirect('/');
          }
     }

     if ( ! function_exists('check_library_access_right'))
     {
        function check_library_access_right()
          {
             $CI     = &get_instance();
             $CI->load->library('session');
             $userid = $CI->session->userdata('id');

             return (int) $CI->db->select('access_technical_library')->limit(1)->get_where('employee_details', ['c_id' => $userid])->row()->access_technical_library;
          }
     }

/* Get top menu 10012021 */
     if ( ! function_exists('get_menu'))
     {
        function get_menu($resional_id)
          {

             $CI     = &get_instance();
            // $CI->load->library('session');
            // $userid = $CI->session->userdata('id');
             $resonal_id= $CI->session->userdata('region_id') ?? '0';
             $CI->load->model('common_model');
             $all_menus=$CI->common_model->get_menu($resional_id); 
             return $all_menus;
          }
     }

/* Get sub menu 10012021 */
     if ( ! function_exists('get_submenu'))
     {
        function get_submenu($mID)
          {
             $CI     = &get_instance();
             $CI->load->model('common_model');
             $all_submenus=$CI->common_model->get_submenu($mID); 
             return $all_submenus;
          }
     }
/* Get sub child menu 10012021 */
     if ( ! function_exists('get_child_submenu'))
     {
        function get_child_submenu($mID)
          {
             $CI     = &get_instance();
             $CI->load->model('common_model');
             $all_submenus=$CI->common_model->get_childsubmenu($mID); 
             return $all_submenus;
          }
     }

 /*Get setting value 12012021 */
 if ( ! function_exists('get_setting'))
 {
   function get_setting(){
      $CI     = &get_instance();
      $CI->load->model('common_model');
      if($CI->session->userdata('language')=='1'){
         // $CI->db->where('id',2);
         $CI->db->where('language',1);
      }
      else{
            // $CI->db->where('id',1);
            $CI->db->where('language',2);
         }
         
         $CI->db->where('regional_center_id', $CI->session->userdata('region_id') ?? '0');
         
         $site_setting=$CI->db->get('site_setting');
      //   echo $CI->db->last_query();
      //   die;
         return $site_setting->row();
   }
}

 /*Get setting value 12012021 */
 if ( ! function_exists('get_regionss'))
 {
   function get_regionss(){
      $CI     = &get_instance();
      $CI->load->model('common_model');
      if($CI->session->userdata('language')=='1'){
         // $CI->db->where('id',2);
         $CI->db->select('regional_name,IF(LENGTH(hn_title)>0,hn_title,regional_name) as regional_name,regional_alias_name,status,thumb_image');
      }
      else{
            // $CI->db->where('id',1);
            $CI->db->select('regional_name,regional_name,regional_alias_name,status,thumb_image');
         }
         
         $CI->db->where('status','Y');
         
         $region_setting=$CI->db->get('regional_centers');
      //   echo $CI->db->last_query();
      //   die;
         return $region_setting->result();
   }
}


/*Get Internal page all value 17012021 */
if ( ! function_exists('get_page_data'))
     {
         
        function get_page_data()
          {
            
             $CI     = &get_instance();
             $get_alias_name = trim($CI->uri->segment('1'));
             $CI->load->model('home_model');
             $get_pagedata=$CI->home_model->get_page($get_alias_name); 
             return $get_pagedata;
          }
     }

/* Get sub menu 10012021 */
if ( ! function_exists('get_footermenu'))
{
   function get_footermenu()
     {
        $CI     = &get_instance();
        $CI->load->model('common_model');
        $all_footermenus=$CI->common_model->footer_important(); 
        return $all_footermenus;
     }
}
if ( ! function_exists('get_lower_footermenu'))
{
   function get_lower_footermenu()
     {
        $CI     = &get_instance();
        $CI->load->model('common_model');
        $all_footermenus=$CI->common_model->footer_lower_menu(); 
        return $all_footermenus;
     }
}
   function mailTemplete($mTemp)
	{
		$mailTemplete=$mTemp;
		return $mailTemplete;
	}

   function sendElasticEmail($to, $subject, $body_html, $from, $fromName)
	{
      
		$message = $body_html;
		$header  = "MIME-Version: 1.0\r\n";
		$header .= "From: ".$fromName." <".$from.">\r\nContent-type: text/html\r\n";
		
		if($to !="")
		mail($to,$subject,$message,$header);
   } 


     

