// size of youtube icon
var ytdefer_ic_w = 73;
var ytdefer_ic_h = 52;
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
        im.src = 'https://img.youtube.com/vi/'+ds+'/0.jpg';
        im.id = 'ytdefer_img'+i;
        im.style.width = '100%';
        im.style.height = '100%';
        im.style.objectFit = 'cover';
        im.style.position = 'absolute';
        im.onclick = gen_ytdefer_clk(i);
        dv.appendChild(im);

        var im2 = d.createElement('img');
        im2.src = 'yt_blk.png';
        im2.id = 'ytdefer_icon'+i;
        im2.style.position = 'absolute';
        im2.style.left = (w/2-ytdefer_ic_w/2)+'px';
        im2.style.top = (h/2-ytdefer_ic_h/2)+'px';
        im2.style.width = ytdefer_ic_w+'px';
        im2.style.height = ytdefer_ic_h+'px';
        im2.style.pointerEvents = 'none';
        dv.appendChild(im2);

        im.onmouseover = gen_mouseover(im2);
        im.onmouseout = gen_mouseout(im2);
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
function gen_mouseout(im)
{
    return function()
    {
        im.src = 'yt_blk.png';
    }
}

function gen_mouseover(im)
{
    return function()
    {
        im.src = 'yt_red.png';
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
