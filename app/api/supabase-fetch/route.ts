// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';
// import { z, ZodError } from 'zod';
// import { getSchemaForTable } from '@/schemas';

// const querySchema = z.object({
//   table: z.string(),
//   select: z.string(),
//   filterColumn: z.string().optional(),
//   filterValue: z.string().optional(),
// });

// export async function GET(request: { url: URL }) {
//   const { searchParams } = new URL(request.url);
//   const table = searchParams.get('table');
//   const select = searchParams.get('select');
//   const filterColumn = searchParams.get('filterColumn');
//   const filterValue = searchParams.get('filterValue');

//   try {
//     querySchema.parse({ table, select, filterColumn, filterValue });
//     if (!table) {
//       throw new Error('Table should be table.');
//     }

//     const schema = getSchemaForTable(table);

//     const client = await pool.connect();
//     let query = `SELECT ${select} FROM ${table}`;
//     if (filterColumn && filterValue) {
//       query += ` WHERE ${filterColumn} = $1`;
//     }
//     const result = await client.query(query, filterValue ? [filterValue] : []);
//     client.release();

//     const validatedData = schema.array().parse(result.rows);
//     return NextResponse.json(validatedData, { status: 200 });
//   } catch (error) {
//     console.error('Error:', error);
//     if (error instanceof ZodError) {
//       return NextResponse.json(
//         { error: error.errors.map((e) => e.message).join(', ') },
//         { status: 400 },
//       );
//     }
//     return NextResponse.json(
//       { error: 'Unexpected server error' },
//       { status: 500 },
//     );
//   }
// }
