import client from "..//config/db.js";

export const getallfaculty = async () => {
    try {
        const result = await client.query('select * from faculties');
        return result.rows;        
    } catch (error) {
        console.error('Select qilishda xatolik!');
    }
};

export const getByIdfaculty = async (id) => {
    try {
        const result = await client.query('select * from faculties where id = $1', [id]);
        return result.rows;        
    } catch (error) {
        console.error('Select qilishda xatolik!');
    }
};


export const createfaculty = async (body) => {
    try {
        const newUser = {...body} 
        if(!newUser.name || !newUser.description) {
            throw new error('maydonlar toliq emas!');
        }     

        const result = await client.query(`
            INSERT INTO faculties(name, description)
            VALUES($1, $2) returning *`, [newUser.name, newUser.description]);

        return result.rows;    
    } catch (error) {
        console.error('xatolik!');
    }
};


export const updatefaculty = async (id, body) => {
    try {
        const oldFacultyQuery = 'SELECT * FROM faculties WHERE id = $1';
        const oldFacultyResult = await client.query(oldFacultyQuery, [id]);
        const oldFaculty = oldFacultyResult.rows[0];

        if (!oldFaculty) {
            throw new Error("Faculty topilmadi");
        }

        const updatedFaculty = {
            name: body.name || oldFaculty.name,
            description: body.description || oldFaculty.description,
            updatedat: new Date().toISOString()
        };

        const query = `
            UPDATE faculties SET 
                name = $1, 
                description = $2,
                updatedat = $3
            WHERE id = $4 
            RETURNING *`;

        const values = [
            updatedFaculty.name, 
            updatedFaculty.description, 
            updatedFaculty.updatedat, 
            id
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating Faculty:", error);
        throw error;
    }
};



export const deletefaculty = async (id) => {
    try {
        const result = await client.query('DELETE from faculties WHERE id = $1 returning id', [id]);
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





