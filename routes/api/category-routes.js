const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
    // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Category }, { model: Product }]
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryDataById = await Category.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Product }]
    })

    if (!categoryDataById) {
      res.status(404).json({ "message": "Category Not Found" })
      return;
    }

    res.status(200).json(categoryDataById)
  } catch (err) {
    res.status(500).json({ "message": "Server Error" })
    console.log(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryCreate = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(categoryCreate)
  } catch (err) {
    res.status(500).json({ "message": "Server Error" })
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdateById = await Category.update(req.body.category_name, {
      where: {
        id: req.params.id,
      }
    })

    if (!categoryUpdateById[0]) {
      res.status(404).json({ message: "No category matches that ID" })
      return;
    }

    res.status(200).json(categoryUpdateById)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    }) 

    if (!categoryDelete) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json({ message: "Successfully Deleted" }, categoryDelete)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
