module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-knobs/register',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true,
        },
      },
    },
  ],
};
