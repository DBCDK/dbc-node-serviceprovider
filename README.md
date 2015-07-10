# dbc-node-serviceprovider

Abstraction layer for the dbc-node-services. Handles the communication between 
the application- and the service layer providing optional transforms for 
transforming the data received from the services before returning it to the 
client.

## Service clients
### PopSuggest
Listeners:
getPopSuggestionsRequest

Events emitted:
getPopSuggestionsResponse


## API

### Provider.registerClient(client):Client
Method for registering service clients. Clients need a name that refers to a config namespace, and an init()
that provides the configurations and should return the client methods
 
```
  import ServiceProvider from '../Provider.js';
  import Recommendations from 'dbc-node-recommendations';
  
  export default ServiceProvider.registerClient({
    name: 'recommend',
    init(config) {
      return Recommendations(config.endpoint);
    }
  });
```

### Provider.trigger(event, params):Promise
Triggers an event on the provider. If the event does not exists an error is thrown.  
A transform with the corresponding event needs to be registered first. 

the trigger method returns a promise-

```
  const recommendations = Provider.trigger('recommend', {like: ['123123123']});
  
  recommendations
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error)
    });  
```