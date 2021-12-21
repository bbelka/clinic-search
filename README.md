# **clinic-search**

This is a single-endpoint REST api that accepts a variety of query parameters, filters the results by the query parameters, and returns the array result objects under the data key in the response body object.
___
## **Usage**

There are anumber of options here. Below, find links to your favorite way to consume this content.
*  [Github repo](https://github.com/bbelka/clinic-search)
   * You may be here already (depending on where you're reading). If so, just clone, install the dependencies, and run `npm run start` in the root of the project.
   * *note: the entry point is `index.js`, not `server.js` due to testing requirements.*
*  [Docker repo](https://hub.docker.com/r/bbelka/clinic-search)
   * If you are set up to use docker, pull this container down here.
*  [Deployed link](https://bb-clinic-search.herokuapp.com/api/clinic)
   * This is also deployed on heroku if you just want to check out the functionality of the parameters.
## **Endpoint**
___
This single enpoint will return a data object containing all of the clinics in the system.

`/api/clinic/`
___

## **Query Parameters**
Add and of the following query parameters to the enpioint and filter the results as you like.
|Parameter|Explanation|
|:---|:---|
|`name`|Add this parameter to filter results by names including those letters in that order. It is not case sensitive. Spaces can be represented with the modulus (`%`) character.|
|`state`|Add this parameter to filter results by state. Use the full name of the state or the USPS abbreviation.|
|`from`|Add this parameter to filter results by opening time. It returns all clinics which will be open at that time (open before input time).|
|`to`|Add this parameter to filter results by closing time. It returns all clinics which will still be open at that time (close after input time).|

## **Testing**
* Jest was implemented as the testing suite for this project. They are contained within the test folder and, if you're interested, you can clone the repository from [Github](https://github.com/bbelka/clinic-search). The testing script command is the customary `npm run test`.
* Once each filter was verified via the testing suite, Postman was utilized to verify that the filters could be used in conjunction with on another.

## **Memory Efficiency**
While the this api utilizes a number of iterators, they are in parallel and the time complexity should be 0(n log n).