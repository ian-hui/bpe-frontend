import axios from "axios";

const backendUrl = "http://localhost:5000";

export namespace BpeServices {
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
            return response.data; // axios 封装了 response，因此直接返回 response.data
        } catch (error) {
            console.error('上传文件时发生错误:', error);
            throw error; // 抛出错误或者根据需要进行处理
        }
    }
}