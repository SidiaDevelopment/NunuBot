export interface ICacheElement<T>
{
    expire: number;
    value: T[];
}

interface IGuildGroup<T>
{
    [index: string]: ICacheElement<T>;
}

interface IGuildModel<T>
{
    [index: string]: IGuildGroup<T>
}

abstract class AbstractGuildModel<T, OriginT = T>
{
    protected _container: IGuildModel<T> = {};
    protected _expire = -1;

    public async Get(guildId: string, name: string): Promise<T[]>
    {
        if (guildId in this._container)
        {
            const guildGroup = this._container[guildId];
            if (name in guildGroup)
            {
                const element = guildGroup[name];
                if (Date.now() > element.expire && this._expire != -1)
                {
                    delete this._container[guildId][name];
                } else
                {
                    return element.value;
                }
            }
        } else
        {
            this._container[guildId] = {};
        }

        const entity = await this.Load(guildId, name);
        if (entity == null)
        {
            return null;
        }

        const newElement = entity.map(this.Mapping)

        this._container[guildId][name] = {
            expire: Date.now() + this._expire * 1000,
            value: newElement
        };

        return newElement;

    }

    public Flush(): void
    {
        this._container = {};
    }

    public FlushGuild(guildId: string): void
    {
        if (guildId in this._container)
        {
            delete this._container[guildId];
        }
    }

    public FlushValue(guildId: string, name: string): void
    {
        if (guildId in this._container)
        {
            if (name in this._container[guildId])
            {
                delete this._container[guildId][name];
            }
        }
    }

    protected abstract async Load(guildId: string, name: string): Promise<OriginT[]>;

    protected Mapping(entity: OriginT): T
    {
        return entity as unknown as T;
    }
}

export default AbstractGuildModel;
