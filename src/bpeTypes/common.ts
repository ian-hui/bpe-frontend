import { type } from "os";

export namespace BpeCommon {
    export interface WithErrorHandlingProps {
        handleError: (error_msg: string) => void;
    }
    
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

    export type SocketResponseType={
        task_id: string;
        type: string;
        detail: string;
    }
}


