import client from "..//config/db.js";

export const getallcourses = async () => {
    try {
        const result = await client.query('select * from courses');
        return result.rows;        
    } catch (error) {
        console.error('Select qilishda xatolik!');
    }
};


export const getByIdcourses = async (id) => {
    try {
        const result = await client.query('select * from courses where id = $1', [id]);
        return result.rows;        
    } catch (error) {
        console.error('Select qilishda xatolik!');
    }
};


export const createcourses = async (body) => {
    try {
        const newUser = {...body} 
        if(!newUser.title || !newUser.description || !newUser.credits || !newUser.status) {
            throw new error('maydonlar toliq emas!');
        }     

        const result = await client.query(`
            INSERT INTO Courses(title, description, credits, status)
            VALUES($1, $2, $3, $4) RETURNING *`, [newUser.title, newUser.description, newUser.credits, newUser.status]);

        return result.rows;    
    } catch (error) {
        console.error('xatolik!');
    }
};


export const updatecourses = async (id, body) => {
    try {
        const oldCoursesQuery = 'SELECT * FROM courses WHERE id = $1';
        const oldCoursesResult = await client.query(oldCoursesQuery, [id]);
        const oldCourses = oldCoursesResult.rows[0];

        if (!oldCourses) {
            throw new Error("Courses topilmadi");
        }

        const updatedCourses = {
            title: body.title || oldCourses.title, 
            description: body.description || oldCourses.description,
            credits: body.credits || oldCourses.credits,
            status: body.status || oldCourses.status,
            updatedat: new Date().toISOString()
        };

    

        const query = `
            UPDATE Courses SET 
                title = $1, 
                description = $2,
                credits = $3,
                status = $4,
                updatedat = $5
            WHERE id = $6 
            RETURNING *`;

        const values = [
            updatedCourses.title, 
            updatedCourses.description,
            updatedCourses.credits,
            updatedCourses.status, 
            updatedCourses.updatedat, 
            id
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating Courses:", error);
        throw error;
    }
};



export const deletecourses = async (id) => {
    try {
        const result = await client.query('DELETE from courses WHERE id = $1 returning id', [id]);
        console.log(id);

        if(result.rows.length === 0){
            return null;
        }
        return result.rows[0];
    } catch (err){
        console.log('Xatolik!');
        throw error;
    }
};