# Quasar Studio CLI

Quasar Studio CLI is the way-yo-go tool to use Quasar Studio properly

## Installation of Quasar Studio CLI (clone git repository)

Quasar Studio CLI must be installed just once (and globally)

1. `$ git clone https://github.com/mymax9172/quasar-studio-cli.git`
2. Change your directory to the Quasar directory
3. `$ npm install`
4. `$ npm link`

From now on, call qstudio from any folder that contains a Quasar application to use the CLI

## **Table of Contest**

[**Init**](#init)

## Commands

### Init

Initialize the framework folder for a new Quasar Studio Application
`$ qstudio init`

> If the framework folder already exist a confirmation is asked before deleting everything

### Test

Run the local web server to test the Quasar Studio Application

`$ qstudio test`

> This command does not open the browser, so please CTRL+click on the URL provided to open a new page. If already open just refresh it
