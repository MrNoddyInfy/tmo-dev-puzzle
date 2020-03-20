# T-Mobile Coding Challenge

### Important! Read this First !

Do **not** submit a pull request to this repository.  You PR wil be rejected and your submission ignored.
To be safe **do not Fork** this repository, if you do you will be tempted to create a PR.

To _properly_ submit a coding challenge you must:

1. Create a blank (empty) repo in the public git service of your choice ( github, gitlab, bitbucket )
2. Clone this repo to your local workstation
3. Reset the remote origin to point to your newly created empty repo
4. Push the master branch up to your repo

5. make necessary changes
6. push changes to your origin
7. send address of your copy to t-mobile.

We will review your copy online before and during your interview.


# Stocks coding challenge

## How to run the application

There are two apps: `stocks` and `stocks-api`.

- `stocks` is the front-end. It uses Angular 7 and Material. You can run this using `yarn serve:stocks`
- `stocks-api` uses Hapi and has a very minimal implementation. You can start the API server with `yarn serve:stocks-api`

A proxy has been set up in `stocks` to proxy calls to `locahost:3333` which is the port that the Hapi server listens on.

> You need to register for a token here: https://iexcloud.io/cloud-login#/register/ Use this token in the `environment.ts` file for the `stocks` app.

> The charting library is the Google charts API: https://developers.google.com/chart/

## Problem statement

[Original problem statement](https://github.com/tmobile/developer-kata/blob/master/puzzles/web-api/stock-broker.md)

### Task 1

Please provide a short code review of the base `master` branch:

#### Task 1-A
1. What is done well?
	- Powerful monorepo framework (i.e Nrwl).
	- Wide use of rxjs opeartors, easy transformation of data.
	- Well structured state management
	- Naming conventions followed
	- Use of prettify for formatting the code. Standard followed among developers.
	- New types defined in separate files
	- Use of angular-material for rapid & structured development of UI
	
2. What would you change?
	- chart.component.html - change "data" to "chartData"
	- Used async pipe instead of subscribe method for displaying stock data
	- price-query-transformer.util.ts - Remove extra elements from 2nd argument of pick function.
	- chart.component.ts - remove unused imports and variables
    - Solving issues to run test cases,
	- Remove selectSymbol action implementation completely
	- Update action names by following ngrx standard
	- Display error message if time period not selected 
	
3. Are there any code smells or problematic implementations?
	- chart.component.html - invalid property use i.e. data
	- Google chart is not responsive
    - Failed test cases for component files
    - Reducer not added for the action PriceQueryFetchError,
    - Property selectedSymbol$ of PriceQueryFacade was never referred,
    - selectSymbol action never dispatched,
	- Error handling not done for empty data response so google chart throws error "Data column(s) for axis #0 cannot be of type string"


