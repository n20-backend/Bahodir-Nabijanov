import * as studentservice from '..//service/student.js';

export const getallstudents = async (req, res) => {
    try {
        const students = await studentservice.getallstudents();
        res.json(students);
        console.log("hello");
        
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const getByIdstudents = async (req, res) => {
    try {
        const id  = req.params.id;
        console.log(id);
        const students = await studentservice.getByIdstudents(id);
        res.send(students);
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const createstudents = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        
        const students = await studentservice.createstudents(body);
        res.send(students);
    } catch (error) {
        console.log('Xatolik:', error.message);
        res.status(500).send({ error: error.message });
    }
};



export const updatestudents = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id
        const students = await studentservice.updatestudents(id, body);
        res.send(students);
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const deletestudents = async (req, res) => {
    try {
        const id  = req.params.id;
        const students = await studentservice.deletestudents(id);
        if(!students){
            return res.status(400).send('students topilmadi!');
        }
        res.status(200).send('Succes!');
    } catch (error) {
        console.log('Xatolik!');
        res.status(400).send({error: 'serverda xatolik!'});
    }
};