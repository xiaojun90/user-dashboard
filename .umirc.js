
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true
      },
      dynamicImport: false,
      title: 'user-dashboard',
      dll: false,
      hardSource: false,
      port:8001,
      routes: {
        exclude: [
          /components/,
        ],
      },
    }],
  ],
  "proxy": {
    "/api": {
      "target": "http://rap2api.taobao.org/app/mock/123912/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
}
