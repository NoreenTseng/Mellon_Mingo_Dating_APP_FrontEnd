import React, { useEffect, useState } from 'react'
import { ImageViewer, Ellipsis } from 'antd-mobile'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { Button } from 'antd-mobile'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { fetchWithToken } from '../../utils/util'
import { useAuth } from '../../components/AuthContext'
import EditStory from './EditStory'

const MyStoryList = ({ setIsManagingStories }) => {
    const { currentUserId } = useAuth()
    const [storyData, setStoryData] = React.useState([])
    const [isEditing, setIsEditing] = React.useState(false)
    const [currentEditingTextContent, setCurrentEditingTextContent] =
        useState('')
    const [currentEditingImgUrls, setCurrentEditingImgUrls] = useState('')
    const fetchStoryData = async () => {
        fetchWithToken(`http://localhost:8080/stories/user/${currentUserId}`)
            .then((res) => res.json())
            .then((res) => {
                if (Array.isArray(res)) {
                    res && setStoryData(res)
                }
            })
    }
    useEffect(() => {
        currentUserId && fetchStoryData()
    }, [currentUserId])
    console.log(storyData)
    return (
        <>
            <ChevronLeftIcon
                className="h-7 w-7"
                onClick={() => {
                    setIsManagingStories(false)
                }}
            />
            <div className="mt-10 pb-12 overflow-y-scroll">
                {storyData?.map(
                    (
                        {
                            userProfileName,
                            imgContent,
                            textContent,
                            userProfilePicUrl,
                            timestamp,
                            id,
                            state,
                            canEdit,
                        },
                        index
                    ) => {
                        const date = new Date(timestamp).getTime()
                        const imgs = imgContent ? JSON.parse(imgContent) : []
                        const profileImg = JSON.parse(userProfilePicUrl)[0]

                        return (
                            <div
                                key={index}
                                className="flex mb-5 pb-4 border-b-2"
                            >
                                {isEditing && (
                                    <EditStory
                                        defaultContent={
                                            currentEditingTextContent
                                        }
                                        defaultUploadedImgUrls={JSON.parse(
                                            currentEditingImgUrls
                                        )}
                                        setIsEditing={setIsEditing}
                                        isEditing={isEditing}
                                        storyId={id}
                                    />
                                )}
                                <div className="pr-3 w-auto">
                                    <img
                                        className="h-14 w-14 rounded-lg"
                                        src={profileImg}
                                        alt={userProfileName}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="max-w-prose">
                                            <Ellipsis
                                                direction="end"
                                                rows={3}
                                                content={textContent}
                                                expandText={
                                                    <div className="text-base">
                                                        more
                                                    </div>
                                                }
                                                collapseText={
                                                    <div className="text-base">
                                                        less
                                                    </div>
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={`mt-2 grid
                                        ${
                                            imgs.length === 1
                                                ? 'grid-cols-1'
                                                : imgs.length === 2 ||
                                                  imgs.length === 4
                                                ? 'grid-cols-2'
                                                : 'grid-cols-3'
                                        }
                                        gap-2`}
                                    >
                                        {imgs?.map((img, index) => {
                                            return (
                                                <div
                                                    className="col-span-1 overflow-hidden aspect-square "
                                                    key={index}
                                                >
                                                    <img
                                                        src={img}
                                                        onClick={() => {
                                                            ImageViewer.Multi.show(
                                                                {
                                                                    images: imgs,
                                                                    defaultIndex:
                                                                        Number(
                                                                            index
                                                                        ),
                                                                }
                                                            )
                                                        }}
                                                        alt=""
                                                        className="w-auto aspect-square object-fill"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className="w-auto pt-2 flex gap-2 text-sm text-gray-500 items-center ">
                                        {new Date(date).toLocaleString()}
                                    </div>
                                    <p className="mt-4">
                                        {canEdit && (
                                            <Button
                                                fill="none"
                                                className="underline p-0"
                                                style={{
                                                    padding: 0,
                                                }}
                                                onClick={() => {
                                                    setCurrentEditingTextContent(
                                                        textContent
                                                    )
                                                    setCurrentEditingImgUrls(
                                                        imgContent
                                                    )
                                                    setIsEditing(id)
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                        {state === 'published' && (
                                            <span className="underline">
                                                {' '}
                                                Published
                                            </span>
                                        )}
                                        {state !== 'archived' ? (
                                            <Button
                                                fill="none"
                                                className="underline p-0"
                                                onClick={() => {
                                                    fetchWithToken(
                                                        `http://localhost:8080/stories/${id}/state`,
                                                        {
                                                            method: 'PUT', // or 'PUT'
                                                            headers: {
                                                                'Content-Type':
                                                                    'application/json',
                                                            },
                                                            body: 'archived',
                                                        }
                                                    )
                                                        .then((res) =>
                                                            res.json()
                                                        )
                                                        .then((res) => {
                                                            console.log(
                                                                'Success:',
                                                                res
                                                            )
                                                            fetchStoryData()
                                                        })
                                                        .catch((error) => {
                                                            console.error(
                                                                'Error:',
                                                                error
                                                            )
                                                        })
                                                }}
                                            >
                                                Archive
                                            </Button>
                                        ) : (
                                            <span className="underline">
                                                Archived
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
        </>
    )
}
export default MyStoryList
