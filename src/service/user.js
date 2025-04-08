import client from "..//config/db.js";

export const getallusers = async () => {
    try {
        const result = await client.query('select * from users');
        return result.rows;        
    } catch (error) {
        console.error('Select qilishda xatolik!');
    }
};



export const getByIdusers = async (id) => {
    try {
        const result = await client.query('select * from users where id = $1', [id]);
        return result.rows;        
    } catch (error) {
        console.error('Select qilishda xatolik!');
    }
};



export const createusers = async (body) => {
    try {
        const newUser = {...body} 
        if(!newUser.email || !newUser.username || !newUser.password || !newUser.role || !newUser.status) {
            throw new error('maydonlar toliq emas!');
        }     

        const result = await client.query(`
            INSERT INTO users(email, username, password, role, status)
            VALUES($1, $2, $3, $4, $5) RETURNING *`, [newUser.email, newUser.username, newUser.password, newUser.role, newUser.status]);

        return result.rows;    
    } catch (error) {
        console.error('xatolik!');
    }
};



export const updateusers = async (id, body) => {
    try {
        const oldUsersQuery = 'SELECT * FROM users WHERE id = $1';
        const oldUsersResult = await client.query(oldUsersQuery, [id]);
        const oldUsers = oldUsersResult.rows[0];

        if (!oldUsers) {
            throw new Error("Users topilmadi");
        }

        const updatedUsers = {
            email: body.email || oldUsers.email, 
            username: body.username || oldUsers.username,
            password: body.password || oldUsers.password,
            role: body.role || oldUsers.role,
            status: body.status || oldUsers.status,
            updatedat: new Date().toISOString()
        };

    

        const query = `
            UPDATE users SET 
                email = $1, 
                username = $2,
                password = $3,
                role = $4,
                status = $5,
                updatedat = $6
            WHERE id = $7 
            RETURNING *`;

        const values = [
            updatedUsers.email, 
            updatedUsers.username,
            updatedUsers.password,
            updatedUsers.role,
            updatedUsers.status, 
            updatedUsers.updatedat, 
            id
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating Users:", error);
        throw error;
    }
};



export const deleteusers = async (id) => {
    try {
        const result = await client.query('DELETE from users WHERE id = $1 returning id', [id]);
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