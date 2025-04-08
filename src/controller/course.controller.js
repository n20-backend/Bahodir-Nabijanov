import * as courseservice from '../service/course.js';

export const getallcourses = async (req, res) => {
    try {
        const courses = await courseservice.getallcourses();
        res.json(courses);
        console.log("hello");
        
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const getByIdcourses = async (req, res) => {
    try {
        const id  = req.params.id;
        console.log(id);
        const courses = await courseservice.getByIdcourses(id);
        res.send(courses);
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const createcourses = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        
        const courses = await courseservice.createcourses(body);
        res.send(courses);
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};



export const updatecourses = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id
        const courses = await courseservice.updatecourses(id, body);
        res.send(courses);
    } catch (error) {
        console.log('Xatolik!');
        res.status(500).send({error: 'serverda xatolik!'});
    }
};


export const deletecourses = async (req, res) => {
    try {
        const id  = req.params.id;
        const courses = await courseservice.deletecourses(id);
        if(!courses){
            return res.status(400).send('courses topilmadi!');
        }
        res.status(200).send('Succes!');
    } catch (error) {
        console.log('Xatolik!');
        res.status(400).send({error: 'serverda xatolik!'});
    }
};