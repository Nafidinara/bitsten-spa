<template>
  <div class="markets ptb70">
    <div class="container">
      <div class="row">
<!--        <div class="col-md-4">-->
<!--          <div class="markets-container">-->
<!--            <div class="markets-content">-->
<!--              <h2>BTC Index</h2>-->
<!--              <p>7340.65</p>-->
<!--              <span class="green">+0.45%</span>-->
<!--            </div>-->
<!--            <div class="markets-chart">-->
<!--              <div id="marketsChartBtcDark"></div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="col-md-4">-->
<!--          <div class="markets-container">-->
<!--            <div class="markets-content">-->
<!--              <h2>ETH Index</h2>-->
<!--              <p>146.58</p>-->
<!--              <span class="red">-5.09%</span>-->
<!--            </div>-->
<!--            <div class="markets-chart">-->
<!--              <div id="marketsChartEthDark"></div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="col-md-4">-->
<!--          <div class="markets-container">-->
<!--            <div class="markets-content">-->
<!--              <h2>LTC Index</h2>-->
<!--              <p>44.49</p>-->
<!--              <span class="green">+2.14%</span>-->
<!--            </div>-->
<!--            <div class="markets-chart">-->
<!--              <div id="marketsChartLtcDark"></div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="col-md-12">
          <div class="markets-pair-list">
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="pill" href="#ALL" @click="filter('all')" role="tab" aria-selected="true">ALL</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="pill" href="#BTC" @click="filter('btc')" role="tab" aria-selected="true">BTC</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="pill" href="#USDT" @click="filter('usdt')" role="tab" aria-selected="true">USDT</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="pill" href="#ETH" @click="filter('eth')" role="tab" aria-selected="true">ETH</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="pill" href="#BST" @click="filter('bst')" role="tab" aria-selected="true">BST</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="pill" href="#IDRT" @click="filter('idrt')" role="tab" aria-selected="true">IDRT</a>
              </li>
            </ul>

            <div class="tab-content">
              <div class="" role="">
                <table class="table">
                  <thead>
                  <tr>
                    <th>Pairs</th>
                    <th>Coin</th>
                    <th>Last Price</th>
                    <th>Change (24H)</th>
                    <th>High (24H)</th>
                    <th>Low (24h)</th>
                    <th>Volume (24h)</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr :id="`row-${data.id}`" v-for="(data, name) in datas" :key="data.id" :class="`row-all all ${customSplit(name,'_',1)}`" data-href="exchange-dark.html">
                    <td>
                      <span  :id="`name-${data.id}`">{{replace(name,'_','/') | uppercase}}</span>
                    </td>
                    <td>
                      <img
                        :src="`https://exchange.bitsten.com/assets/static/v30/images/logo/${customSplit(name,'_',0)}.png`">
                      {{customSplit(name,'_',0) | uppercase}}
                    </td>
                    <td>
                      <span :id="`last-${data.id}`">{{ numbering(data.last) }}</span>
                    </td>
                    <td :id="`class-change-${data.id}`" :class="changeClass(data.change)">
                      <span :id="`change-${data.id}`">{{ numbering(parseFloat(data.change),2) }}</span> %
                    </td>
                    <td>
                      <span :id="`high-${data.id}`">{{ numbering(data.high)  }}</span>
                    </td>
                    <td>
                      <span :id="`low-${data.id}`">{{numbering(data.low) }}</span>
                    </td>
                    <td>
                      <span :id="`vol-${data.id}`">{{ numbering(data.basevolume,2) }}</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

