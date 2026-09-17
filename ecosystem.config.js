module.exports = {
  apps : [{
    name: "cms-kneks",
    script: "./node_modules/next/dist/bin/next",
    args: "start",
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
