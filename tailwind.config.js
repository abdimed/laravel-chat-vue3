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
                danger: '#0000',
                midnight: '#0b0b0d',
                charcoalNight: '#18171c',
                slateSteel: '#242426',
                lightSilver: '#FAFAFA',
                silverMist: '#EEEEEE',

                lightTeal: '#81E6D9',
                peach: '#FFC3A0',

                lightBlue: '#A0C4FF',
                mintGreen: '#9BE3A3',


            }
        },
    },
    plugins: [],
}

