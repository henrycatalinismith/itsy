const path = require("path");

module.exports = ({ config, mode }) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      "@highvalley.systems/logotype": path.resolve(__dirname, "../../logotype"),
      "@highvalley.systems/palettes": path.resolve(__dirname, "../../palettes"),
      classnames: path.resolve(__dirname, "../node_modules/classnames"),
      react: path.resolve(__dirname, "../node_modules/react")
    }
  };

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve("babel-loader");
  config.module.rules[0].include.push(path.resolve(__dirname, "../../"));
  config.module.rules[0].include.push(
    path.resolve(__dirname, "../../logotype")
  );
  config.module.rules[0].include.push(
    path.resolve(__dirname, "../../palettes")
  );

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve("@babel/preset-react"),
    require.resolve("@babel/preset-env")
  ];

  config.module.rules.push({
    test: /\.module\.scss$/,
    loaders: [
      "style-loader",
      {
        loader: require.resolve("css-loader"),
        options: {
          importLoaders: 2,
          modules: true
        }
      },
      {
        loader: "sass-loader",
        options: {
          implementation: require("sass")
        }
      }
    ],
    include: [
      path.resolve(__dirname, "../"),
      path.resolve(__dirname, "../../"),
      path.resolve(__dirname, "../../logotype"),
      path.resolve(__dirname, "../../palettes")
    ]
  });

  config.module.rules.push({
    test: /(?<!\.module)\.scss$/,
    loaders: [
      "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          implementation: require("sass")
        }
      }
    ],
    include: [
      path.resolve(__dirname, "../"),
      path.resolve(__dirname, "../../"),
      path.resolve(__dirname, "../../logotype"),
      path.resolve(__dirname, "../../palettes")
    ]
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("ts-loader")
      }
    ]
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
