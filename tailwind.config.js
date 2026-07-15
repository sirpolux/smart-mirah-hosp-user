import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    50:'#eef4ff',
                    100:'#d9e8ff',
                    200:'#b9d3ff',
                    300:'#87b5ff',
                    400:'#4b8cff',
                    500:'#2563eb',
                    600:'#1d4ed8',
                    700:'#1e40af',
                    800:'#1e3a8a',
                    900:'#172554'
                },
            
                secondary:{
                    DEFAULT:'#0f172a'
                },
            
                accent:{
                    DEFAULT:'#f8fafc'
                }
            },
        },
    },

    plugins: [forms],
};
