const path = require('path')

const basepath = path.join(__dirname)

module.exports = {
  apps : [
    {
      name : 'Gateway',
      script : `${basepath}/Gateway/server.js`,
      watch : true
    },
    {
      name : 'service_1',
      script : `${basepath}/service1/server.js`,
      watch : true,
      exec_mode : 'cluster',
      instances : 2
    },
    {
      name : 'service_2',
      script : `${basepath}/service2/server.js`,
      watch : true,
      exec_mode : 'cluster',
      instances : 2
    }
  ],

  
};
