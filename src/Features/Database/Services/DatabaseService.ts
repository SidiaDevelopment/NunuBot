import AbstractService from "../../../Global/Base/AbstractService";
import * as TypeORM from "typeorm";

class DatabaseService extends AbstractService
{
    public name: "DatabaseService";

    private _connection: TypeORM.Connection;

    public StartUp()
    {
        super.StartUp();

        this.Connect();
    }

    private async Connect(): Promise<void>
    {
        this._connection = await TypeORM.createConnection();
    }

    public GetConnection(): TypeORM.Connection
    {
        return this._connection;
    }
}

export default DatabaseService;
