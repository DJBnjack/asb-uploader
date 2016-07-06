var azure = require('azure');

var connStr = process.argv[3] || process.env.CONNECTION_STRING;
if (!connStr) throw new Error('Must provide connection string');
var topicName = 'abs-update';

var messageBody = process.argv[2];
if (!messageBody) throw new Error('Must provide message to send') 

console.log('Connecting to ' + connStr + ' topic ' + topicName);
var serviceBusService = azure.createServiceBusService(connStr);

var message = {
    body: messageBody,
    customProperties: {
        messagenumber: 0
    }
}
serviceBusService.sendTopicMessage(topicName, message, function(error) {
    if (error) {
        console.log(error);
    }
});