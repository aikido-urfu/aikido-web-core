

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./dist/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#1B73E8",
      },
    },
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false, // выключить ради antd
  },
};
