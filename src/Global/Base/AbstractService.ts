import ServiceInterface from "../Interfaces/ServiceInterface";

abstract class AbstractService implements ServiceInterface
{
    public abstract name: string;

    public StartUp(): void {
        return;
    }
}

export default AbstractService;
