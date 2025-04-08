import * as facultyservice from '../service/faculty.js';

export const getallfaculty = async (req, res) => {
    try {
        const faculty = await facultyservice.getallfaculty();
        res.json(faculty);
        console.log("hello");
        
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};

export const getByIdfaculty = async (req, res) => {
    try {
        const id  = req.params.id;
        console.log(id);
        const faculty = await facultyservice.getByIdfaculty(id);
        res.send(faculty);
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const createfaculty = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        
        const faculty = await facultyservice.createfaculty(body);
        res.send(faculty);
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};



export const updatefaculty = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id
        const faculty = await facultyservice.updatefaculty(id, body);
        res.send(faculty);
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const deletefaculty = async (req, res) => {
    try {
        const id  = req.params.id;
        const faculty = await facultyservice.deletefaculty(id);
        if(!faculty){
            return res.status(400).send('faculty topilmadi!');
        }
        res.status(200).send('Succes!');
    } catch (error) {
        console.log('Xatolik!');
        res.status(400).send({error: 'serverda xatolik!'});
    }
};