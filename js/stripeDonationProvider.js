

//<editor-fold desc="PayPal">
function smartDonationsStripeProvider(){
    smartDonationsBaseDonationProvider.call(this);
    this.SetAmount(0);
    this.Dialog=null;
    this.Id='stripe';
    this.Campaign='';
    this.Currenty='';

    var self=this;
    this.Handler=StripeCheckout.configure({
        key: smartDonationsStripePublic,
        token: function(token) {
            self.OpenWaitScreen();
            var data={
                action:"rednao_smart_donations_stripe_submit",
                Amount:self.Amount,
                Campaign:self.Campaign,
                Token:token,
                Currency:self.Currency,
                ItemName:self.ItemName
            };
            rnJQuery.post(ajaxurl,data,function(data){

                if(data.success=='y')
                    self.ShowSuccessMessage();
                else
                    self.ShowErrorMessage();

            },"json");

        }
    });

  /*  this.Handler.open({
        name: 'Demo Site',
        description: '2 widgets ($20.00)'
    });*/
};



smartDonationsStripeProvider.prototype=Object.create(smartDonationsBaseDonationProvider.prototype);


smartDonationsStripeProvider.prototype.ShowSuccessMessage=function()
{
    if(this.Dialog==null)
        return;

    var table=this.Dialog.find('table');
    table.empty();
    var self=this;
    table.append('<tr><td><img src="'+smartDonationsStripeRootPath+'img/success.png"/> </td></tr><tr><td> <span>Donation processed successfully, thanks!</span></td></tr><tr><td><button>Close</button></td></tr>')
    table.find('button').click(function(){
        if(self.Dialog!=null)
            self.Dialog.remove();
    });

    if(this.ReturnUrl!='')
        window.location.replace(this.ReturnUrl);
};

smartDonationsStripeProvider.prototype.ShowErrorMessage=function()
{
    if(this.Dialog==null)
        return;

    var table=this.Dialog.find('table');
    table.empty();
    var self=this;
    table.append('<tr><td><img src="'+smartDonationsStripeRootPath+'img/fail.png"/> </td></tr><tr><td> <span>An error occurred, please try again later.</span></td></tr><tr><td><button>Close</button></td></tr>')
    table.find('button').click(function(){
        if(self.Dialog!=null)
            self.Dialog.remove();
    });
}

smartDonationsStripeProvider.prototype.GetStartOfDonationForm=function(generator,defaultQuantity)
{
    var payPalUrl='';
    if(smartDonationsSandbox=='y')
        payPalUrl='https://www.sandbox.paypal.com/cgi-bin/webscr';
    else
        payPalUrl='https://www.paypal.com/cgi-bin/webscr';

    this.ItemName=generator.donation_description;
    this.Campaign=generator.campaign_id;
    this.Currency=generator.donation_currency;
    this.ReturnUrl=generator.returningUrl;
    if(typeof generator.donation_description!='undefined')
        this.ItemName=generator.donation_description;

    var donationText= '<div class="smartDonationsDonationGeneratedItem"  >\
                <form action="'+payPalUrl+'" method="post" class="donationForm" target="_blank">      \
                <input type="hidden" name="cmd" class="smartDonationsPaypalCommand" value="_donations">\
                <input type="hidden" name="business" value="'+generator.business+'">\
                <input type="hidden" name="lc" value="'+generator.selectedCountry+'">                       \
                <input type="hidden" name="no_note" value="0">                    \
                <input type="hidden" name="currency_code" value="'+generator.donation_currency+'">             \
                <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest">\
                <input type="hidden" name="custom" value="'+generator.campaign_id+'">';

    if(typeof smartDonationsRootPath != 'undefined')
        donationText+='<input type="hidden" name="notify_url" value="'+smartDonationsRootPath+'ipn/rednao_paypal_ipn.php">';

    if(generator.returningUrl)
        donationText+='<input type="hidden" name="return" value="'+generator.returningUrl+'">';

    var quantity=-1;

    try{
        quantity=parseFloat(defaultQuantity);
    }catch(exception)
    {

    }

    if(!isNaN(quantity))
        donationText+='<input type="hidden" name="amount" class="amountToDonate" value="'+defaultQuantity+'">';

    return donationText;


};

smartDonationsStripeProvider.prototype.GetButton=function(imageToUse)
{
    if(imageToUse=='')
        imageToUse=smartDonationsStripeRootPath+'img/donate_button.png';
    return '<input type="image" class="smartDonationsDonationButton smartDonationsEditableItem" src="'+imageToUse+'" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0"  width="1" height="1">';
};

smartDonationsStripeProvider.prototype.GetEndOfDonationForm=function()
{
    return '</form>\
             </div>';
};

smartDonationsStripeProvider.prototype.SetAmount=function(amount)
{
    this.Amount=amount*100;
};

smartDonationsStripeProvider.prototype.Submit=function()
{

   var self=this;
    this.Handler.open({
        name: self.ItemName,
        amount:self.Amount,
        currency:this.Currency
    });


};

smartDonationsStripeProvider.prototype.FormSubmissionCompleted=function(data,generator,amount)
{
    if(data.status=="success")
    {
        this.Campaign=encodeURI('campaign_id='+this.Campaign+"&formId="+data.randomString);
        this.SetAmount(amount);
        this.Submit();
    }
};

smartDonationsStripeProvider.prototype.OpenWaitScreen=function()
{
    var smartDonationsPopUpForm='<div style=""><table style="height:200px;width: 100%;text-align: center;"><tr><td><img src="'+smartDonationsRootPath+'images/wait.gif"/>  <span>Please Wait, Generating Donation</span></td></tr></table></div>';
    var dialog=rnJQuery(smartDonationsPopUpForm);

    this.Dialog=dialog.dialog({
        modal:true,
        draggable:false,
        dialogClass: 'smartFormsNoTitle',
        title:'Select a Donation or Progress ',
        resizable:false,
        create: function(event, ui){
            rnJQuery('.ui-dialog').wrap('<div class="smartDonationsSlider" />');
        },
        open: function(event, ui){
            rnJQuery('.ui-widget-overlay').wrap('<div class="smartDonationsSlider" />');
            rnJQuery(".smartDonationsConfigurationFields").val('');
        }
    });
};

//</editor-fold>


RedNaoEventManager.Subscribe('GetProvider',function(arg)
{
    if(arg.donation_provider=='stripe')
        arg.provider=new smartDonationsStripeProvider();
});
//</editor-fold>




