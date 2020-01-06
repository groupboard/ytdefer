# ytdefer

Deferred (lazy) loading of YouTube videos, to improve page speed. Initially
an image of the video is displayed, and the actual video is loaded and
starts playing when the user clicks on it.

## Demo
https://www.groupboard.com/ytdefer.html

## Usage

    <script src="ytdefer.min.js"></script>

    <div style="width:380px;height:214px" class="ytdefer" data-alt="Enter optional img alt text here" data-title="Enter optional img title here" data-src="<youtube video id>"></div>

    <script>
    window.addEventListener('load', ytdefer_setup);
    </script>



