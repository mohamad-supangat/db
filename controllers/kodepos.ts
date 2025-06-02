import { Database } from "bun:sqlite";

export const db = new Database("kodepos.sqlite");

function getKodeposDB(searchQuery: string) {
  const rows = db
    .query(
      `
      SELECT *
      FROM addresses
      WHERE
        province LIKE '%${searchQuery}%'
        OR city LIKE '%${searchQuery}%'
        OR subdistrict LIKE '%${searchQuery}%'
        OR urban LIKE '%${searchQuery}%'
        OR postalcode LIKE '%${searchQuery}%'
      `,
    )
    .all();

  return rows;
}

export function kodeposV2(searchQuery: string) {
  const rows = getKodeposDB(searchQuery);
  return Response.json(rows, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  });
}

export function kodeposV1(searchQuery: string) {
  const rows = getKodeposDB(searchQuery);
  return Response.json(
    {
      statusCode: 200,
      code: "OK",
      data: rows,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    },
  );
}
