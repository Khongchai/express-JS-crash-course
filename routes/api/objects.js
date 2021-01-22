const express = require('express');
const router = express.Router();
const testObjsForAPI = require("../../Objects");
const uuid = require("uuid");

//Router is for subpaths whereas app.get is for the main path.
router.get('/', (req, res) => {
    res.json(testObjForAPI);
});

//If user access this route, get all object of id = id and return
router.get('/:id', (req, res) => 
{
    //use a for loop might be more elegant and DRY
    const found = testObjsForAPI.some(object => object.id === parseInt(req.params.id));
    if (found)
    {
        res.send(testObjsForAPI.filter(object => object.id === parseInt(req.params.id)));
    }
    else
    {
        res.status(400).json({ msg: `Object of id ${req.params.id} not found`});
    }
});

//Create Member
router.post("/", (req, res) => 
{
    //Usually with databases, new ids are automatically generated,
    //This tutorial has no databases so uuid is used to generate random ids instead
    const newObject = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active",
    };

    const emailAlreadyUsed = testObjsForAPI.some(obj => obj.email === newObject.email);

    if (!newObject.name || !newObject.email)
    {
        return res.status(400).json({msg: "Please include a name and email"});
    }
    else if (emailAlreadyUsed)
    {
        return res.status(400).json({msg: "This email has already been used"});
    }
    
    testObjsForAPI.push(newObject);
    res.json(testObjsForAPI);
});

//Update Member
//This is only for this tutorial, for a real database, the code will be different; this is only for the core concept.
router.put('/:id', (req, res) => {
    const updateObject = req.body;
    let found;
    testObjsForAPI.forEach(obj => 
    {
        if (obj.id === parseInt(req.params.id))
        {
            obj.name = updateObject.name? updateObject.name: obj.name;
            obj.email = updateObject.email? updateObject.email: obj.email;
            res.json({ msg: 'Object updated', obj});
            found = true;
        }
    });
  
    if (!found)
    {
        return res.status(400).json({msg: "Update failed"});
    } 
})


//DELETE request is ez, just think

module.exports = router;