var azure = require('azure');

var connStr = process.argv[2] || process.env.CONNECTION_STRING;
if (!connStr) throw new Error('Must provide connection string');

var messageBody = process.argv[3];
if (!messageBody) throw new Error('Must provide message to send') 

var topicName = 'abs-update';
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