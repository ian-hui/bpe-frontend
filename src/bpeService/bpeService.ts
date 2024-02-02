import axios from "axios";
import { SocketService } from "./bpeWebsocket";
import { BpeCommon } from "../bpeTypes/common";
import { promises } from "dns";

const backendUrl = "http://localhost:8080";
const websocketUrl = "ws://localhost:8080";

export namespace BpeServices {

    export async function startUploadDoc(file: File, uuid: string, question: string, finishUpload: (file:File,id:string) => void): Promise<void> {
        // 使用WebSocket服务
        const webSocketService = new SocketService(websocketUrl);
        // 增加一个事件监听器（start）
        webSocketService.getSocket().on("start", async (data:any) => {
            console.log("start");
            const sid = data.sid 
            try{
                webSocketService.add_task_id(sid);
                const task_id = await start_task(file, uuid, question, sid);
                console.log(task_id);
                webSocketService.add_task_id(task_id);
            }catch(error){
                webSocketService.disconnect();
                throw error;
            }
        });

        // 增加一个事件监听器（finish）
        webSocketService.getSocket().on("finish", (data:BpeCommon.SocketResponseType) => {
            console.log("finish");
            try{
                downloadFile(data.detail);
                webSocketService.disconnect();
                finishUpload(file, uuid);
            }catch(error){
                webSocketService.disconnect();
                throw error;
            }
        });

        // 增加一个事件监听器（update）
        webSocketService.getSocket().on("progress_update", (data:BpeCommon.SocketResponseType) => {
            console.log("update");
            // 处理收到的消息
            console.log(data);
        });
    }

    async function start_task(file: File, uuid: string, question: string, sid: string): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uuid', uuid);
        formData.append('question', question);
        formData.append('session_id', sid);
    
        try {
            const response = await axios.post<BpeCommon.SocketResponseType>(backendUrl + "/start_task", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            return response.data.task_id;
        } catch (error) {
            // 处理错误，您可以根据需要将错误信息格式化
            if (axios.isAxiosError(error) && error.response) {
                // 这里可以处理来自服务器的错误响应
                throw new Error(error.response.data.message || "Unknown error occurred");
            } else {
                // 这里处理其他类型的错误（网络问题等）
                throw new Error("Network or other error");
            }
        }
    }

    async function downloadFile(filepath:string): Promise<void>{
            const response = await axios.get(backendUrl+"/download/"+filepath, {
                responseType: 'blob',  // 重要：期望响应是一个Blob
            });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            // 创建一个指向 Blob 的 URL
            const fileUrl = window.URL.createObjectURL(blob);
            // 创建一个临时的 a 元素用于下载文件
            const link = document.createElement('a');
            link.href = fileUrl;
            const contentDisposition = response.headers['content-disposition'];
            let fileName = "newreport";
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="?(.*)"?(;|$)/);
                if (fileNameMatch.length > 1) {
                    fileName = fileNameMatch[1];
                }
            }
            link.setAttribute('download', fileName);

            // 添加到文档并点击
            document.body.appendChild(link);
            link.click();
            // 清理：移除元素，释放 Blob URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(fileUrl);
    }

    export async function uploadDocument(file: File, uuid: string, question: string): Promise<any> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uuid', uuid);
        formData.append('question', question);

        try {
            
            const response = await axios.post(backendUrl+"/reportGen", formData, {
                responseType: 'blob',  // 重要：期望响应是一个Blob
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // 创建一个指向 Blob 的 URL
            const fileUrl = window.URL.createObjectURL(blob);

            // 创建一个临时的 a 元素用于下载文件
            const link = document.createElement('a');
            link.href = fileUrl;
            const contentDisposition = response.headers['content-disposition'];
            let fileName = "new"+question.replace(".docx","");
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="?(.*)"?(;|$)/);
                if (fileNameMatch.length > 1) {
                    fileName = fileNameMatch[1];
                }
            }
            link.setAttribute('download', fileName);

            // 添加到文档并点击
            document.body.appendChild(link);
            link.click();
            // 清理：移除元素，释放 Blob URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(fileUrl);
        } catch (error) {
            console.error('上传文件时发生错误:', error);
            throw error; // 抛出错误或者根据需要进行处理
        }
    }
}