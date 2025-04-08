import client from '..//config/db.js';

export const getallstudents = async () => {
    try {
        const result = await client.query('select * from students');
        return result.rows;        
    } catch (error) {
        console.error('Select qilishda xatolik!');
    }
};


export const getByIdstudents = async (id) => {
    try {
        const result = await client.query('select * from students where id = $1', [id]);
        return result.rows;        
    } catch (error) {
        console.error('Select qilishda xatolik!');
    }
};



export const createstudents = async (body) => {
    try {
        const newUser = {...body} 
        console.log(body);
        if(!newUser.firstname || !newUser.lastname || !newUser.email || !newUser.birthdate || !newUser.enrollmentdate || !newUser.status || !newUser.address || !newUser.phonenumber) {
            throw new Error('maydonlar toliq emas!');
        }     

        const result = await client.query(`
            INSERT INTO students(firstname, lastname, email, birthdate, enrollmentdate, status, address, phonenumber)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [newUser.firstname, newUser.lastname, newUser.email, newUser.birthdate, newUser.enrollmentdate, newUser.status, newUser.address, newUser.phonenumber]);

        return result.rows;    
    } catch (error) {
        console.error('xatolik!', error);
    }
};



export const updatestudents = async (id, body) => {
    try {
        const oldstudentsQuery = 'SELECT * FROM students WHERE id = $1';
        const oldstudentsResult = await client.query(oldstudentsQuery, [id]);
        const oldstudents = oldstudentsResult.rows[0];

        if (!oldstudents) {
            throw new Error("students topilmadi");
        }

        const updatedstudents = {
            firstName: body.firstname || oldstudents.firstname, 
            lastName: body.lastname || oldstudents.lastname,
            email: body.email || oldstudents.email,
            birthdate: body.birthdate || oldstudents.birthdate,
            enrollmentdate: body.enrollmentdate || oldstudents.enrollmentdate,
            status: body.status || oldstudents.status,
            address: body.address || oldstudents.address,
            phoneNumber: body.phonenumber || oldstudents.phonenumber,
            updatedat: new Date().toISOString()
        };

    

        const query = `
            UPDATE students SET 
                firstname = $1, 
                lastname = $2,
                email = $3,
                birthdate = $4,
                enrollmentdate = $5,
                status = $6,
                address = $7,
                phonenumber = $8,
                updatedat = $9
            WHERE id = $10
            RETURNING *`;

        const values = [
            updatedstudents.firstName, 
            updatedstudents.lastName,
            updatedstudents.email,
            updatedstudents.birthdate,
            updatedstudents.enrollmentdate,
            updatedstudents.status,
            updatedstudents.address,
            updatedstudents.phoneNumber, 
            updatedstudents.updatedat, 
            id
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating students:", error);
        throw error;
    }
};



export const deletestudents = async (id) => {
    try {
        const result = await client.query('DELETE from students WHERE id = $1 returning id', [id]);
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