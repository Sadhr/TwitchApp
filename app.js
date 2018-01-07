var imgProvisory = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQkcTKJ1dO4DlGmcNLHQVOkzBEWbQfcYQ1KRsBWKBKReSOMIdh";
var animationed = `webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend`;
$(document).ready(function() {

    // List of channels Id
    var listOfChannels = ["twitchpresents", "ESL_SC2", "OgamingSC2", "cretetion",
        "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
    ];

    // Api Id
    var id = "?client_id=79gz9oxwrrjsc459nkceq2wqehzgo1";
    // Api link
    var channelApi = "https://api.twitch.tv/kraken/channels/";
    var streamApi = "https://api.twitch.tv/kraken/streams/";

    showData();
    // Looping through the list channels Id
    listOfChannels.forEach(function(element) {

        $.getJSON(streamApi + element + id, function(data) {
            // The channels is online
            if (data.stream !== null) {

                $('section').append(divOnline(data.stream.channel, data.stream.channel.logo, data.stream.channel.status));
                // channels doesn't have a logo
                if (!data.stream.channel.logo) {

                    $('section').append(divOnline(data.stream.channel, imgProvisory));
                }
            } else {
                // The channels is offline
                $.getJSON(channelApi + element + id, function(data) {

                    if (data.logo) {

                        $('section').append(divOffline(data, data.logo));

                    } else {
                        // channels doesn't have a logo
                        $('section').append(divOffline(data, imgProvisory));

                    }
                });
            }

        });
    });

});

function showData() {
    $('.show').hide();
    $('.hide').show();
}

// Show online channels
function online() {
    $('.offline').hide();
    $('.online').show();

    $('.show').show();
    $('.hide').hide();

    // add the active class for the buttons
    $('.tow').addClass('active');
    $('.one').removeClass('active');
    $('.three').removeClass('active');

    // Change footer padding
    $('.footer').css('padding-top', '3.5em');

    // Add well if the online chekced
    $('#onlineChecked').attr("class", "well well-sm");

    // Remove All well class from all checkbox
    $('#allChecked').removeAttr("class");

    // Remove All well class from offlineChecked checkbox
    $('#offlineChecked').removeAttr("class");

    // Animation
    $('section').addClass("animated bounceInLeft").one(animationed, function() {
        $(this).removeClass("animated bounceInLeft");
    });
}

// Show offline channels
function offline() {
    $('.online').hide()
    $('.offline').show();

    $('.show').show();
    $('.hide').hide();

    // add the active class for the buttons
    $('.three').addClass('active');
    $('.one').removeClass('active');
    $('.tow').removeClass('active');

    // Change footer padding
    $('.footer').css('padding-top', '3.5em');

    // Add well if the Offline chekced
    $('#offlineChecked').attr("class", "well well-sm");

    // Remove All well class from all checkbox
    $('#allChecked').removeAttr("class");

    // Remove All well class from onlineChecked checkbox
    $('#onlineChecked').removeAttr("class");

    // Animate
    $('section').addClass("animated rollIn").one(animationed, function() {
        $(this).removeClass("animated rollIn");
    });
}

// show all channels
function allChannels() {
    $('.online').show()
    $('.offline').show();

    $('.show').show();
    $('.hide').hide();

    // add the active class for the buttons
    $('.one').addClass('active');
    $('.tow').removeClass('active');
    $('.three').removeClass('active');

    // Change footer padding
    $('.footer').css('padding-top', '3.5em');

    // Add well if the Offline chekced
    $('#allChecked').attr("class", "well well-sm");

    // Remove All well class from offlineChecked checkbox
    $('#offlineChecked').removeAttr("class");

    // Remove All well class from onlineChecked checkbox
    $('#onlineChecked').removeAttr("class");

    // Animate
    $('section').addClass("animated rotateOut").one(animationed, function() {
        $(this).removeClass("animated rotateOut");
    });

}

// Div for online channels
function divOnline(dataStreamChannel, logo, status) {
    const div = `
    
    <div class='hero img-fluid col-12 col-md-6 col-lg-4 online' title='${ dataStreamChannel.display_name }' style='background-image: url(${nullBanner(dataStreamChannel)});'>
        <div>
            <h2 style='padding: .4em;' class='online'>
                <a href= ${ dataStreamChannel.url } target='_blank'> ${ dataStreamChannel.display_name }</a>
            </h2>
            <span class='online' id='status'>${ status }</span>
        </div>

        <div class='iconPosition play'>
            <a href= ${ dataStreamChannel.url } target='_blank'>
                <i class='fa fa-play-circle-o fa-5x online' aria-hidden='true'></i>
            </a>
        </div>

        <div>
            <a href= ${ dataStreamChannel.url } target='_blank'>
                <img src=${ logo } alt='' class='rounded-circle img-fluid imgStyle online' style='box-shadow: 0px 2px 19px 1px #212121; border: 2px solid #388e3c;'>
            </a>    
        </div>
        <div>
            <p id='views' class='online'><i class='fa fa-eye'> ${ dataStreamChannel.views }</i></p>
            <p id='followers' class='online'><i class='fa fa-link'> ${ dataStreamChannel.followers }</i></p>
        </div>
    </div>

   
    
    `;
    return div;
}

// Div for offline channels
function divOffline(data, logo) {
    const div = `
    
    <div class='hero img-fluid col-12 col-md-6 col-lg-4 offline' title='${data.display_name}' style='background-image: url(${nullBanner(data)});'>
        <div>
            <h2 style='padding: .4em;' class='offline'>
                <a href= ${ data.url } target='_blank'> ${ data.display_name }</a>
            </h2>
            <span class='offline' id='status'>${ data.status }</span>
        </div>
        <div>
            <a href= ${ data.url } target='_blank'>
                <img src=${ logo } alt='' class='rounded-circle img-fluid imgStyle offline' style='box-shadow: 0px 2px 19px 1px #212121; border: 2px solid #F44336;'>
            </a>    
        </div>
        <div>
            <p id='followersOnline' class='offline'><i class='fa fa-link'> ${ data.followers }</i></p>
        </div>
    </div>
   
    `;
    return div;
}

// Video banner is null
function nullBanner(data) {
    if (data.video_banner) {
        return data.video_banner;
    } else if (data.profile_banner) {
        return data.profile_banner;
    } else {
        return imgProvisory;
    }

}