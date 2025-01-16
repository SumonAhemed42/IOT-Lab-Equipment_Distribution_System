import mysql from "mysql2/promise";

/*
- How to create connection using MySQL?
export async function createConnection(dbName: string) {
    return await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: dbName,
    });
}
*/

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "classroom",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})


export async function execute(query: string, params?: any[]) {
    let connection;
    try {
        connection = await pool.getConnection();
        let result: any, tableSchema: any;
        if (params) [result, tableSchema] = await connection.execute(query, params)
        else[result, tableSchema] = await connection.execute(query)
        return result;
    } catch (error) {
        if (connection) connection.release();
        console.log("Query:", query);
        console.error("Error:", error);
    } finally {
        if (connection) connection.release();
    }
}