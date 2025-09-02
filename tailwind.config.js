/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#0399FD",
                secondary: "#03C5FB",
                text: "#03C5FB",
            },
        },
    },
    plugins: [],
};
