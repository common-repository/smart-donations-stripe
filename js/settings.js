rnJQuery(function()
{
    var Notifications=rnJQuery('#rnNotifications').RDNotifications();
    rnJQuery('#submit').click(function(e)
    {
        Notifications.Clear();
        rnJQuery(this).RNWait('start');
        var data={};
        data.public_key=rnJQuery('#publicKey').val();
        data.private_key=rnJQuery('#privateKey').val();

        if(rnJQuery.trim(data.public_key)==""||rnJQuery.trim(data.private_key)=="")
        {
            alert('Public and private keys cannot be empty');
            return false;
        }

        data.action="rednao_smart_donations_stripe_save_settings";
        rnJQuery("#submit").attr('disabled','disabled');
        rnJQuery.post(ajaxurl,data,function(result)
        {
            rnJQuery('#submit').RNWait('stop');
            rnJQuery("#submit").removeAttr('disabled');
            result=rnJQuery.parseJSON(result);
            if(result.success=="0")
            {
                Notifications.ShowError('An error occurred please try again latter');
            }else
                Notifications.ShowSuccess('Information saved successfully');


        });

        return false;
    });
});