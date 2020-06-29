import Logger, {LogLevel} from "./Features/Logging/Helper/Logger";
import Features from "./Features";

class NunuBot
{
	/**
	 * Start the bot
	 */
	public start(): void
	{
        Logger.log(LogLevel.Debug, "Starting bot");
        const features = new Features();
        features.LoadFeatures();
	}
}

export default NunuBot;
