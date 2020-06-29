export interface ICacheElement<T>
{
    expire: number;
    value: T[];
}

interface IGuildModel<T>
{
    [index: string]: ICacheElement<T>
}

abstract class AbstractGuildModel<T, OriginT = T>
{
    protected _container: IGuildModel<T> = {};
    protected _expire = -1;

    public async Get(guildId: string, name: string): Promise<T[]>
    {
        const index = guildId + name;
        if (index in this._container) {
            const element = this._container[index];
            if (Date.now() > element.expire && this._expire != -1) {
                delete this._container[index];
            } else {
                return element.value;
            }
        }

        const entity = await this.Load(guildId, name);

        if (entity == null) {
            return null;
        }

        const newElement = entity.map(this.Mapping)

        this._container[index] = {
            expire: Date.now() + this._expire * 1000,
            value: newElement
        };

        return newElement;

    }

    public Flush(): void {
        this._container = {};
    }

    protected abstract async Load(guildId: string, name: string): Promise<OriginT[]>;

    protected Mapping(entity: OriginT): T {
        return entity as unknown as T;
    }
}

export default AbstractGuildModel;
