import * as Discord from "discord.js";

class MessageFormatter
{
    public static EmbedMessage(message: string, success= true): Discord.MessageEmbed {
        return new Discord.MessageEmbed()
            .setDescription(message)
            .setColor(success ? "#43b581" : "#f04947");
    }
}

export default MessageFormatter;
