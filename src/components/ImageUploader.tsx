import React, { FC, useEffect, useState } from 'react'
import { ImageUploader, Toast } from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'

async function upload(file: File) {
    const formData = new FormData()
    formData.append('file', file) // 'file.file' is the actual file content

    try {
        const response = await fetch('http://localhost:8081/file/upload', {
            method: 'POST',
            body: formData,
        })

        // Handle the response
        const result = await response.text()
        return {
            url: 'http://' + result,
        }
    } catch (error) {
        console.error('Error uploading file:', error)
        return {
            url: '',
        }
    }
}
interface ImgUploaderProps {
    setUploadedImgUrl: (url: string) => void
    uploadedImgUrl: string
}
const ImgUploader: FC<ImgUploaderProps> = ({
    setUploadedImgUrl,
    uploadedImgUrl,
}) => {
    const [fileList, setFileList] = useState<ImageUploadItem[]>([])
    useEffect(() => {
        if (uploadedImgUrl) {
            setFileList([
                {
                    url: uploadedImgUrl,
                },
            ])
        } else {
            setFileList([])
        }
    }, [uploadedImgUrl])
    useEffect(() => {
        if (fileList.length > 0) {
            setUploadedImgUrl(fileList[0].url)
        }
    }, [fileList])
    function beforeUpload(file: File) {
        if (file.size > 1024 * 1024 * 2) {
            Toast.show('请选择小于 2M 的图片')
            return null
        }
        return file
    }

    return (
        <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={upload}
            maxCount={1}
            beforeUpload={beforeUpload}
        >
            <div>
                <button className="inline-flex  rounded-full p-2" type="button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </button>
            </div>
        </ImageUploader>
    )
}
export default ImgUploader
