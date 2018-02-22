// ########################CONFIG########################

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(express.static( __dirname + '/authorsApp/dist' ));

// ########################################################


// ########################MONGOOSE########################

mongoose.connect('mongodb://localhost/authors')

var authorSchema = new mongoose.Schema({
  name: {
         type: String,
         required: true,
         minlength: 6
       },
  quotes: [{
         text: String,
         votes: Number,
       }]
}, {timestamps: true});

mongoose.model('author', authorSchema);
var Author = mongoose.model('author');
// ########################################################

// ########################Routes########################
// // Root Request

// //get all authors
app.get('/show-all', function(req, res) {
    Author.find({}, function(err, data) {
        if (err) {
          console.log('got an error');
        res.json({error: err});
        }
        else {
        console.log('showing all authors');
        res.json({message: "success", authors: data});
      }
  })
})
//
//new author
app.post('/new', function(req, res) {
  var newAuthor = new Author({
    name: req.body.name
   })
  newAuthor.save(function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log('successfully added an author');
      res.json({success: results});
      }
  })
})
delete author
app.delete('/delete/:id', function(req, res) {
  console.log("server deleting: ", req.params.id)
   Author.findByIdAndRemove(req.params.id, function(err, results) {
     if(err) {
       res.json({error: err})
     } else {
       console.log('successfully deleted');
       res.json({success:results})
     }
   })
})
// show one author
app.get('/authors/:id', function(req, res){
  console.log("id:", req.params.id)
    Author.findById(req.params.id, function(err, data){
        if (err) {
            console.log(err);
            res.json({error: err});
        } else {
            res.json(data);
        }
    });
});

//ADD QUOTE to this author - votes start at 0
app.post('/authors/:id/quotes', function(req, res) {
    var quote = {text: req.body.text, votes: 0}
    Author.update({_id: req.params.id}, { $push: { quotes: quote}}, function(err, results) {
        if (err) {
            console.log(err);
            res.json({error: err});
        } else {
            res.json({success: results});
        }
    });
});

//update author
app.put('/update/:id', function(req, res) {
    Author.findById(req.params.id, function(err, author) {
      if (err) {
        res.json({error: err})
        console.log("error updating author", err);
      } else {
        author.name = req.body.name;
        author.save(function(err, author) {
          if(err) {
            console.log('something went wrong');
            res.json({error: err})
          }  else {
          console.log('updated author', author)
          res.json({success: author})
        }
      })
    }
  })
})
//upvote quote
app.put('/authors/:id/quotes/up', function(req, res) {
    Author.findById(req.params.id, function(err, _author) {
        if (err) {
            console.log(err);
            res.json({error: err});
        } else {
            let _updatedQuotes = _author.quotes;
            _updatedQuotes[req.body.index].votes += 1;
            //res.json({success: results});
            _author.update({quotes: _updatedQuotes}, function(err, results) {
                if (err) {
                    console.log(err);
                    res.json({error: err});
                } else {
                    res.json({success: results});
                }
            });
        }
    });
});

//downvote quote

app.put('/authors/:id/quotes/down', function(req, res) {
    Author.findById(req.params.id, function(err, _author) { //get author
        if (err) {
            console.log(err);
            res.json({error: err});
        } else {
            let _updatedQuotes = _author.quotes;
            _updatedQuotes[req.body.index].votes -= 1; //get the index of the quote, score down
            //res.json({success: results});
            _author.update({quotes: _updatedQuotes}, function(err, results) {
                if (err) {
                    console.log(err);
                    res.json({error: err});
                } else {
                    res.json({success: results});
                }
            });
        }
    });
});

//delete quote
app.delete('/authors/:id/quotes/:index', function(req, res) {
    Author.findById(req.params.id, function(err, _author) {
        if (err) {
            console.log(err);
            res.json({error: err});
        } else {
            let _updatedQuotes = _author.quotes;
            _updatedQuotes.splice(req.params.index, 1);
            //res.json({success: results});
            _author.update({quotes: _updatedQuotes}, function(err, results) {
                if (err) {
                    console.log(err);
                    res.json({error: err});
                } else {
                    res.json({success: results});
                }
            });
        }
    });
  });


app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./authorsApp/dist/index.html"))
  });

//########################Start Server########################
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("Authors listening on port 8000");
})
