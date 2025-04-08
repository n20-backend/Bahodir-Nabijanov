import * as userservice from '../service/user.js';

export const getallusers = async (req, res) => {
    try {
        const users = await userservice.getallusers();
        res.json(users);
        console.log("hello");
        
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const getByIdusers = async (req, res) => {
    try {
        const id  = req.params.id;
        console.log(id);
        const users = await userservice.getByIdusers(id);
        res.send(users);
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const createusers = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        
        const users = await userservice.createusers(body);
        res.send(users);
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};



export const updateusers = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id
        const users = await userservice.updateusers(id, body);
        res.send(users);
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};



export const deleteusers = async (req, res) => {
    try {
        const id  = req.params.id;
        const users = await userservice.deleteusers(id);
        if(!users){
            return res.status(400).send('users topilmadi!');
        }
        res.status(200).send('Succes!');
    } catch (error) {
        console.log('Xatolik!');
        res.status(400).send({error: 'serverda xatolik!'});
    }
};