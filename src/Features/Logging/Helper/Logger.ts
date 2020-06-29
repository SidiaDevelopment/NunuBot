import chalk from "chalk";

export enum LogLevel
{
    Debug,
    Warning,
    Error,
    Fatal,
    Forced,
    None,
}

class Logger
{
    /**
     *
     */
    private logLevel: LogLevel = LogLevel.Debug;

    /**
     * Log strings at a set level
     *
     * @param level     The desired logging level
     * @param params    All strings to log
     */
    public log(level: LogLevel, ...params: string[]): void
    {
        if (level >= this.logLevel)
        {
            console.log(`${chalk.green("NunuBot")}:`, ...params);
        }
    }
}

export default new Logger();
