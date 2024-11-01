<?php

/** @noinspection PhpIncludeInspection */
require_once SMART_DONATIONS_DIR.'/ipn/rednao_provider_base.php';
/** @noinspection PhpIncludeInspection */
require_once SMART_DONATIONS_DIR.'/ipn/smart_donations_db_privider.php';

class SmartDonationsStripeProvider extends rednao_provider_base{

	private $email="";
	private $campaign="";
	private $id="";
	private $properties=array();
	private $amount="";
	private $date="";

	public function IsValid()
	{
		RedNaoAddMessage("Its an stripe donation");
		$this->amount=rednao_smart_donations_stripe_get_value_or_empty("Amount");
		$this->campaign=rednao_smart_donations_stripe_get_value_or_empty("Campaign");
		$token=rednao_smart_donations_stripe_get_value_or_empty("Token");
		$currency=rednao_smart_donations_stripe_get_value_or_empty("Currency");
		$itemName=rednao_smart_donations_stripe_get_value_or_empty("ItemName");

		if(!is_numeric($this->amount)||floatval($this->amount)<=0)
		{
			return false;
		}


		if(isset($token)&&isset($token["email"]))
			$this->email=$token["email"];

		require_once 'stripe/Stripe.php';
		Stripe::setApiKey(get_option("sd_stripe_private_key"));
		try {
			 $charge=Stripe_Charge::create(array(
					"amount" => $this->amount, // amount in cents, again
					"currency" => $currency,
					"card" => $token["id"],
					"description" => $itemName,
					 "currency"=>$currency
				 )
			);
			$this->amount=$this->amount/100;
			$this->id=$charge->id;
			$this->date=date('Y-m-d H:i:s',$charge->created);
			$this->GenerateProperties();
		} catch(Exception $e) {
			return false;
		}
		return true;
	}

	public function GetDonorEmail()
	{
		return $this->email;
	}

	public function DonationWasReceived()
	{
		return true;
	}

	private function GenerateProperties()
	{
		$this->properties['txn_id'] = $this->id;
		$this->properties['payer_email'] = $this->email;
		$this->properties['first_name'] = '';
		$this->properties['last_name'] = '';
		$this->properties['mc_fee'] = 0;
		$this->properties['subscr_id'] = '';
		$this->properties['mc_gross'] =  $this->amount;
		$this->properties['date'] =$this->date;
		$this->properties['additional_fields'] = '';
		$this->properties['campaign_id'] = $this->campaign;
	}

	public function GetProperties()
	{
		return $this->properties;
	}



	public function GetTransactionId()
	{
		return $this->id;
	}

	public function GetCampaignId()
	{
		return $this->campaign;
	}

	public function GetTransactionType()
	{
		return 'payment';
	}

	public function ReceiverIsValid($receiverEmail)
	{
		return true;
	}



}