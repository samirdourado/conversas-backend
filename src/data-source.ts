import "dotenv/config"
import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import path from "path"

const dataSourceConfig = (): DataSourceOptions => {

    const migrationsPath: string = path.join(__dirname, './migrations/**.{ts,js}')
    const entitiesPath: string = path.join(__dirname, './models/**.{ts,js}')    

    const dbUrl: string | undefined = process.env.DATABASE_URL

    if (dbUrl === undefined) {
        throw new Error("Env var DATABASE_URL does not exist!")
    }

    return {
        type: "postgres",
        url: dbUrl,
        synchronize: false,
        logging: true,
        migrations: [migrationsPath],
        entities: [entitiesPath]
    }
}

const AppDataSource = new DataSource(dataSourceConfig())

export { AppDataSource }