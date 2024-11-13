# Quasar Studio CLI

Quasar Studio CLI is the way-yo-go tool to use Quasar Studio properly

## Installation of Quasar Studio CLI (clone git repository)

Quasar Studio CLI must be installed just once (and globally)

`$ npm install qstudio-cli -g`

From now on, call qstudio from any folder that contains a Quasar application to use the CLI

## **Table of Contest**

[**Install**](#install) - Install all missing libraries on the Quasar Studio Application
[**Init**](#init) - Initialize the framework folder
[**Test**](#test) - Run web server
[**Update**](#update) - Update the Quasar Studio Application
[**Version**](#version) - Manage versioning of the Quasar Studio Application

## Commands

### Install

Install all missing libraries on the Quasar Studio Application, this should be called once created a new Quasar Studio Application

`$ qstudio install`

### Init

Initialize the framework folder for a new Quasar Studio Application

`$ qstudio init`

> If the framework folder already exist a confirmation is asked before deleting everything

### Test

Run the local web server to test the Quasar Studio Application

`$ qstudio test`

> This command does not open the browser, so please CTRL+click on the URL provided to open a new page. If already open just refresh it

### Update

Update the Quasar Studio Application and the framework folder

`$ qstudio update`

> Once updated the web application and (optionally) the framework folder check if any suggestion is provided to adjust your own configuration

### Version

Manage versioning of the Quasar Studio Application

`$ qstudio version [-i] [-I]`

To see the current version, use `$ qstudio version`

Versioning types are three:

- **manual**, version and build number are manually managed by the developer
- **auto**, version and build number are automatically managed by Quasar Studio CLI once built a new release
- **date**, like above, but version is managed as YEAR/MONTH of the release

#### Manual versioning

Developer can change it into the application.js file:

```js
export const application = {
  ...
  versioning: {
    type: "manual",
    version: {
      number: "0.3",
      build: "35",
    },
  },
 ...
};
```

Without option, the current version is reported.

By using the CLI the version can be updated using the following (only if type is 'manual')
`$ qstudio version [-i]`, this increments by 1 the minor version and update the build number bases on current date
`$ qstudio version [-I]`, this increments by 1 the major version (setting to 0 the minor version) and update the build number bases on current date

#### Auto versioning

In this case (type = 'auto'), anytime a new build is created the current version is updated, by incrementing by 1 the minor version (see [build](#build) command)

#### Date versioning

In this case, anytime a new build is created the current version is updated, using the last 2 digits of the year and two digits for the month (for example: version 2503 created Mar 2025). Build number is automatcially created based on the actual date of the build

### Build

Build a new application, ready to be released

`$ qstudio build [-m] [-d <date>]`

if versioning type is _auto_ the minor release is updated. Using the option -m the major release is incremented instead.
if versioning type is _date_ the version number is updated with the current date. Using the option -d the version is created using the give date