<!--            <div class="text-center">-->
<!--              <a href="#" class="load-more btn">Load More <i class="icon ion-md-arrow-down"></i></a>-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@-o-keyframes success {
  0%   { background-color: #2A2E39; }
  50%  { background-color: #27C86E; }
  100% { background-color: #2A2E39; }
}
@keyframes success {
  0%   { background-color: #2A2E39; }
  50%  { background-color: #27C86E; }
  100% { background-color: #2A2E39; }
}

@-o-keyframes danger {
  0%   { background-color: #2A2E39; }
  50%  { background-color: #F8231F; }
  100% { background-color: #2A2E39; }
}
@keyframes danger {
  0%   { background-color: #2A2E39; }
  50%  { background-color: #F8231F; }
  100% { background-color: #2A2E39; }
}

.animate-success{
  background-image:none !important;
  -o-animation: success 3s ease-in-out;
  animation: success 3s ease-in-out;
}

.animate-danger{
  background-image:none !important;
  -o-animation: danger 3s ease-in-out;
  animation: danger 3s ease-in-out;
}
</style>
<script>
let i = 0;
export default {
  name : 'Market',
  data () {
    return  {
      datas : [],
    }

  },
  methods : {
    // timeout: 5000,
    getAllTickers() {
      console.log(`ini base url ${process.env.BASE_URL}`);
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      axios.get(`${process.env.BASE_URL}api/v1/public/getticker/all`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'
        }
      })
          .then((res) => {
            this.datas = res.data.result;
          })
          .catch((err) => {
            console.log(`error maanz : ${err}`);
          })
    },
    replace: (text, string, to) => {
      text = text.replace(string, to);
      return text;
    },
    customSplit: (text, spliter, position) => {
      return text.split(spliter)[position];
    },
    changeClass: (val) => {
      if (val < 0) {
        return 'red'
      } else {
        return 'green'
      }
    },
    numbering (num, fix) {
      if (!fix) {
        // console.log('fix not setting')
        fix = 8;
        if (num >= 0.001)
          fix = 5;
        if (num >= 10)
          fix = 2;
        if (num >= 1000)
          fix = 0;
      } else {
        // console.log('fix setting');
      }

      // console.log(fix);
      if (num >= 1000) {
        num = num.toFixed(2) * 1;
        return num.toLocaleString('en-US', {
          minimumFractionDigits: fix
        });
      }

      // console.log('data : '+num);
      return num.toFixed(fix);
    },
    filter: (type) => {
      // console.log(type);
      $('.all').hide();
      $('.all').removeClass('animate-danger animate-success');
      $('.' + type).show();
    },
    connect: (url) => {
      let conn = new WebSocket(url);
      if (i === 0) {
        $("body").append('<div id="info_socket" style="background-color:#212529;position:fixed;bottom:10px;right:50px;padding:10px 15px;font-size:16px;color:white;z-index:4000;"></div>');
      }
      i++;
      return conn;
    },
    open: (conn, res) => {
      conn.onopen = (evt) => {
        $("#info_socket").html("<i class='fa fa-wifi'></i> Connected");
        if (typeof (f) !== 'undefined') {
          res(evt);
        }
      }
    },
    close: (conn, res) => {
      conn.onclose = (evt) => {
        $("#info_socket").html("Connecting...");
        res(evt);
      }
    },
    message: (conn, res) => {
      conn.onmessage = (evt) => {
        res(evt);
      }
    },
    send: (conn, res) => {
      conn.send(res);
    },
    socketTick () {
      console.log('connect to websocket');
      let conn = this.connect('wss://socket.bitsten.com:2096/ticker@market');
      this.open(conn);
      this.close(conn,() => {
        setTimeout(() => {
          this.socketTick();
        }, 5000);
      });
      this.message(conn, (evt) => {
        this.updateObject(evt.data);
      });
    },
    updateObject (data)  {
      console.log({
        msg : 'update data',
        data : JSON.parse(data)
      });

      data = JSON.parse(data);

      if (!data[0]){
        return null;
      }else {
        let id = data[0];
        let change = data[6];
        let cls = '';
        let clsRow = '';
        if (change > 0){
            cls = 'green';
            clsRow = 'animate-success';
        }else {
          cls = 'red';
          clsRow = 'animate-danger';
        }
        $(`#last-${id}`).html(this.numbering(data[1] * 1));
        $(`#high-${id}`).html(this.numbering(data[2] * 1));
        $(`#low-${id}`).html(this.numbering(data[4] * 1));
        $(`#vol-${id}`).html(this.numbering(data[5] * 1,2));
        $(`#change-${id}`).html(this.numbering(data[6] * 1,2));
        $(`#class-change-${id}`).removeClass();
        $(`#class-change-${id}`).addClass(cls);
        $(`#row-${id}`).addClass(clsRow);
      }

    }
  },
  mounted() {
    this.getAllTickers()
    this.socketTick()
  }
}
</script>