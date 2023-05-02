import { getDBConnection } from '../app.js';

function getSensorhistory(req, res, next) {
    const db = getDBConnection();
    db.query(`SELECT * FROM sensor_History`, (error, results)=> {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error '});
        } else {
            res.status(200).json(results);
        }
    });
}

export { getSensorhistory };