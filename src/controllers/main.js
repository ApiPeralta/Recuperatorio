const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const Op = db.sequelize.Op;

const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },

  
  bookDetail: (req, res) => {
  db.Book.findByPk(req.params.id, {
    include: [{ association: 'authors' }]
  })
    .then((book) => {
      res.render('bookDetail', { book });
})},



  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },


  bookSearchResult: (req, res) => {
    db.Book.findOne({
      where: {
        title: {[Op.like]: '%req.body.title%' }
      }
    }).then((books) => {
      res.render('search', { books });
    })
  },


  deleteBook: (req, res) => {
    db.Book.destroy({where:{id: req.params.id}}).then(()=>{
      res.redirect('/home')
  })},


  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },



  authorBooks: (req, res) => {
    db.Author.findByPk(req.params.id, {
      include: [{ association: 'books' }]
    })
      .then((author) => {
        res.render('authorBooks', { author });
  })},



  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },
  edit: (req, res) => {
    db.Book.findByPk(req.params.id)
    .then(book => {res.render('editBook', { book })})
    
  },
  processEdit: (req, res) => {
    db.Book.Update({
      title: req.body.title,
      cover: req.body.cover,
      description: req.body.description
    })
    .then(()=>{
      res.render('home');
    })

  }
};

module.exports = mainController;
