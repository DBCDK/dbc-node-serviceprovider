# dbc-node-serviceprovider

[![David](https://img.shields.io/david/DBCDK/dbc-node-serviceprovider.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-serviceprovider#info=dependencies)
[![David](https://img.shields.io/david/dev/DBCDK/dbc-node-serviceprovider.svg?style=flat-square)](https://david-dm.org/DBCDK/dbc-node-serviceprovider#info=devDependencies)

Abstraction layer for the dbc-node-services. Handles the communication between 
the application- and the service layer providing optional transforms for 
transforming the data received from the services before returning it to the 
client.

## Transforms
A transform is a form of event that takes a request and calls one or more services. 
When service calls are resolved the Transform transforms the response into the desired format. 
A transform is created with [`provider.registerTransform`](Provider#registerTransform(client):Transform)  

## Clients
I Client in the service provider 

## API
### Provider
The provider needs to be initialized with a config file before usage. 

```javascript
  const Provider = require('dbc-node-serviceprovider');
  const provider = Provider(config);
```

### Provider.registerClient(client):Client
Method for registering serviceclients. Serviceclients need a name that refers to a config namespace, and an init()
that provides the configurations and should return the client methods.
 
```javascript
  import Recommendations from 'dbc-node-recommendations';
  
  provider.registerClient({
    name: 'recommend',
    init(config) {
      return Recommendations(config.endpoint);
    }
  });
```
### Provider#registerTransform(client):Transform
Method for registering transform classes. Transforms need events, requestTransform, responseTransform

```javascript
  provider.registerTransform({
    event() {
      return 'transformEvent';
    }
    requestTranform(request) {
      // make a call to one or more services, using the callClient method
      return this.callClient('moreinfo::method', request);
    }
    requestResponse(response) {
      // do something with the reponse
      return response;
    }
  });
```
#### Transform#callClient:Promise
On a transform it is possible to make calls to registered clients in the following format

```javascript
  const promise = this.callClient('client', 'method', params);
```
callClient returns a promise that should be returned from the requestTransform

### Provider#trigger(event, params):Promise
Triggers an event on the provider. If the event does not exists an error is thrown.  
A transform with the corresponding event needs to be registered first. 

the trigger method returns a Promise

```javascript
  const recommendations = Provider.trigger('recommend', {like: ['123123123']});
  
  recommendations
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error)
    });  
```

### Provider#bootstrap
activates the bundled transforms and clients
```javascript
  provider.boostrap();
```

### Provider#setupSockets
Setup socket api
```javascript
  const app = express();
  const server = require('http').Server(app);
  const socket = require('socket.io').listen(server);
  
  provider.setupSockets(socket);
```

## Events
The provider inherits the Events API which is used to register events from the registered transforms

### Events#addEvent
add an event object
```javascript
  Events.add('type', 'eventName', Function||Object);
```

### Events#getEvent
Retrieve a single event object
```javascript
  const event = Events.get('type', 'eventName');
```

### Events#getEventsOfType
Returns a map of events of a specified type

```javascript
  const map = Events.getEventsOfType('type');
  map.forEach((value, eventName) => console.log.bind(console));
  
```

## Bundled clients
* MoreInfo.client.js
* OpenSearch.client.js
* OpenSuggest.client.js
* PopSuggest.client.js
* Recommendations.client.js

## Bundled transforms
* CoverImage.transform.js
* ResultList.transform.js
* Work.transform.js
* OpenSuggest.transform.js
* popsuggest.transform.js
* Recommendations.transform.js
