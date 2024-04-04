import React, { useEffect } from 'react'
import MultiImageUploader from '../../components/MultiImageUploader'
import { TextArea, Button } from 'antd-mobile'
import { fetchWithToken } from '../../utils/util'
import { useAuth } from '../../components/AuthContext'
const EditStory = ({
    defaultContent,
    defaultUploadedImgUrls,
    setIsEditing,
    storyId,
}) => {
    const [content, setContent] = React.useState(defaultContent)
    useEffect(() => {
        setContent(defaultContent)
    }, [defaultContent])
    useEffect(() => {
        setUploadedImgUrls(defaultUploadedImgUrls)
    }, [defaultUploadedImgUrls])
    const [uploadedImgUrls, setUploadedImgUrls] = React.useState(
        defaultUploadedImgUrls
    )
    const { currentUserId } = useAuth()
    return (
        <div className="fixed p-4 top-0 left-0 h-screen w-screen bg-purple-bg z-20">
            <div className="flex w-full items-center justify-between">
                <Button
                    fill="none"
                    onClick={() => {
                        setIsEditing(false)
                    }}
                >
                    Cancel
                </Button>
                <span>
                    <Button
                        fill="none"
                        onClick={async () => {
                            setIsEditing(false)
                            const postParam = {
                                userId: currentUserId,
                                textContent: content,
                                state: 'draft',
                            }
                            if (uploadedImgUrls) {
                                postParam.imgContent =
                                    JSON.stringify(uploadedImgUrls)
                            }
                            try {
                                const response = await fetchWithToken(
                                    `http://localhost:8080/stories${
                                        storyId ? `/${storyId}` : ''
                                    }`,
                                    {
                                        method: storyId ? 'PUT' : 'POST', // or 'PUT'
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(postParam),
                                    }
                                )

                                // const result = await response.json();
                                console.log('Success:', response)
                                window.location.reload()
                            } catch (error) {
                                console.error('Error:', error)
                            }
                        }}
                    >
                        Save as Draft
                    </Button>
                    <Button
                        color="success"
                        onClick={async () => {
                            setIsEditing(false)
                            try {
                                const postParam = {
                                    userId: currentUserId,
                                    textContent: content,
                                    state: 'published',
                                }
                                if (uploadedImgUrls) {
                                    postParam.imgContent =
                                        JSON.stringify(uploadedImgUrls)
                                }
                                const response = await fetchWithToken(
                                    `http://localhost:8080/stories${
                                        storyId ? `/${storyId}` : ''
                                    }`,
                                    {
                                        method: storyId ? 'PUT' : 'POST', // or 'PUT'
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(postParam),
                                    }
                                )

                                // const result = await response.json();
                                console.log('Success:', response)
                                window.location.reload()
                            } catch (error) {
                                console.error('Error:', error)
                            }
                        }}
                    >
                        Publish
                    </Button>
                </span>
            </div>
            <div className="mt-5 ml-2 mr-2 mb-7">
                <TextArea
                    placeholder="Thoughts at the moment..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    value={content}
                    maxLength={200}
                    onChange={(val) => {
                        setContent(val)
                    }}
                />
            </div>
            <div className="mt-5 ml-2 mr-2 mb-7">
                <MultiImageUploader
                    defaultFileList={
                        uploadedImgUrls
                            ? uploadedImgUrls.map((url) => {
                                  return {
                                      uid: url,
                                      name: url,
                                      status: 'done',
                                      url: url,
                                  }
                              })
                            : []
                    }
                    setUploadedImgUrl={(urls) => {
                        setUploadedImgUrls(urls)
                    }}
                />
            </div>
        </div>
    )
}
export default EditStory
