# Sencha Pivot grid performance test

(related forum post: https://www.sencha.com/forum/showthread.php?321957-Pivot-grid-performance)

Sencha Pivot grid (version 6.0.2) has some serious issues with performance when it comes to rendering 'higher' number of records.
By higher I mean >1k which makes it really unusable as serious analysis tool.

Here are the performance charts showing rendering speeds of Pivot grid (first picture) and regular Ext JS grid (second picture).

![Sencha Pivot grid rendering speed](http://statick.org:3002/pivot-perf.png)

![Ext JS standard grid with buffered renderer plugin](http://statick.org:3002/grid-perf.png)

# Description of this package

There is some node.js boilerplate backend (located in /private directory) which provides server on port :3012 that serves static files from /public part. There is also '/SalesData' endpoint which is function that generates arbitrary number of records that our grids consume.

# Testing
Grids (Pivot and classic one) are set to reload themselves once they've rendered data. But this time limit property on store will be multiplied with 2 (limit*2), effectively calling: 

  ```sh
  http://localhost:3012/SalesData?_dc=1472803572933&page=1&start=0&limit=50
  http://localhost:3012/SalesData?_dc=1472803572933&page=1&start=0&limit=100
  http://localhost:3012/SalesData?_dc=1472803572933&page=1&start=0&limit=200
  ... and so on
  ```

Number of repretions are defined in Grid's List constructor with `testIterations` properties.

# Installing

    $ npm install
    $ npm start
