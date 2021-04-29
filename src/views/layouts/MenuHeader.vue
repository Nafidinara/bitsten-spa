<template>
  <ul class="navbar-nav mr-auto">
    <li>
      <router-link to="/" class="nav-link" data-toggle="collapse">Home</router-link>
    </li>
    <li>
      <router-link to="/about" class="nav-link" data-toggle="collapse">About</router-link>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false">
      </a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="exchange-dark.html">Exchange</a>
        <a class="dropdown-item" href="exchange-dark-live-price.html">Exchange Live Price</a>
        <a class="dropdown-item" href="exchange-dark-ticker.html">Exchange Ticker</a>
        <a class="dropdown-item" href="exchange-dark-fluid.html">Exchange Fluid</a>
      </div>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false">
        Markets
      </a>
      <div class="dropdown-menu">
        <router-link to="/markets" class="dropdown-item">Markets</router-link>
        <a class="dropdown-item" href="markets-dark.html">Markets</a>
        <a class="dropdown-item" href="market-capital-dark.html">Markets Line</a>
        <a class="dropdown-item" href="market-capital-bar-dark.html">Markets Bar</a>
        <a class="dropdown-item" href="market-overview-dark.html">Market Overview</a>
        <a class="dropdown-item" href="market-screener-dark.html">Market Screener</a>
        <a class="dropdown-item" href="market-crypto-dark.html">Market Crypto</a>
      </div>
    </li>

    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false">
        Dashboard
      </a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="settings-profile-dark.html">Profile</a>
        <a class="dropdown-item" href="settings-wallet-dark.html">Wallet</a>
        <a class="dropdown-item" href="settings-dark.html">Settings</a>
      </div>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false">
        Others
      </a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="technical-analysis-dark.html">Technical Analysis</a>
        <a class="dropdown-item" href="cross-rates-dark.html">Cross Rates</a>
        <a class="dropdown-item" href="symbol-info-dark.html">Symbol Info</a>
        <a class="dropdown-item" href="heat-map-dark.html">Heat Map</a>
        <a class="dropdown-item" href="signin-dark.html">Sign in</a>
        <a class="dropdown-item" href="signup-dark.html">Sign up</a>
        <a class="dropdown-item" href="404-dark.html">404</a>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name : 'menu-header'
}
</script>
