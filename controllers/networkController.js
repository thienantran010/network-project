const Person = require('../models/person');
const { body, validationResult } = require("express-validator");
var multer = require('multer');
//set up multer for storing uploaded files

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });

exports.index = (req, res, next) => {
    Person.countDocuments({}, (err, doc_count) => {
        res.render('index', {title: 'Network Home', error: err, count: doc_count})
    });
}

exports.get_person = (req, res, next) => {
    name_array = req.body.name.split(" ");
    fname = name_array[0];
    lname = name_array[1];

    Person.find({ first_name: fname, family_name: lname }).exec((err, persons) => {
        if (err) { return next(err) }

        res.render("create_person", {title: "Create Person", connection: persons})
    })
}

exports.create_get = (req, res, next) => {
    res.render("create_person", {title: "Create Person"})
}

exports.create_post = [
    // Validate and sanitize fields.
    body("first_name")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("First name must be specified.")
      .isAlphanumeric()
      .withMessage("First name has non-alphanumeric characters."),
    body("family_name")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Family name must be specified.")
      .isAlphanumeric()
      .withMessage("Family name has non-alphanumeric characters."),
    body("date_of_birth", "Invalid date of birth")
      .optional({ checkFalsy: true })
      .isISO8601()
      .toDate(),
    body("date_of_death", "Invalid date of death")
      .optional({ checkFalsy: true })
      .isISO8601()
      .toDate(),
    body("description")
      .escape(),
    body("blood_relations")
      .escape(),
    body("friends")
      .escape(),
    body("acquaintances")
      .escape(),
    body("invisible_threads")
      .escape(),

    upload.single('picture'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            res.render("create_person", {
              title: "Create Author",
              person: req.body,
              errors: errors.array(),
            });
            return;
          }

        const person = new Person(
            {
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                picture: req.body.picture,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
                description: req.body.description,
                image: 
                {
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                },
                blood_relations: req.body.blood_relations,
                friends: req.body.blood_relations,
                acquaintances: req.body.acquaintances,
                invisible_threads: req.body.invisible_threads
            });
        
        person.save((err) => {
            if (err) { return next(err); }
            res.redirect(person.url)
        })
    }

]

exports.delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Site Home Page');
}

exports.delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Site Home Page');
}

exports.update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Site Home Page');
}

exports.update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Site Home Page');
}

exports.person_detail = (req, res, next) => {
    Person.findById(req.params.id)
        .populate()
}

exports.person_list = (req, res) => {
    res.send('NOT IMPLEMENTED: Site Home Page');
}