<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{

  public function __construct()
    { 
        parent::__construct();
        $this->load->helper(array('form', 'url')); 
        $this->load->library('form_validation'); 
        $this->load->library('email');
        $this->email->initialize();
        $this->load->database();
        $this->load->helper(array('form', 'url'));
        $this->load->helper('captcha');
        $this->load->library('session');
        $this->load->model('home_model');
    }
  /* language change function*/
 
  public function index()
  {
  
    $data['middle'] = 'home';
    $this->load->view('template',$data);
  }

  public function contactus()
  {
    
    $vals = array(
      'word' => $this->random_string(6),
      'img_path' => APATH . 'uploads/captcha/',
      'img_url' => UPLOADS . 'captcha',
      'font_path' => APATH . 'system/fonts/texb.ttf',
      'img_width'     => '170',
      'img_height'    => 50,
      'font_size'     => 21,
      'expiration' => 1200,
      'colors'        => array(
        'background' => array(255, 255, 255),
        'border' => array(255, 255, 255),
        'text' => array(0, 0, 0),
        'grid' => array(255, 40, 40)
      )
    );
  
   
// print_r( $vals);
// die;
   if($this->input->post('save'))
   {
  //  print_r($_POST);
  //  die;
    $this->form_validation->set_rules('name', 'Name', 'trim|required');
    $this->form_validation->set_rules('email', 'Email', 'trim|required');
    $this->form_validation->set_rules('phone_no', 'Phone no', 'trim|required');
    $this->form_validation->set_rules('cap_image', 'Captcha', 'trim|required');
    $session_captcha = $this->input->post('cap_image');
  //   print_r($this->session->userdata('captcha'));
  //  die;
    if ($this->form_validation->run() == TRUE && $session_captcha == $this->session->userdata('captcha')) 
    {
    $data['name']=$this->input->post('name');
    $data['email']=$this->input->post('email');
    $data['phone_no']=$this->input->post('phone_no');
    $data['message']=$this->input->post('message');
    $response=$this->home_model->saverecords($data);
    $_SESSION['msg'] = true;
    
    }
     else {
     
           if ($session_captcha != "")
              $this->session->set_flashdata('error', 'Please enter valid Captcha.');
              
             $currentURL = current_url();
            
             redirect($currentURL);
              //  $data['captcha_img'] = $this->captcha();
            }
            
  }
  // print_r($data);
  // die;
  $cap = create_captcha($vals);
  //  print_r($cap);
  // die;
  $this->session->set_userdata(['captcha'=>$cap['word']]);
  $data['cap_image'] = $cap['image'];
  $data['middle'] = 'contacts';
  $this->load->view('template',$data);
}

  public function aboutus()
  {
    

    $data['middle'] = 'about';
    $this->load->view('template',$data);
  }
  
 
  public function adoptiontechnologies()
  {
    
    $data['middle'] = 'adoption-of-digital-technologies';
    $this->load->view('template',$data);
  }
  

  public function businessoptimization()
  {
    
    $data['middle'] = 'business-process-optimization';
    $this->load->view('template',$data);
  }
 
  public function  customerenhancement()
  {
    
    $data['middle'] = 'customer-experience-enhancement';
    $this->load->view('template',$data);
  }
  
  public function  cultureorganization()
  {
    
    $data['middle'] = 'culture-and-organizational-change';
    $this->load->view('template',$data);
  }

  public function  datadecisionmaking()
  {
    
    $data['middle'] = 'data-driven-decision-making';
    $this->load->view('template',$data);
  }
  
  public function  innovation()
  {
    
    $data['middle'] = 'innovation';
    $this->load->view('template',$data);
  }
  

  public function  strategyvision()
  {
    
    $data['middle'] = 'strategy-and-vision';
    $this->load->view('template',$data);
  }
  public function  organizationalculmana()
  {
    
    $data['middle'] = 'organizational-culture-and-change-management';
    $this->load->view('template',$data);
  }

  public function  workforcereskilling()
  {
    
    $data['middle'] = 'workforce-upskilling-and-reskilling';
    $this->load->view('template',$data);
  }

  public function captcha()
  {
    $vals = array(
      'word' => $this->random_string(6),
      'img_path' => APATH . 'uploads/captcha/',
      'img_url' => UPLOADS . 'captcha',
      'font_path' => APATH . 'system/fonts/texb.ttf',
      'img_width'     => '170',
      'img_height'    => 50,
      'font_size'     => 21,
      'expiration' => 1200,
      'colors'        => array(
        'background' => array(255, 255, 255),
        'border' => array(255, 255, 255),
        'text' => array(0, 0, 0),
        'grid' => array(255, 40, 40)
      )
    );
    $this->session->unset_userdata('captcha');
    $this->session->set_userdata('captcha', $vals['word']);
    return $cap = create_captcha($vals);
  }


  public function reload_captcha()
  {
    $vals = array(
      //'word' => rand(100, 20000),
      'word' => $this->random_string(6),
      'img_path' => APATH . 'uploads/captcha/',
      'img_url' => UPLOADS . 'captcha',
      'font_path' => APATH . 'system/fonts/texb.ttf',
      'img_width'     => '170',
      'img_height'    => 50,
      'font_size'     => 21,
      'expiration' => 1200,
      'colors'        => array(
        'background' => array(255, 255, 255),
        'border' => array(255, 255, 255),
        'text' => array(0, 0, 0),
        'grid' => array(255, 40, 40)
      )
    );
    $this->session->unset_userdata('captcha');
    //$_SESSION['captcha'] = $vals['word'];
    $this->session->set_userdata('captcha', $vals['word']);
    // echo 'amt-'.$this->session->userdata('captcha');
    //print_r($this->session->all_userdata());
    header('Content-Type: application/json');
    $res = create_captcha($vals);
    echo json_encode(['data' => ['image' => $res['image'], 'word' => base64_encode($res['word'])]]);
    //return $cap['image'];  
  }

  function random_string($length)
  {
    $key = '';
    $keys = array_merge(range(0, 9), range('a', 'z'));

    for ($i = 0; $i < $length; $i++) {
      $key .= $keys[array_rand($keys)];
    }

    return $key;
  }

}

