import * as gradeservice from '../service/grade.js';

export const getallgrades =  async (req, res) => {
    try {
        const grade = await gradeservice.getallgrades();
        res.json(grade);
        console.log('welcome');
    } catch (error) {
        console.log('xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const getByIdgrades = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const grade = await gradeservice.getByIdgrades(id);
        res.send(grade);
    } catch (error) {
        console.log('xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const creategrades = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);

        const grade = await gradeservice.creategrades(body);
        res.send(grade);
    } catch (error) {
        console.log('xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const updategrades = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const grade = await gradeservice.updategrades(id, body);
        res.send(grade);
    } catch (error) {
        console.log('xatolik!', error);
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const deletegrades = async (req, res) => {
    try {
        const id = req.params.id;
        const grade = await gradeservice.deletegrades(id);
        if(!grade) {
            return res.status(400).send('grades topilmadi!');
        }
        res.status(200).send('Success!💀');
    } catch (error) {
        console.log('Xatolik!');
        res.status(400).send({error: 'serverda xatolik!'});
    }
};