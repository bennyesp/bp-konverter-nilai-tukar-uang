import type { Config } from 'tailwindcss';

interface ThemeData {
  colors: {
    [key: string]: string;
  };
}

const themeData: ThemeData = {
  colors:{
    c1:"#01253b",
    c2:"#001929",
    c3:"#00ffcc",
    c4:"lightblue",
    c5:"#fff",
    c6:"#aeaeae",
    c7:"#023e6a",
    c8:"#0D2635",
    c9:"#001A2A"
  }
}

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        textclr:themeData.colors.c6,
        linkclr:themeData.colors.c3,
        hasilakhir:themeData.colors.c3,
        hasilborder:themeData.colors.c6,
        button1: themeData.colors.c2,
        button1hover: themeData.colors.c6,
        
      },
      backgroundColor:{
        bodybg:themeData.colors.c1,
        card:themeData.colors.c8,
        inputs:themeData.colors.c2,
        button1:themeData.colors.c6,
        button1hover:themeData.colors.c2
      },
      borderColor:{
        first:themeData.colors.c6
      }
    },
  },
  plugins: [],
};

export default config;