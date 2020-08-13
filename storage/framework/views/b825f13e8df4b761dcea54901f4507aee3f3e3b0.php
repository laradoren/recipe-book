<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
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
        <script src="<?php echo e(asset('js/app.js')); ?>"></script> 
    </body>
</html>
<?php /**PATH C:\MyGovnoCod\react-cookbook\cookBook\resources\views/app.blade.php ENDPATH**/ ?>