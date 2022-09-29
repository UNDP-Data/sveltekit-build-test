import pkg from 'pg';
const { Pool } = pkg;

export async function get() {
	const connectionString = import.meta.env.VITE_DATABASE_CONNECTION;
	const pool = new Pool({ connectionString });
	const client = await pool.connect();
	try {
		const query = {
			text: `select * from information_schema.tables where table_schema=$1`,
			values: ['pg_catalog']
		};

		const res = await client.query(query);
		if (res.rowCount === 0) {
			return {
				status: 404
			};
		}

		return {
			status: 200,
			body: res.rows
		};
	} finally {
		client.release();
		pool.end();
	}
}
