interface ModuleInterface
{
    name: string;

    Load(): void;
    Unload(): void;
}

export default ModuleInterface;
