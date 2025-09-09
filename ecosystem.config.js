module.exports = {
  apps: [{
<<<<<<< HEAD
    name: 'smait-baituljannah',
    script: './app.js',
    cwd: '/var/www/html/smaitbaituljannah',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3002,
      HOST: '36.66.42.227',
      SESSION_SECRET: 'smait-baituljannah-secret-2024'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3002,
      HOST: '36.66.42.227',
      SESSION_SECRET: 'smait-baituljannah-secret-2024'
    },
    merge_logs: true,
    time: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '1G'
  }]
};
=======
    name: 'smaitbaituljannah',
    script: 'app.js',
    cwd: '/var/www/html/smaitbaituljannah',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/smaitbaituljannah-error.log',
    out_file: '/var/log/pm2/smaitbaituljannah-out.log',
    log_file: '/var/log/pm2/smaitbaituljannah-combined.log',
    time: true
  }]
};
>>>>>>> 07ac1e6 (push)
