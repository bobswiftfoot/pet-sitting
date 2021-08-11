const router = require('express').Router();
const { File } = require('../../models');
var stream = require('stream');

router.get('/:id', (req, res) =>
{
    File.findOne({
        where: 
        {
            id: req.params.id
        }
    })
    .then(file =>
    {
        var fileContents = Buffer.from(file.dataValues.data, "base64");
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);

        res.set('Content-disposition', 'attachment; filename=' + file.dataValues.name);
        res.set('Content-Type', file.dataValues.type);

        readStream.pipe(res);
    });
});
   
module.exports = router;