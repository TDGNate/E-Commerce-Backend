const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all Categories
router.get('/', async (req, res) => {

  // find all categories
    // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })

    // check if there is a category to get
    if (!categoryData) {
      res.status(404).json({ message: "Category Not Found" })
      return;
    }

    res.status(200).json(categoryData)
  } catch (err) {

    // server error 
    res.status(500).json(err)
    console.log(err)
  }
});

// get one Category
router.get('/:id', async (req, res) => {

  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryDataById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })

    // check if there is a category that matches that ID 
    if (!categoryDataById) {
      res.status(404).json({ "message": "Category Not Found" })
      return;
    }

    res.status(200).json(categoryDataById)
  } catch (err) {

    // server error 
    res.status(500).json({ "message": "Server Error" })
    console.log(err)
  }
});

// get new Category
router.post('/', async (req, res) => {

  // create a new category
  try {
    const categoryCreate = await Category.create(req.body)

    res.status(200).json(categoryCreate)
  } catch (err) {

     // server error 
    res.status(500).json({ "message": "Server Error" })
  }
});

// update Category
router.put('/:id', async (req, res) => {

  // update a category by its `id` value
  try {
    const categoryUpdateById = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    // check if there is a category to update 
    if (!categoryUpdateById[0]) {
      res.status(404).json({ message: "No category matches that ID" })
      return;
    }

    res.status(200).json({ categoryUpdateById })
  } catch (err) {

     // server error 
    res.status(500).json(err)
  }
});

// delete category
router.delete('/:id', async (req, res) => {

  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    }) 

    // check if there is a category to delete 
    if (!categoryDelete) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(categoryDelete)
  } catch (err) {

     // server error 
    res.status(500).json(err)
  }
});

module.exports = router;
