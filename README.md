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
