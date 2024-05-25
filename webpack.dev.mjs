import webpack from 'webpack';
import { resolve } from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.js'; // Cambiado a webpack.common.js
import Dotenv from 'dotenv-webpack';
import config from './webpack.common.js'; // Cambiado a webpack.common.js

const { HotModuleReplacementPlugin } = webpack;

const port = 3000;
let publicUrl = `ws://localhost:${port}/ws`;

// only for Gitpod
if (process.env.GITPOD_WORKSPACE_URL) {
  const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
  publicUrl = `wss://${port}-${host}/ws`;
}

// only for Codespaces
if (process.env.CODESPACE_NAME) {
  publicUrl = `wss://${process.env.CODESPACE_NAME}-${port}.app.github.dev/ws`;
}

export default merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port,
    hot: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    static: {
      directory: resolve(import.meta.url.replace('file://', ''), 'dist'), // Modificado para usar import.meta.url
    },
    client: {
      webSocketURL: publicUrl,
    },
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new Dotenv(),
  ],
});
