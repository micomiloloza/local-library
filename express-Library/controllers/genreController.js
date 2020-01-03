const validator = require('express-validator');
var Genre = require('../models/genre');
var Books = require('../models/book');

var async = require('async');

//Show list of all genres
exports.genre_list = function(req, res) {
    Genre.find()
    .sort([['name', 'ascending']])
    .exec(function(err, genre_list) {
        if (err) { return next(err); }

        //Success, render view
        res.render('genre_list', {title: 'Genre list', genre_list: genre_list});
    })
};

//Show details page for a specific genre
exports.genre_detail = function(req, res) {
    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id)
            .exec(callback);
        },
        genre_books: function(callback) {
            Books.find({'genre': req.params.id})
            .exec(callback);
        }
    }, function(err, result) {
        if (err) { return next(err); }
        if (result.genre==null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        //Success, render view
        res.render('genre_detail', {title: 'Genre detail', genre: result.genre, genre_books: result.genre_books})
    })
};

//Show genre create form on GET
exports.genre_create_get = function(req, res) {
    res.render('genre_form', { title: 'Create Genre' });
};

//Handle genre create on POST
exports.genre_create_post = [
   
    // Validate that the name field is not empty.
    validator.body('name', 'Genre name required').isLength({ min: 1 }).trim(),
    
    // Sanitize (escape) the name field.
    validator.sanitizeBody('name').escape(),
  
    // Process request after validation and sanitizationn.
    (req, res, next) => {
  
      // Extract the validation errors from a request.
      const errors = validator.validationResult(req);
  
      // Create a genre object with esvaped and trimmed data.
      var genre = new Genre(
        { name: req.body.name }
      );
  
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
        return;
      }
      else {
        // Data from form is valid.
        // Check if Genre with same name already exists.
        Genre.findOne({ 'name': req.body.name })
            .exec( function(err, found_genre) {
                if (err) { return next(err); }
  
                if (found_genre) {
                    // Genre exists, redirect to its detail page.
                    res.redirect(found_genre.url);
                } else {
  
                    genre.save(function (err) {
                        if (err) { return next(err); }
                        // Genre saved. Redirect to genre detail page.
                        res.redirect(genre.url);
                    });
                }
            });
        }
    }
];

//Show genre delete form on GET
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

//Handle Genre delete on POST
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

//Show genre update form on GET
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

//Handle genre update on POST
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};