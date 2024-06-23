
import DatabaseConnection from "./databaseConnection";

export class PersistenceService extends DatabaseConnection {

    /**
     * valida usuario desde la base de datos
     */
    async executeQueryStoreProcedure(query: string, args: any[]) {
        try {


            // execute query
            const [[result, options]]: any[] = await this.getInstance().query(query, args)

            return { result, options }

        } catch (error) {
            console.log("🚀 ~ PersistenceService ~ executeStoreProcedure ~ error:", error)
            throw error
        } 

    }

    async executeInsertStoreProcedure(query: string, args: any[]) {
        try {
            // execute query
            const [result]: any[] = await this.getInstance().query(query, args)
            console.log("🚀 ~ PersistenceService ~ executeInsertStoreProcedure ~ result:", result)
            return result

        } catch (error) {
            console.log("🚀 ~ PersistenceService ~ executeStoreProcedure ~ error:", error)
            throw error
        } 

    }


}