// size of youtube icon
var ytdefer_ic_w = 73;
var ytdefer_ic_h = 52;

// from https://commons.wikimedia.org/wiki/File:YouTube_play_buttom_icon_(2013-2017).svg
var yt_icon = '<svg version="1.1" id="YouTube_Icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1024 721" xml:space="preserve"> <path id="Triangle" fill="#FFFFFF" d="M407,493l276-143L407,206V493z"/> <path id="The_Sharpness" opacity="0.12" fill="#420000" d="M407,206l242,161.6l34-17.6L407,206z"/> <g id="Lozenge"> <g> <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="512.5" y1="719.7" x2="512.5" y2="1.2" gradientTransform="matrix(1 0 0 -1 0 721)"> <stop  offset="0" style="stop-color:#E52D27"/> <stop  offset="1" style="stop-color:#BF171D"/> </linearGradient> <path fill="url(#SVGID_1_)" d="M1013,156.3c0,0-10-70.4-40.6-101.4C933.6,14.2,890,14,870.1,11.6C727.1,1.3,512.7,1.3,512.7,1.3 h-0.4c0,0-214.4,0-357.4,10.3C135,14,91.4,14.2,52.6,54.9C22,85.9,12,156.3,12,156.3S1.8,238.9,1.8,321.6v77.5 C1.8,481.8,12,564.4,12,564.4s10,70.4,40.6,101.4c38.9,40.7,89.9,39.4,112.6,43.7c81.7,7.8,347.3,10.3,347.3,10.3 s214.6-0.3,357.6-10.7c20-2.4,63.5-2.6,102.3-43.3c30.6-31,40.6-101.4,40.6-101.4s10.2-82.7,10.2-165.3v-77.5 C1023.2,238.9,1013,156.3,1013,156.3z M407,493V206l276,144L407,493z"/> </g> </g> </svg>';

// from https://commons.wikimedia.org/wiki/File:YouTube_play_buttom_icon_(2013-2017).svg#/media/File:YouTube_play_buttom_dark_icon_(2013-2017).svg
var yt_dark_icon = '<svg version="1.1" id="YouTube_Icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1024 721" xml:space="preserve"> <path id="Triangle" fill="#FFFFFF" d="M407,493l276-143L407,206V493z"/> <path id="The_Sharpness" opacity="0.12" fill-rule="evenodd" clip-rule="evenodd" d="M407,206l242,161.6l34-17.6L407,206z"/> <g id="Lozenge"> <g> <path fill="#282928" d="M1013,156.3c0,0-10-70.4-40.6-101.4C933.6,14.2,890,14,870.1,11.6C727.1,1.3,512.7,1.3,512.7,1.3h-0.4 c0,0-214.4,0-357.4,10.3C135,14,91.4,14.2,52.6,54.9C22,85.9,12,156.3,12,156.3S1.8,238.9,1.8,321.6v77.5 C1.8,481.8,12,564.4,12,564.4s10,70.4,40.6,101.4c38.9,40.7,89.9,39.4,112.6,43.7c81.7,7.8,347.3,10.3,347.3,10.3 s214.6-0.3,357.6-10.7c20-2.4,63.5-2.6,102.3-43.3c30.6-31,40.6-101.4,40.6-101.4s10.2-82.7,10.2-165.3v-77.5 C1023.2,238.9,1013,156.3,1013,156.3z M407,493l0-287l276,144L407,493z"/> </g> </g> </svg>';

function ytdefer_setup()
{
    var d = document;
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
        var res = '0';
        if (w > 480)
        {
            res = 'maxresdefault';
        }

        im.src = 'https://img.youtube.com/vi/'+ds+'/'+res+'.jpg';
        im.id = 'ytdefer_img'+i;
        im.style.width = '100%';
        im.style.height = '100%';
        im.style.objectFit = 'cover';
        im.style.position = 'absolute';
        im.onclick = gen_ytdefer_clk(i);
        dv.appendChild(im);
        
        var bt = d.createElement('button');
        // https://stackoverflow.com/a/25357859/1192732
        bt.style.backgroundImage = "url(data:image/svg+xml;base64,"+window.btoa(yt_icon)+")";
        bt.id = 'ytdefer_icon'+i;
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
