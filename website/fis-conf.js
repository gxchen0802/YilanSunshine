var now = new Date();
fis.config.set('timestamp', [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()].join(''));

console.log('update time:' + fis.config.get('timestamp'));

fis.config.merge({

    modules: {
        parser: {
            less: ['less']
        },
        //自动将页面中独立的资源引用替换为打包资源
        postpackager: 'simple'
    },

    roadmap: {

        domain: '..',

        ext: {
            less: 'css'
        },

        path: [

            //排除非编译目录
            {
                reg: /\/(protected|themes)\//i,
                release: false
            },

            //排除非编译文件
            {
                reg: /\/(index\.php|.*\.xml|favicon\.ico|conf-[^\.]*\.js)/i,
                release: false
            },
            //只编译dev目录
            {
                reg: /\/public\/(?!dev\/)/i,
                release: false
            },

            {
                reg: /\/public\/dev\/html\/(.*)/i,
                release: '/html/$1'
            },

            {
                reg: /\/public\/dev\/css\/(.*)/i,
                release: '/css/$1'
            },

            {
                reg: /\/public\/dev\/images\/(.*)/i,
                release: '/images/$1',
            },

            {
                reg: /\/public\/dev\/js\/(.*)/i,
                release: '/js/$1'
            },

            {
                reg: /\/public\/dev\/fonts\/(.*)/i,
                release: '/fonts/$1'
            },

            {
                reg: /\/css\/([^\/]+\.png)/i,
                release: '/images/$1',
                query: '?t=${timestamp}'
            }
        ]
    },

    pack: {
        'css/index.min.css': [
            '/public/dev/css/index.less'
        ],
        'js/index.min.js': [
            '/public/dev/js/jquery.min.js',
            '/public/dev/js/index.js'
        ]
    },

    deploy: {
        test: {
            to: './public/test',
            exclude: /.*\.less|\/_sprite\/|zepto\.*|main\.js|jquery\.nivo\.slider\.js|nivo-slider\.css|mixins\.css|style.*\.css|dialog\.css|validation.*|jquery\.validationEngine.*|bootstrap-datetimepicker.*|ajaxsave\.js|jquery\.dialog\.js|cms-bs.*|jquery\.methodizetable.*|json2.*|highcharts\.js/i
        },
        build: {
            to: './public/build',
            exclude: /.*\.less|(index|public|mixins|validation)\.(css|js)|jquery.*/i
        }
    }
});