let top = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>To do List</title>
    <style>
        header {
            background-color: #35baf6;
            margin: 1em auto;
            height: 4em;
        }

        #logout {
            float: right;
            margin: 1.5em;
            margin-left: 0em;
        }

        h1 {
            float: left;
            display: inline;
            margin: 0.2em 0.5em;
            margin-right: 0em;
            color: white;
            padding: 5px;
        }

        body {
            width: 50%;
            margin: 0 auto;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }

        form {
            border: 1px solid teal;
            padding: 10px;
        }

        label {
            background-color: teal;
            color: white;
            padding: 3px;
        }

        #section-tabs {
            display: flex;
            justify-content: space-around;

        }

        img {
            border-radius: 50%;
            margin-right: 1em;
            width: 140px;
            height: 140px;
        }

        #my-list {
            display: flex;
            justify-content: center;
        }
    </style>
</head>

<body>
    <header>
        <h1> To do Items </h1> <a id="logout" href='/'>Logout</a>
    </header>

    <div id="section-tabs">
        <a id="all-items" href="/list/all">All Items</a>
        <a id="my-items" href="/list/mine">My Items</a>
    </div>

    <form action='/list/all' method="POST">
        <input type='text' name='item'>
        <input type="submit" value="submit" />
    </form>
    <br>
`;

module.exports = top;