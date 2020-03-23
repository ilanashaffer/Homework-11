var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var port = process.env.PORT || 7000;
var notes = require("./Develop/db/db.json");

var idNumber = 5;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express static middleware
// app.use(express.static(__dirname + '/static'));
app.use(express.static('./Develop/public'));

// routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});


// api routes
//see
app.get("/api/notes", function(req, res){

    res.json(notes);
});

//save
app.post("/api/notes", function(req, res){
    
    const newNote = {

        id: idNumber,
        title: req.body.title,
        text: req.body.text

    };

    idNumber++;
    
    notes.push(newNote);

    fs.writeFile("./Develop/db/db.json", JSON.stringify(notes), function (err){
        if (err) throw err;

        console.log("New note added");
    });

    res.json(notes);


});

// delete
app.delete("/api/notes/:id", function(req, res){
    // delete note according to id

    const updatedNotes = notes.filter(note => note.id !== parseInt(req.params.id));

    fs.writeFile("./Develop/db/db.json", JSON.stringify(updatedNotes), function (err){
        if (err) throw err;

        res.json(updatedNotes);
        console.log("Note deleted");
    });

});

// server
app.listen(port, function() {
    console.log("App listening at: http://localhost:" + port);
});