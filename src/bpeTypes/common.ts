
export namespace BpeCommon {
    export type navigationItems ={
        chatid : string,
        name : string,
    }
    export type navigationItemsList ={
        listType : string,
        items : navigationItems[]
    }
    export type recordItem={
        content: string;
        role: Role;
    }
    export type recordList={
        [chatid: string]: recordItem[];
    }
    export type Role = "user" | "gpt";
}


