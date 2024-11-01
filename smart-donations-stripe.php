<?php
/**
 * Plugin Name: Smart Donations Stripe
 * Plugin URI: http://rednao.com/smart-donations/
 * Description: Place diferent form of donations on your blog...
 * Author: RedNao
 * Author URI: http://rednao.com
 * Version: 0.1
 * Text Domain: SmartDonations
 * Domain Path: /languages/
 * Network: true
 * License: GPLv3
 * License URI: http://www.gnu.org/licenses/gpl-3.0
 * Slug: smartdonationsStripe
 */

if(!defined('ABSPATH'))
	die('Forbidden');




add_action( 'wp_ajax_rednao_smart_donations_stripe_submit','rednao_smart_donations_stripe_submit');
add_action( 'wp_ajax_nopriv_rednao_smart_donations_stripe_submit','rednao_smart_donations_stripe_submit');
add_action( 'wp_ajax_rednao_smart_donations_stripe_save_settings','rednao_smart_donations_stripe_save_settings');
add_action('add_smart_donations_screens','rednao_smart_donations_stripe_create_menu');

require_once 'smart-donations-stripe-config.php';
add_filter('smart-donations-register-provider',function($providerList){
	$publicKey=get_option("sd_stripe_public_key");
	if(!$publicKey)
		$publicKey="";

	echo"<script type='text/javascript'>var smartDonationsStripePublic='$publicKey';var smartDonationsStripeRootPath='".SMART_DONATIONS_STRIPE_PLUGIN_URL."'</script>";

	wp_enqueue_script('smart-donations-stripe-api','https://checkout.stripe.com/checkout.js');
	wp_enqueue_script('smart-donations-stripe-provider',plugin_dir_url(__FILE__).'js/stripeDonationProvider.js',array('isolated-slider','smart-donations-eventmanager','smart-donations-donation-provider','smart-donations-stripe-api'));
	array_push($providerList,'smart-donations-stripe-provider');
	return $providerList;
});


add_filter('smart-donations-register-designers',function($designers){
	wp_enqueue_script('smart-donations-stripe-designer',plugin_dir_url(__FILE__).'js/SDStripeProviderDesigner.js',array('smart-donations-base-designer'));
	array_push($designers,'smart-donations-stripe-designer');
	return $designers;
});



function rednao_smart_donations_stripe_create_menu()
{
	add_submenu_page('smart_donations_menu','Stripe Settings','Stripe Settings',SMART_DONATIONS_REQUIRED_ROLE,__FILE__.'stripe', 'rednao_smart_donations_stripe_settings');
}

function rednao_smart_donations_stripe_get_value_or_empty($value)
{
	if(isset($_POST[$value]))
		return $_POST[$value];

	return '';
}


function rednao_smart_donations_stripe_submit()
{

	require_once SMART_DONATIONS_DIR.'/ipn/rednao_provider_processor.php';
	require_once SMART_DONATIONS_STRIPE_DIR.'/smart-donations-stripe-provider.php';

	$provider=new rednao_provider_processor(new SmartDonationsStripeProvider());
	if($provider->ProcessCall())
	{
		echo '{"success":"y"}';
	}else{
		echo '{"success":"n"}';
	}

	die();
}

function rednao_smart_donations_stripe_settings()
{
	include_once(SMART_DONATIONS_STRIPE_DIR.'/settings.php');
}

function rednao_smart_donations_stripe_save_settings()
{
	if(!isset($_POST["private_key"])||!isset($_POST["public_key"]))
	{
		echo '{"success":"0"}';
		die();
	}

	$privateKey=$_POST["private_key"];
	$publicKey=$_POST["public_key"];

	update_option("sd_stripe_public_key",$publicKey);
	update_option("sd_stripe_private_key",$privateKey);


	echo '{"success":"1"}';
	die();
}