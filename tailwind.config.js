/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    // darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#e0fbd8',
                secondary: '#d4e2f7',
                success: '#848e98',
                warning: '#e7e6e9',
                danger : '#0000'

            }
        },
    },
    plugins: [],
}

