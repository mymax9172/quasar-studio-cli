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

Update the Quasar Studio Application or the Quasar Studio CLI

`$ qstudio update [--cli] [--app]`

> If options are not provided, both CLI and the application are updated. Check release notes if something needs to be updated on framework folder
