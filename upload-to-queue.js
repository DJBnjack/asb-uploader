var azure = require('azure');

var connStr = process.argv[2] || process.env.CONNECTION_STRING;
if (!connStr) throw new Error('Must provide connection string to queue');

var messageBody = process.argv[3];
if (!messageBody) throw new Error('Must provide message to send');

var queueName = 'abs-queue';
console.log('Connecting to ' + connStr + ' queue ' + queueName);
var serviceBusService = azure.createServiceBusService(connStr);

var queueOptions = {
    MaxSizeInMegabytes: '5120',
    DefaultMessageTimeToLive: 'PT14D'
};
serviceBusService.createQueueIfNotExists(queueName, queueOptions, function(error){
    if(!error){
        var message = {
            body: messageBody,
            customProperties: {
                messagenumber: 0
            }
        };

        serviceBusService.sendQueueMessage(queueName, message, function(error) {
            if (error) {
                console.log(error);
            }
        });    
    } else {
        console.log("Error: " + error);
    }
});

