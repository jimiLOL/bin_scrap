module.exports = {
  apps : [{
    name   : "server",
    script: "node_modules/.bin/ts-node",
    args:"-r tsconfig-paths/register -r ts-node/register ./server.ts",
    watch: false,
    exec_mode: 'cluster',
    ignore_watch:["proxy"],
    env: {
      "production": true
  }
  }]
}
