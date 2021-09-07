module.exports = {
  "stories": [
    "../stories/index.tsx",
    "../stories/Footer.stories.tsx",
    "../stories/Nav.stories.tsx"
    // "../stories/**/*.stories.mdx",
    // "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    // "@storybook/addon-console",
  ],
  webpackFinal: async config => {
    return config;
  },
}
