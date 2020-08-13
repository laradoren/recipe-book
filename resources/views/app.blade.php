<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="shortcut icon" href="./../images/logo.png" type="image/png">
        <title> Cook Book </title>        
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;1,400&display=swap" rel="stylesheet">
        <!-- Styles -->
        <style>
            @font-face {
                font-family: 'Playfair Display', serif;
            }

            body {
                max-width: 100%;
                margin: 0;
                font-family: 'Playfair Display';
            }
        </style>
    </head>
    <body>
        <div id="app"></div>
        <script src="{{ asset('js/app.js') }}"></script> 
    </body>
</html>
