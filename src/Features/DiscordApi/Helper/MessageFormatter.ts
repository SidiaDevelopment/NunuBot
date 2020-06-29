import * as Discord from "discord.js";

class MessageFormatter
{
    public static Message(message: string): Discord.MessageEmbed {
        return new Discord.MessageEmbed()
            .setDescription(message);
    }

    public static SuccessMessage(message: string): Discord.MessageEmbed {
        return new Discord.MessageEmbed()
            .setDescription(":white_check_mark: " + message)
            .setColor("#43b581");
    }

    public static FailMessage(message: string): Discord.MessageEmbed {
        return new Discord.MessageEmbed()
            .setDescription(":x: " + message)
            .setColor("#f04947");
    }
}

export default MessageFormatter;
