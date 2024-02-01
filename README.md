# README

This file contains all the steps from installation to execution of the scripts

### Cypress Documenation

- https://www.cypress.io/

### How do I get set up?

- Clone this repository
- Download VScode https://code.visualstudio.com/
- Open the repository in VScode
- Open the terminal in your vscode (_Make sure that you are inside of your repository_)
- Type "**npm i**" in your terminal, this should install all the dependencies needed including cypress, etc.
- If you want to access the cypress dashboard please refer to this documentation 

### How to open Cypress GUI

- In your terminal:
  - Type "npm run tests" if you want to run all the tests and generate allure report
  - Type "npm run test:checkout" if you want your cypress to run checkout spec test file and generate report

### How to use Cypress runner
- You can select other commands in package.json file under scripts object

### Allure Reports Integration
- Type "allure:report"" if you want to generate allure report manually