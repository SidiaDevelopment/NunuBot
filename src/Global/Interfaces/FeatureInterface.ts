interface FeatureInterface
{
    AddServiceFactories(): void;
    AddModuleFactories(): void;

    StartUpServices(): void;
    StartUpModules(): void;
}

export default FeatureInterface;
