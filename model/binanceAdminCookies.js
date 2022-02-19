const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shemabinanceAdminCookies = new Schema({
  _id: mongoose.Types.ObjectId,
  user: String,
  Host: {
    type: String,
    default: "www.binance.com",
  },
  UserAgent: {
    type: String,
    default:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
  },
  Accept: {
    type: String,
    default: "*/*",
  },
  AcceptLanguage: {
    type: String,
    default: "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
  },
  AcceptEncoding: {
    type: String,
    default: "gzip",
  },
  Referer: String,
  lang: String,
  xuirequesttrace: String,
  xtraceid: String,
  bncuuid: String,
  contenttype: {
    type: String,
    default: "application/json",
  },
  deviceinfo: String,
  clienttype: {
    type: String,
    default: "web",
  },
  fvideoid: {
    type: String,
    default: "32e38798a172a877bcdfb694d226f1b417de2453",
  },
  xnftcheckbottoken: {
    type: String,
    default:
      "03AGdBq26MGZe32Y5UZ55EGJoc_D9Td3U4Y8DpHpM7FiFx6nAm54s5pIXxwGmUu3hJQnS2zhcZtYP6NnbJjJXm-wIUlVcAAWGH3dvdKiGK18dknGEyJ_oIsOLixn1GhTfwvEQi5wpvnREXr0Y_z4AQI5hlN5Vvu9BpuljvEwj3mcPEaJv661XETU2EtSv9faJ4PZMH5k0nzwgxPByFPqh2_2kuBl2VvXg4jz64j5iUVszyT_ruVNwQaSLCThp2ectO58MaY5WbPj7VTXdpMqQqIi0Ksa9VkQWuQPW0pzpPuwT4CMdAwwFA1zOjxiptV4nvh8Q-qEZoVzMowv9CA_yFRpjeMRQ4Q8AHR578sPiApSyiD8XroYKsRQRCKG6ROD6Ay1uppTNaLBxhu4tX3csaBbwWLRINGwl7Grww7llAIXOX_-G-XKMNONcb9V0gt5XIJ4QvX-0eE30MYoccgyjtwrvJu63XmoW8uXsKntPI8yswKWSMQ1LEtsQoNWq5NjQLzhtuR0XWXFwKGAZJkuwau7ooVF5i8Nz5BxgG8pfkVGz9MzkHvkMtSUal1GUHd-9jU8texxH4-618UUi5F3DeGs8t8Pg9Wo-tAuE6bndYzs5Mj79ZY5ukaEA-NEAGKMN7RwWSHQ9CZ92_2uFONOx7Llfrytl1-7dgV6EV5pU4wn5zXrP7oiU0K1kah37QxrYPj6HN63PFr4xFn-woX3gE1-7hhmzsKQ8fdJvTDiGwr8bGF5cl66HtRn2gkA0Ia6mHETdW3VoWu-wTK0O-e0lQ-9xTAIjiAhJUEM1V9reek0OkTSgHtuL_gux5AG1Fi_l9O2bU0aCt4IxpytqmbMR_9ZIVJczfXwtj--LPXeVbXIUSHKPW8gG61MAOsbQKsOCNoLWRSnKZgYhISriI-3JQ_s4FhDeozIs_StsaT1ZVgtSytzsgD-020XPxSaQG2J4n-FyfJKXPCOhHnQAvYRMx0EIFaLkgfG_olPQtx0G9nnEBuZltmZO22suk5eA8fJV__yaeSx_mp8ZVgXm6HnnLvplZiTTI2tMRCPH7HryJs-nBCVTf4569t2FGjIXyRqCzLw-lLvF-7yGb2RAymPvjmOBeH2CwkpEUGGDv8bxyeqwnzRBUHeMrW_l4u2K1GSayMHIMMCZ7worGkHDbjn58qeuOfgZim1G1bOwGuGoDskjiJaTh5sF3z2Ssqsf-x8HPnNWMW9C6F94XxEqTUQtfNN3BcX5dPzgMQsMRwcSv_2eBwX3gvZMRZR5Db15iXs5A2ttL-3YmtqDBpP1O-deYz7mVHqyzx_Rr-_lEBnxRLRNDff5c5BxxNXVRQB9Q7x8NUbWYgB9OmDyXIPWc8xGJbs7CQvmvxSsAOvV8OeEG1GwRRRgUNCEUD-tekciQKmqMqbq3sDpiyj6nfX43KjJiSRDi2puxxsLr9n6kcTdgsSzkL-dqHy8c9mbf_bnY-2xPA7G-QVpXHYtcYr8saInztnBrqVJo_nZukA",
  },
  xnftcheckbotsitekey: {
    type: String,
    default: "6LeUPckbAAAAAIX0YxfqgiXvD3EOXSeuq0OpO8u_",
  },
  csrftoken: {
    type: String,
    default: "2b6f624f6f64fd642e3ed77cdc6d6ba3",
  },
  Origin: {
    type: String,
    default: "https://www.binance.com",
  },
  Connection: {
    type: String,
    default: "keep-alive",
  },
  Cookie: String,
  SecFetchDest: { type: String, default: "empty" },
  SecFetchMode: { type: String, default: "cors" },
  SecFetchSite: { type: String, default: "same-origin" },
});

const binanceAdminCookies = mongoose.model(
  "binanceAdminCookies",
  shemabinanceAdminCookies
);
module.exports = binanceAdminCookies;
