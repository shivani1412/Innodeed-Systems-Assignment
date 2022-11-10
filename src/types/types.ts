export type ItemProps = {
    id: string;
    modelName: string;
    bodyType: string;
    modelType: string;
    imageUrl: string;
};

export type NavigationProps = {
    fnc: (number: number) => void;
    forward: boolean;
    backward: boolean;
};

export type TrackingProps = {
    active: boolean;
}