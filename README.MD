# Automation Framework using Playwright

## Overview
This project implements an automation framework using the Playwright test framework. Playwright is a Node.js library developed by Microsoft that allows for the automation of web applications. This framework covers scenarios such as logging in, adding items to the cart, verifying prices, and completing a checkout process.

## Prerequisites
To set up and run the framework, ensure that you have the following installed:

1. **Node.js**: Version 14 or higher
2. **Playwright**: Install using npm

### Installing Node.js
If you do not have Node.js installed, you can download and install it from the [official Node.js website](https://nodejs.org/).

### Installing Playwright
Once you have Node.js installed, you can install Playwright globally using npm `npm install -g playwright`


### Project Structure

**Pages**: Pages is the folder where it contains the HomePage class methods, This is the page where written all functions and thier assertions. 

**Tests**: Tests folder will contains all tests which are written as part of this use case, current created the homepage.spec.js file where it contain the entire end to end flow

**Utils**: This is folder, which contains logging tests file and credentials.json file, Logged class used to added the logges which running the tests and added all logs on the test-log.txt file, Also credentials file where we have stored the all user credentials. 

**Reporting**: As part of this framework design, integrated the `allure-playwright` reporting system. Reports generated in the folder. 

**GenerateReports**: As part of this framework design, integrated the `allure-playwright` reporting system. Reports generated in the folder. 

***Run Commands to Generate reports***
1. Install the allure-playwright reports using this command `npm i -D allure-playwright`
2. Install CommandLine reports `npm install -D allure-commandline`
3. make sure you have to install java and need to setup home path
4. To generate allure reports, run this command `npx allure generate ./allure-results --clean` and then `npx allure generate ./allure-results `
5. To oepn allure reports run this command `npx allure open ./allure-report `

![Allure Reports for this use case](utils/allure-1.png "Report")
![Allure Reports for this use case](utils/allure-2.png "Report")
![Allure Reports for this use case](utils/allure-3.png "Report")
