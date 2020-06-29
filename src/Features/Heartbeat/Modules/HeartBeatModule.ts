import AbstractModule from "../../../Global/Base/AbstractModule";
import PingCommand from "../Commands/PingCommand";
import {ICommand} from "../../Command/Services/CommandService";

class HeartbeatModule extends AbstractModule
{
    public name = "HeartbeatModule";

    protected _commands: ICommand[] = [
        {
            command: "ping",
            callback: PingCommand.OnPing,
            permissions: {
                allowByDefault: true
            }
        }
    ];
}

export default HeartbeatModule;
