<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="google_api_key" content="{{ env('GOOGLE_API_KEY') }}">


    <title>Test</title>

    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">

</head>
<body>
<div id="map">
    <i class="fa fa-spin fa-spinner"></i>
</div>
<script src="{{mix('js/app.js')}}" ></script>
</body>
</html>
