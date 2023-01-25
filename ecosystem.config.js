module.exports = {
  apps : [{
    name   : "server",
    script: "node_modules/.bin/ts-node",
    interpreter: 'node',
    interpreter_args:"-r tsconfig-paths/register -r ts-node/register ./server.ts",
    watch: false,
    exec_mode: 'fork',
    ignore_watch:["proxy"],
    env: {
      "production": true
  }
  }]
}
