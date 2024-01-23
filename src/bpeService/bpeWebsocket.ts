import { Socket, io } from "socket.io-client";

export class SocketService {
    private socket: Socket
    private task_id: string

    constructor(url: string) {
        this.socket = io(url);
        this.task_id = "";

        this.socket.on("connect", () => {
            console.log("Connected to the server");
        });
        
        this.socket.on("disconnect", () => {
            console.log("Disconnected from the server");
        });

        this.socket.on("message", (data: any) => {
            console.log("Message received:", data);
            // 处理收到的消息
        });


        this.socket.on("test", (data: any) => {
            console.log("Test received haha:", data);
            // 处理收到的消息
        });
    }

    public sendMessage(message: string): void {
        this.socket.emit("message", message);
    }

    public getSocket(): Socket {
        return this.socket;
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

    public add_task_id(task_id: string): void {
        this.task_id = task_id;
    }
}

