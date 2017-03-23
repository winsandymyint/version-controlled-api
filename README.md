##### This is a answering a test for Full Stack Developer Position in Vault Dragon.

I set up the api at Linode server. OS is Ubuntu 14.04. 

Api is created by using node, express and mongodb. 

base url is: [http://172.104.63.198](http://172.104.63.198)

```javascript

Method: POST

Endpoint: /object

Body: JSON: {mykey : value1}

Time: 6pm
```
```javascript
#for getting all of the records
Method: GET

Endpoint: /object

Response: value1
```
```javascript

Method: GET

Endpoint: /object/mykey

Response: value1
```
```javascript

Method: POST

Endpoint: /object

Body: JSON: {mykey : value2}

Time: 6.05 pm
```
```javascript

Method: GET

Endpoint: /object/mykey

Response: value2
```
```javascript
Method: GET

Endpoint: /object/mykey?timestamp=1440568980 [6.03pm]

Response: value1
```

NOTE: 
```npm install --production```  #for production

Run with ```node or nodemon```

Development: ```node app --development```

Production: ```node app --production```

Test: ```npm test```