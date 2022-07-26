const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
      model: Product,
      through: ProductTag
      }
    ]
  }
  )
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    }, 
    include: [
      {
        model: Product, 
        through: ProductTag
      }
    ]
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(404).json({ message: 'No tag with this id!' });
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No Tag found with this id!'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id:req.params.id
    }
  })
  .then(dbPostData => {
    if(!dbPostData) {
      res.status(404).json({message: 'No Tag with this id found!'}); 
      return; 
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err); 
    res.status(500).json(err); 
  });
});

module.exports = router;
