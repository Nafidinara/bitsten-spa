(function ($) {
    'use strict';

let wss = {
    sock_tick: function() {
        let s = sock.ws(config.WSS_SERVER + '/ticker@market');
        sock.open(s);
        sock.close(s, function() {
            setTimeout(function() {
                wss.sock_tick();
            }, sock.timeout);
        });
        sock.msg(s, function(evt) {
            // h_tick(JSON.parse(evt.data));
            console.log(JSON.parse(evt.data));
        })
    }
};

    let i = 0;
    let sock = {
        ws:function(url){
            let s = new WebSocket(url);
            if(i===0){
                $("body").append('<div id="info_socket" style="background-color:#212529;position:fixed;bottom:10px;right:50px;padding:10px 15px;font-size:16px;color:white;z-index:4000;"></div>');
            }
            i++;
            return s;
        },timeout:5000,
        open:function(s,f){
            s.onopen = function(evt){
                $("#info_socket").html("<i class='fa fa-wifi'></i> Connected");
                if(typeof(f)!=='undefined'){f(evt);
                }}
        }
        ,close:function(s,c){
            s.onclose = function(evt){
                $("#info_socket").html("Connecting...");c(evt);
            }},
        msg:function(s,msg){
            s.onmessage = function(evt){
                msg(evt);
            }},
        send:function(s,msg){
            s.send(msg);
        },};

let bridge = {
    connect:function(url,fd){
        let typ='POST';
        if(fd==='undefined'||fd===null||fd===''){
            typ='GET';
        }
        return $.ajax({
            url:url,
            data:fd,
            processData:false,
            contentType:false,
            type:typ,
            error:function(xhr,status,throwError){
                console.log(xhr.code+' : '+throwError);
            }});
    },
    callbackJSON:function(url,callback){
        return $.getJSON(url,function(data){
            callback(data);
        });
    }};

let sse = {
    initialize:function(url){
        return new EventSource(url);
    },
    msg:function(s,msg){
        s.onmessage = function(event){
            msg(event.data);
        };
    }
};

let h_tick = function(parsed_data) {
    let pricebtc;
    let c = parsed_data[6];
    let d = 8;
    if (parsed_data[1] >= 0.001)
        d = 5;
    if (parsed_data[1] >= 10)
        d = 2;
    if (parsed_data[1] >= 1000)
        d = 0;
    let clas = '';
    if (c > 0)
        clas = ' text-success ';
    if (c < 0)
        clas = ' text-danger ';
    let fafa = ' fa-arrow-left ';
    if (c > 0)
        fafa = ' fa-arrow-up ';
    if (c < 0)
        fafa = ' fa-arrow-down ';

    let market_name = $("#market_name-" + parsed_data[0]).html();
    let coin_name = $("#coin_name-" + parsed_data[0]).html();
    if (market_name === "btc_usdt")
        pricebtc = parsed_data[1] * 1;
    let priceusd = parsed_data[1];
    let volusd = parsed_data[5];
    if (parsed_data[0] === "23") {
        priceusd *= pricebtc;
        volusd *= pricebtc;
    }
    $("#price-" + parsed_data[0]).html(numberd((priceusd * 1), d));
    $("#hight-" + parsed_data[0]).html(numberd((parsed_data[2] * 1), d));
    $("#low-" + parsed_data[0]).html(numberd((parsed_data[4] * 1), d));
    $("#volume-" + parsed_data[0]).html("$ " + numberd((volusd * 1), 2));
    $("#change-" + parsed_data[0]).html(numberd((parsed_data[6] * 1), 2) + '');
    $("#change2-" + parsed_data[0]).removeClass('text-success');
    $("#change2-" + parsed_data[0]).removeClass('text-danger');
    $("#change2-" + parsed_data[0]).addClass(clas);
    $("#cn-" + parsed_data[0]).addClass('bg-success');
    removeclass("#cn-" + parsed_data[0]);
};

function numberd(num, fix) {
    if (num >= 1000) {
        num = num.toFixed(2) * 1;
        return num.toLocaleString('en-US', {
            minimumFractionDigits: fix
        });
    }
    return num.toFixed(fix);
}

let loadData = () =>{
  console.log('xceckekcek');
};

wss.sock_tick();
loadData();

})(jQuery);
