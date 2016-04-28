// compile all used node_modules dependencies into seperate file to allow fast refreshing previewed PDF when gulp watch is on
import jquery from "jquery/jquery";
import Mustache from "mustache/mustache.min";
import hljs from 'highlight.js/lib/index';
window.Mustache = Mustache;
window.hljs = hljs;