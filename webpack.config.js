const path = require('path');

module.exports = {
    mode: 'development', // ou 'production' para minificar o código
    entry: '/JS/cadastro.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // diretório de saída
        filename: 'bundle.js' // nome do arquivo de saída
    },
    resolve: {
        fallback: {
            "url": require.resolve("url/"),
            "stream": require.resolve("stream-browserify"),
            "http": require.resolve("stream-http"),
            "crypto": require.resolve("crypto-browserify"),
            "path": require.resolve("path-browserify")
        }
    }
};
