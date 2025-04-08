import client from "../config/db.js";

export const getallgrades = async () => {
    try{
        const result = await client.query('select * from grades');
        return result.rows;
    } catch (error) {
        console.error('select qilishda xatolik!');
    }
};


export const getByIdgrades = async (id) => {
    try {
        const result = await client.query('select * from grades where id = $1', [id]);
        return result.rows;
    } catch (error) {
        console.error('Select qilishda xatolik!');
    }
};


export const creategrades = async (body) => {
    try {
        const newUser = {...body}
        if(!newUser.grade){
            throw new error('maydonlar toliq emas!');
        }

        const result = await client.query(`
            INSERT INTO grades(grade) VALUES($1) RETURNING *`, [newUser.grade]);

        return result.rows;
    } catch (error) {
        console.log('xatolik!');
    }
};


export const updategrades = async (id, body) => {
    try {
        const oldGradesQuery = `SELECT * FROM grades WHERE id = $1`;
        const oldGradesResult = await client.query(oldGradesQuery, [id]);
        const oldGrades = oldGradesResult.rows[0];

        if (!oldGrades) {
            throw new Error('Grades topilmadi');
        }

        const updatedgrades = {
            grade: body.grade || oldGrades.grade,
            updatedat: new Date().toISOString()
        };

        const query = `
            UPDATE grades SET
                grade = $1,
                updatedat = $2
            WHERE id = $3 RETURNING *`;

        const values = [
            updatedgrades.grade,
            updatedgrades.updatedat,
            id
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating grades:', error);
        throw error;
    }
};



export const deletegrades = async (id) => {
    try {
        const result = await client.query('DELETE from grades where id = $1 returning id', [id]);
        console.log(id);

        if(result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } catch (err) {
        console.error('xatolikk!');
        throw error;
    }
};