/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                purple: {
                    500: '#A58AA5',
                    100: '#cbc4e3',
                    heavy: '#dd88cf',
                    border: '#bebcc4',
                    bg: '#f2edff',
                    bell: '#B378FE',
                    button_bg: '#6a4284',
                },
            },
        },
        backgroundImage: (theme) => ({
            'login-bg': "url('../public/images/login/BG.png')",
            'login-avatar': "url('../public/images/login/avatar.png')",
            'menu-line-bg': "url('../public/images/menu_line_bg.png')",
        }),
    },
    plugins: [],
}
