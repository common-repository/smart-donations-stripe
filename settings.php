<?php
wp_enqueue_script('isolated-slider',SMART_DONATIONS_PLUGIN_URL.'js/rednao-isolated-jq.js');
wp_enqueue_script('smart-donations-stripe-settings',SMART_DONATIONS_STRIPE_PLUGIN_URL.'js/settings.js',array('isolated-slider'));
wp_enqueue_script('json2');



wp_enqueue_style('smart-donations-bootstrap-theme',SMART_DONATIONS_PLUGIN_URL.'css/bootstrap/bootstrap-theme.css');
wp_enqueue_style('smart-donations-bootstrap',SMART_DONATIONS_PLUGIN_URL.'css/bootstrap/bootstrap-scopped.css');
wp_enqueue_style('smart-donations-ladda',SMART_DONATIONS_PLUGIN_URL.'css/bootstrap/ladda-themeless.min.css');



wp_enqueue_script('smart-donations-bootstrap-theme',SMART_DONATIONS_PLUGIN_URL.'js/bootstrap/bootstrapUtils.js',array('isolated-slider'));
wp_enqueue_script('smart-donations-bootstrap-js',SMART_DONATIONS_PLUGIN_URL.'js/bootstrap/bootstrap.min.js',array('jquery'));
wp_enqueue_script('smart-donations-spin-js',SMART_DONATIONS_PLUGIN_URL.'js/bootstrap/spin.min.js');
wp_enqueue_script('smart-donations-ladda-js',SMART_DONATIONS_PLUGIN_URL.'js/bootstrap/ladda.min.js',array('smart-donations-spin-js'));


$privateKey=get_option("sd_stripe_private_key");
if(!$privateKey)
	$privateKey="";
$publicKey=get_option("sd_stripe_public_key");
if(!$publicKey)
	$publicKey="";
?>



<div id="settingsForm" class="bootstrap-wrapper" style="margin-top: 5px;">
	<div id="rnNotifications"></div>
	<button style="margin-left: 530px;width:100px;cursor: hand;cursor: pointer;" class="btn btn-success ladda-button" id="submit"  data-style="expand-left" onclick="return false;" >
		<span class="glyphicon glyphicon-floppy-disk"></span><span class="ladda-label">Save</span>
	</button>
	<div  class='form-horizontal' style='padding:30px;'>
		<div class='form-group'>
			<label class='control-label col-xs-1'>Public Key</label>
			<div class='col-xs-6'><input type="text" id="publicKey" class="regular-text form-control" value="<?php echo $publicKey ?>"/> </div>
		</div>
		<div class='form-group'>
			<label class='control-label col-xs-1'>Private Key</label>
			<div class='col-xs-6'><input type="text" id="privateKey" class="regular-text form-control" value="<?php echo $privateKey ?>"/> </div>
		</div>

	</div>

</div>

