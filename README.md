# Beaker-frontend

[Beaker](https://github.com/hahuang65/beaker) is a metric collection tool for Elixir based systems.  This repository contains the frontend, which is built with Ember.js and Highcharts.

Counters, gauges will update each second.  Time series data is aggregated once a minute.

## Screenshots

Standard layout in full screen

![Full layout](/screenshots/full-layout.png)


The layout adjusts for smaller screens, but no work has been do to make it look good on mobile devices.

![Responsive](/screenshots/responsive.png)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Deployment at this stage requires manually copying the generated JS and CSS files from dist into Beaker
