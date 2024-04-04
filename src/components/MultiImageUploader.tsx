import React, { FC, useEffect, useState } from 'react'
import { ImageUploader, Toast } from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'

export const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time))

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
    setUploadedImgUrl: (arg0: string[]) => void
    defaultFileList?: ImageUploadItem[]
}
const ImgUploader: FC<ImgUploaderProps> = ({
    defaultFileList,
    setUploadedImgUrl,
}) => {
    const [fileList, setFileList] = useState<ImageUploadItem[]>(
        defaultFileList || []
    )
    useEffect(() => {
        if (fileList.length > 0) {
            setUploadedImgUrl(fileList.map((i) => i.url))
        }
    }, [fileList])
    function beforeUpload(file: File) {
        if (file.size > 1024 * 1024 * 2) {
            Toast.show('请选择小于 2M 的图片')
            return null
        }
        return file
    }
    const handleDelete = (urlToDelete: string) => {
        // Filter out the image with the specified URL
        const newFileList = fileList.filter((item) => item.url !== urlToDelete)

        // Update the fileList state
        setFileList(newFileList)
    }

    return (
        <ImageUploader
            preview
            value={fileList}
            onChange={setFileList}
            upload={upload}
            maxCount={9}
            columns={3}
            beforeUpload={beforeUpload}
            renderItem={(item, a) => (
                <div
                    key={a.url}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${a.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        aspectRatio: 1 / 1,
                        position: 'relative',
                    }}
                >
                    {/* <button
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            // Additional styling for the close button
                        }}
                        onClick={() => handleDelete(a.url)}
                    >
                        X
                    </button> */}
                </div>
            )}
        />
    )
}
export default ImgUploader
