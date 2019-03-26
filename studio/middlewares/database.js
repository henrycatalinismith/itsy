import { SQLite } from "expo"
import { before, after } from "@highvalley.systems/signalbox"

import actions from "../actions"
import select from "../selectors"

let db

const psql = (sql, params = []) => new Promise((resolve, reject) => {
  db.transaction(
    transaction => transaction.executeSql(
      sql, params, (_, result) => resolve(result)
    ),
    error => reject(error),
  )
})

export default [
  before("start", async store => {
    db = SQLite.openDatabase("itsystudio.db")

    await psql(`
      CREATE TABLE IF NOT EXISTS disks (
        id STRING PRIMARY KEY NOT NULL,
        created TEXT NOT NULL,
        updated TET NOT NULL,
        name TEXT NOT NULL,
        lua TEXT NOT NULL,
        palette TEXT NOT NULL,
        spritesheet TEXT NOT NULL,
        thumbnail TEXT NOT NULL
      );
    `)

    const result = await psql("SELECT COUNT(*) FROM disks")
  }),
]


