import AbstractFactory from "../../../Global/Base/AbstractFactory";
import AbstractService from "../../../Global/Base/AbstractService";
import DiscordApi from "../Services/DiscordApi";
import * as Discord from "discord.js";

class DiscordApiFactory extends AbstractFactory
{
    create(): AbstractService
    {
        const discordClient = new Discord.Client();
        return new DiscordApi(discordClient);
    }

}

export default DiscordApiFactory;
