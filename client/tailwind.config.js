/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gelionReg: "Gelion_Reg",
        gelionBold: "Gelion_Bold",
      },
      colors: {
        bgColor: "rgb(var(--bgColor))",
        mainColor: "rgb(var(--mainColor))",
        mainColorDark: "rgb(var(--mainColorDark))",
        error: "rgb(var(--error))",
        errorDark: "rgb(var(--errorDark))",
        success: "rgb(var(--success))",
        successDark: "rgb(var(--successDark))",
        textColor: "rgb(var(--textColor))",
        inputPlaceHolder: "rgb(var(--inputPlaceHolder))",
        dark: "rgb(var(--dark))",
      },
    },
  },
  plugins: [],
};
