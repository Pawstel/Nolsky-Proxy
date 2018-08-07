module.exports= function (grunt){
    grunt.initConfig({
        concat: {
        },
        uglify: {
        },
        my_src_files: ['../countdown/public/bundle.js'],
        pkg:grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 3004,
                    base: 'public',
                    hostname: 'localhost',
                    keepalive: true,
                    open: true,
                    livereload: true,
                    middleware: function (connect, options, middlewares) {
                      middlewares.unshift(require('grunt-connect-proxy/lib/utils').proxyRequest);
                      return middlewares;
                    }
                },
            proxies: [
                {
                context: '/api/hero',
                host: '52.49.157.131',
                port: 3000,
                rewrite: {
                    '^/api/hero':'/api/hero'
                }
              }, 
              {
                context: '/api/about',
                host: 'localhost',
                port: 3001,
                rewrite: {
                    '^/api/about':'/api/about'
                }

              }, 

              {
                context: '/api/reservation',
                host: '35.163.43.209',
                port: 80,
                rewrite: {
                    '^/api/reservation':'/api/reservation'
                }

              },

            ]
        }
    }
    });
    grunt.loadNpmTasks('grunt-s3-sync');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-docker-compose');
    grunt.registerTask('server', function (target) {
   grunt.task.run([
       'configureProxies:server',
       'connect:server',
   ]);
});

    ['up','down','stop','restart','logs','build','pull','exec','config'].forEach(function (target) {
    grunt.registerTask(target, function () {
        var args = '';
        if (this.args.length > 0) {
            args += ':' + this.args.join(':')
        }
        grunt.task.run('dockerCompose:' + target + args);
    });
});

}