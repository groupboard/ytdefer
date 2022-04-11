// size of youtube icon
var ytdefer_ic_w = 73;
var ytdefer_ic_h = 52;

var yt_icon = '<svg height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#eb3223"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>';

var yt_dark_icon = '<svg height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 68 48" width="100%"><path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fill-opacity="0.8"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>';

// https://developers.google.com/speed/webp/faq#how_can_i_detect_browser_support_for_webp
// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
function check_webp_feature(feature, callback) {
    var kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    var img = new Image();
    img.onload = function () {
        var result = (img.width > 0) && (img.height > 0);
        callback(feature, result);
    };
    img.onerror = function () {
        callback(feature, false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
}

var started_checking_webp = false;
var finished_checking_webp = false;
var has_webp = false;

function ytdefer_setup()
{
    var d = document;
    if (! finished_checking_webp)
    {
        if (!started_checking_webp)
        {
            started_checking_webp = true;
            check_webp_feature('lossy', function(feature, result)
            {
                finished_checking_webp = true;
                has_webp = result;
            });
        }
        setTimeout(ytdefer_setup, 10);
        return;
    }

    var els = d.getElementsByClassName('ytdefer');
    for(var i = 0; i < els.length; i++)
    {
        var e = els[i];
        var ds = e.getAttribute('data-src');
        if (!ds)
        {
            alert("data-src missing for video");
            return;
        }

        var w = e.clientWidth;
        var h = e.clientHeight;

        var dv = d.createElement('div');
        dv.id = 'ytdefer_vid'+i;
        dv.style.width = w+'px';
        dv.style.height = h+'px';
        dv.style.position = 'relative';
        dv.onresize = ytdefer_resize;
        e.appendChild(dv);

        var im = d.createElement('img');
        if (e.hasAttribute('data-alt'))
        {
            var alt = e.getAttribute('data-alt');
            im.alt = alt;
        }
        if (e.hasAttribute('data-title'))
        {
            var title = e.getAttribute('data-title');
            im.title = title;
        }

        var res = '0';
        if (w > 480)
        {
            res = 'maxresdefault';
        }

        im.id = 'ytdefer_img'+i;
        im.style.width = '100%';
        im.style.height = '100%';
        im.style.objectFit = 'cover';
        im.style.position = 'absolute';
        im.onclick = gen_ytdefer_clk(i);
        dv.appendChild(im);

        if (has_webp)
        {
            im.src = 'https://img.youtube.com/vi_webp/'+ds+'/'+res+'.webp';
        }
        else
        {
            im.src = 'https://img.youtube.com/vi/'+ds+'/'+res+'.jpg';
        }
        
        var bt = d.createElement('button');
        // https://stackoverflow.com/a/25357859/1192732
        bt.style.backgroundImage = "url(data:image/svg+xml;base64,"+window.btoa(yt_dark_icon)+")";
        bt.id = 'ytdefer_icon'+i;
        bt.setAttribute('aria-label', 'Play');
        bt.style.position = 'absolute';
        bt.style.border = '0';
        bt.style.backgroundColor = 'transparent';
        bt.style.left = (w/2-ytdefer_ic_w/2)+'px';
        bt.style.top = (h/2-ytdefer_ic_h/2)+'px';
        bt.style.width = ytdefer_ic_w+'px';
        bt.style.height = ytdefer_ic_h+'px';
        bt.style.pointerEvents = 'none';
        dv.appendChild(bt);

        im.onmouseover = gen_mouseover(bt);
        im.onmouseout = gen_mouseout(bt);
    }
    if (typeof(YT) == 'undefined')
    {
        var js = d.createElement("script");
        js.type = "text/javascript";
        js.src = "https://www.youtube.com/player_api";
        d.body.appendChild(js);
    }
    window.addEventListener('resize', ytdefer_resize);
}

function ytdefer_resize()
{
    var d = document;
    var els = d.getElementsByClassName('ytdefer');
    for(var i = 0; i < els.length; i++)
    {
        var e = els[i];
        var w = e.clientWidth;
        var h = e.clientHeight;
        var dv = d.getElementById('ytdefer_vid'+i);
        dv.style.width = w+'px';
        dv.style.height = h+'px';
        var ic = d.getElementById('ytdefer_icon'+i);
        if (null != ic)
        {
            ic.style.left = (w/2-ytdefer_ic_w/2)+'px';
            ic.style.top = (h/2-ytdefer_ic_h/2)+'px';
        }
    }
}

//https://stackoverflow.com/a/30152957/1192732
function gen_mouseout(bt)
{
    return function()
    {
        bt.style.backgroundImage = "url(data:image/svg+xml;base64,"+window.btoa(yt_dark_icon)+")";
    }
}

function gen_mouseover(bt)
{
    return function()
    {
        bt.style.backgroundImage = "url(data:image/svg+xml;base64,"+window.btoa(yt_icon)+")";
    }
}

function gen_ytdefer_clk(i)
{
    return function()
    {
        var d = document;
        var el = d.getElementById('ytdefer_vid'+i);
        var vid_id = el.parentNode.getAttribute('data-src');
        var player = new YT.Player(el.id, 
        {
            height: el.style.height,
            width: el.style.width,
            videoId: vid_id,
            events: 
            {
                'onReady': function(ev) { ev.target.playVideo() }
            }
        });
    }
}
