import Logger, {LogLevel} from "./Features/Logging/Helper/Logger";
import Features from "./Features";

export enum Phase {
    Startup,
    Running,
    Shutdown,
}

class NunuBot
{
    public static Phase: Phase = Phase.Startup;

	public Start(): void
	{
        Logger.log(LogLevel.Debug, "Starting bot");
        const features = new Features();
        features.LoadFeatures();
        features.Start();
	}
}

export default NunuBot;
