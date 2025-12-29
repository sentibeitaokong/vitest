export  interface messagesInterface {
    items: {
        message: string;
        from: string;
    }[];
    callbacks:Array<Function>;
    addItem(item: itemInterface): void;
    onItem(callback: Function): void;
    getLatest: (index?: number) => {
        message: string;
        from: string;
    } | undefined;
}

export  interface itemInterface{
    message:string
    from:string
}



