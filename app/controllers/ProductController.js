const {Product} = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {

    // // CREATE
    create(req, res) {
        console.log('req', req.body);
        Product.create(
            req.body
        ).then(product => {
            res.json(product);
        })
    },


    // INDEX /api/productos
    showByKeyWord(req, res) {
        Product.findAll({
            where: {
                //name: req.params.name

                name: {
                    [Op.like]: `%${req.params.name}%`
                }

            }
        }).then(productos => {
            res.json(productos);
        });
    },


    // INDEX /api/productos
    sowAll(req, res) {
        console.log('entro');
        Product.findAll({ include: 'category' }).then(productos => {
            res.json(productos);
        })
    },


    // READ /api/posts/:id
    showById(req, res) {
        Product.findByPk(req.params.id).then(productos => {
            res.json(productos);
        })
    },

    // // UPDATE /api/posts/:id
    update(req, res) {

        Product.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        });

    },


    // DELETE /api/producto/:id
    delete(req, res) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        })
    }


}




