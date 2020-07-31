module.exports = {
  name: "music-player-server",
  script: "dist/index.js",
  // new feature; increase restart delay each time after every crash or non reachable db per example
  exp_backoff_restart_delay: 100
};
