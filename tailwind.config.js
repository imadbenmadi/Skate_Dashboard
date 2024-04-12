/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                green2: "#10b981",
                black_text: "#1f1f1f",
                gray: "#525252",
                gray_white: "#e6e6e6",
                green: "#078343",
                blue: "#004172",
            },
            fontFamily: {
                customFont: ['"Outfit"', "sans-serif"],
                // Add more custom font families as needed
            },
        },
    },
    plugins: [
        require("tailwind-scrollbar")({
            nocompatible: true,
            preferredStrategy: "pseudoelements",
        }),
    ],
};
