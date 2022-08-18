const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get tags 
router.get('/', async (req, res) => {

  // find all tags
  // be sure to include its associated Tag data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    })

    // check if there data for tag 
    if (!tagData) {
      res.status(404).json({ message: "Tag Not Found" })
      return;
    }

    res.status(200).json(tagData)
  } catch (err) {

    // server error 
    res.status(500).json(err)
    console.log(err)
  }
});

// get tag by id 
router.get('/:id', async (req, res) => {

  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagDataById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    })

    // check if there data for product 
    if (!tagDataById) {
      res.status(404).json({ "message": "Tag Not Found By ID" })
      return;
    }

    res.status(200).json(tagDataById)
  } catch (err) {

    // server error 
    res.status(500).json({ "message": "Server Error" })
  }
});

// add tag 
router.post('/', async (req, res) => {

  // create a new tag
  try {
    const tagCreate = await Tag.create(req.body)

    res.status(200).json(tagCreate)
  } catch (err) {

      // server error 
    res.status(500).json({ "message": "Server Error" })
  }
});

// update tag by id 
router.put('/:id', async (req, res) => {

  // update a tag's name by its `id` value
});

// delete tag by id 
router.delete('/:id', async (req, res) => {

  // delete on tag by its `id` value
});

module.exports = router;
