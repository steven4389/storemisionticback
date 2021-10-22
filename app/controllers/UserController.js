const { User, Role } = require('../models/index');
const Sequelize = require('sequelize');

module.exports = {

    async create(req, res) {
        console.log('req', req);

        try {
            var response = ''
            response = await User.findAll({
                where: { email: req.body.email },
                include: [{
                    model: Role
                }]
            });

            if (response.length === 0) {
                let userCreated = await User.create(
                    {
                        firstName: req.body.name,
                        lastName: req.body.lastname,
                        email: req.body.email
                    }
                );
                res.json(userCreated);
                return;
            }
            console.log('response user exist', response[0].dataValues);
            res.json({ user: response[0].dataValues });

        } catch (error) {
            console.log('error', error);
        }

    },

    async showUsers(req, res) {
        try {
            var response = ''
            const Op = Sequelize.Op;
            response = await User.findAll(
                {
                    include: [{
                        model: Role
                    }]
                }
            );

            let usersWithoutRole = response.filter(item => {
                console.log('item', item.dataValues.Roles);
                return item.dataValues.Roles.length == 0;
            })

            res.json(usersWithoutRole);

        } catch (error) {
            res.json(response);
        }
    }


}

    // .then(res => {
    //     console.log('userEXist', res);
    //     if (res.length === 0) {
    //         User.create(
    //             {
    //                 firstName: req.body.name,
    //                 lastName: req.body.lastname,
    //                 email: req.body.email
    //             }
    //         ).then(user => {
    //             console.log('--------------------------------', user);
    //             //response = user;
    //             res.json(user);
    //             //return res.json( user );

    //         })
    //     }
    //     res.json(user);
    // }).catch(err => {
    //     response = { error: err }
    // });

