const path = require('path');

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Separar vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          enforce: true
        },
        // Separar Angular core
        angular: {
          test: /[\\/]node_modules[\\/]@angular[\\/]/,
          name: 'angular',
          chunks: 'all',
          priority: 20,
          enforce: true
        },
        // Separar librerías comunes
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true,
          enforce: true
        },
        // Separar estilos
        styles: {
          name: 'styles',
          test: /\.(css|scss|sass)$/,
          chunks: 'all',
          priority: 15,
          enforce: true
        }
      }
    },
    // Configuración de runtime
    runtimeChunk: {
      name: 'runtime'
    }
  },
  // Configuración de resolución
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@environments': path.resolve(__dirname, 'src/environments')
    }
  }
};
