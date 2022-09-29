import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import pkg from 'pg';
const { Pool } = pkg;
import { DATABASE_CONNECTION } from '$env/static/private';
const connectionString = DATABASE_CONNECTION;

export const GET: RequestHandler = async () => {
	const pool = new Pool({ connectionString });
	const client = await pool.connect();
	try {
		const query = {
			text: `select * from information_schema.tables where table_schema=$1`,
			values: ['pg_catalog']
		};

		const res = await client.query(query);
		if (res.rowCount === 0) {
			throw error(404);
		}

		return new Response(JSON.stringify(res.rows));
	} finally {
		client.release();
		pool.end();
	}
};
