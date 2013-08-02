//Simple example, connects to database, serialises a JSON file, uploads it to the database, spits out a query
var http = require('http'),
    url = require('url'),
    mongoose = require('mongoose'),
    mongodb = require('mongodb'),
    fs = require('fs'),
    db,
    Schema,
    messageModel,
    createMessage,
    data,
    output;

db = mongoose.connect("mongodb://localhost/database-test/");
Schema = mongoose.Schema;

//Mongoose schemas
//See http://mongoosejs.com/docs/guide.html
var MessageSchema = new Schema({
    message : String,
    name : String,
    status : String
})

//Creating the model from the schema
mongoose.model('Message', MessageSchema);
messageModel = mongoose.model('Message');

//Read in in.json
fs.readFile("./in.json", 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    data = JSON.parse(data);

    //Parse JSON file, save to mongo
    for(var i in data.messages) {
        i = data.messages[i];
        createMessage(i.message, i.name, i.status);
    }

    //Simple Query - output read messages as JSON to out.json
    //See http://mongoosejs.com/docs/queries.html for more on mongoose queries
    messageModel.find({'status': 'Unread'})
                .select("name message status")
                .exec(function(err,data){
        output = "{\"messages\":" + JSON.stringify(data)+ "}";

        fs.writeFile("out.json", output, function(err) {
            if (err)
                console.log("Error" + err);

            console.log("Saved, exiting...");
            process.exit();

        })
    });
});


//Create a message and save it to the database
createMessage = function(message,name,status) {
    var newMessage = new messageModel();
    newMessage.message = message;
    newMessage.name = name;
    newMessage.status = status;
    newMessage.save();
}



