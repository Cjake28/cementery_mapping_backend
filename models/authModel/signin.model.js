import db from '../../db/db.connect';

export async function checkEmialExist(email){
    try{
        const [result] = await db.query(`
                SELECT email FROM
            `);
    }catch(error){

    }
}