const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 2,
      features: {
        "nesting-rules": false,
        "custom-media-queries": false,
      },
    },
  },
};

export default config;
