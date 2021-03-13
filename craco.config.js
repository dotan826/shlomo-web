const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {  // in this object we can change css-less-antd global css !
            //    '@primary-color': '#1DA57A'
            
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};



