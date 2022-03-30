const path = require('path');

module.exports = {
    paths: function (paths, env) {
        paths.appIndexJs = path.resolve(__dirname, 'app/client.tsx');
        paths.appSrc = path.resolve(__dirname, 'app');
        return paths;
    },
}