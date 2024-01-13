module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./dist/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#1B73E8",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // выключить ради antd
  },
};
