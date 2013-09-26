webapp-builder
==============


## Quick start

[Install nodejs] (http://nodejs.org/)

[Download webapp-builder ZIP archive] (https://github.com/Toorop/webapp-builder/archive/master.zip)

Unzip WB (webapp-builder) in the dir you want (/wb-path/ for the rest of this quick start guide)

[Download the latest release of twitter Bootstrap](https://github.com/twbs/bootstrap/zipball/3.0.0-wip)

Unzip Bootstrap archive in /wb-path/vendors/ as /wb-path/vendors/bootstrap

Open a console and :

    cd /wb-path/
    npm install
    grunt build
    grunt server

Open you browser to [http://localhost:9001](http://localhost:9001)

Now when you will edit :

* a html file under /wb-path/ (eg /wb-path/index.html)
* app.js javascript file in /wb-path/javascripts/app.js
* app.less less file under /wb-path/stylesheets/app/less
* a less file under /wb-path/vendors/bootstrap/less/

Grunt will :

* recompile all less files to /wb-path/dist/stylesheets/app.css and /wb-path/dist/stylesheets/app.min.css
* concat js files to /wb-path/dist/javascripts/app.js and /wb-path/dist/javascripts/app.mini.js
* reload the current view in your browser

