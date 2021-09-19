module.exports = {
  "stories": [
    "../stories/index.tsx",
    "../stories/Footer.stories.tsx",
    "../stories/Nav.stories.tsx"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
  webpackFinal: async config => {
    return config;
  },
}
