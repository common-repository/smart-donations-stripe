
function SDStripeProviderDesigner(){
    SDProviderBaseDesigner.call();
    this.Name='Stripe';
    this.Id='stripe';
    this.ClassicImage=smartDonationsStripeRootPath+'img/classic.png';
    this.TextBoxImage=smartDonationsStripeRootPath+'img/textbox.png';
    this.SliderImage=smartDonationsStripeRootPath+'img/slider.png';
    this.FormImage=smartDonationsStripeRootPath+'img/form.png';
    this.Currencies=['USD','AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BIF','BMD','BND','BOB','BRL','BSD','BWP','BZD','CAD','CDF','CHF','CLP','CNY','COP','CRC','CVE','CZK','DJF','DKK','DOP','DZD','EEK','EGP','ETB','EUR','FJD','FKP','GBP','GEL','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HRK','HTG','HUF','IDR','ILS','INR','ISK','JMD','JPY','KES','KGS','KHR','KMF','KRW','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LTL','LVL','MAD','MDL','MGA','MKD','MNT','MOP','MRO','MUR','MVR','MWK','MXN','MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SEK','SGD','SHP','SLL','SOS','SRD','STD','SVC','SZL','THB','TJS','TOP','TRY','TTD','TWD','TZS','UAH','UGX','UYU','UZS','VEF','VND','VUV','WST','XAF','XCD','XOF','XPF','YER','ZAR','ZMW'];
}
SDStripeProviderDesigner.prototype=Object.create(SDProviderBaseDesigner.prototype);

SDStripeProviderDesigner.prototype.ClearProviderScreen=function()
{
    rnJQuery('#smartDonationsThreeButtons').show();
    rnJQuery('#smartDonationsClassic').show();
    rnJQuery('#divEmail').show();
    rnJQuery('.confLanguage').show();
};

SDStripeProviderDesigner.prototype.InitializeProviderScreen=function()
{
    rnJQuery('#smartDonationsThreeButtons').hide();
    rnJQuery('#smartDonationsClassic').hide();
    rnJQuery('#divEmail').hide();
    rnJQuery('.confLanguage').hide();
};

SDStripeProviderDesigner.prototype.InitializeFormConfiguration=function(){
    rnJQuery('.rednaodonationrecurrence').hide();
}



RedNaoEventManager.Subscribe('RegisterProvider',function(listOfProviders)
{
    listOfProviders.push(new SDStripeProviderDesigner());
});