import * as Discord from "discord.js";
import AbstractService from "../../../Global/Base/AbstractService";

type MessageCallback = (message: Discord.Message) => void;

class DiscordEventApiService extends AbstractService
{
    public name = "DiscordEventApi";
    private readonly _client: Discord.Client;

    constructor(client: Discord.Client)
    {
        super();
        this._client = client;
    }

    public OnMessage(callback: MessageCallback): void {
        this._client.on("message", callback);
    }
}

export default DiscordEventApiService;
