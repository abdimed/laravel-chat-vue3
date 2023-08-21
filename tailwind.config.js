/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            colors: {
                iblack: '#101010',
                darkgray: '#848e98',
                lightgray: '#e7e6e9',

            }
        },
    },
    plugins: [],
}

