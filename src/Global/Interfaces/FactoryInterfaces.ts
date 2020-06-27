import AbstractFactory from "../Base/AbstractFactory";

export type IFactory = new () => AbstractFactory;
export interface IFactories
{
    [id: string]: IFactory;
}
