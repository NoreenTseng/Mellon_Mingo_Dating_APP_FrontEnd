import React, { useEffect } from 'react'
import { ImageViewer, Ellipsis } from 'antd-mobile'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { fetchWithToken } from '../../utils/util'
import { useAuth } from '../../components/AuthContext'

const StoryList = () => {
    const { currentUserId } = useAuth()
    const [storyData, setStoryData] = React.useState([])
    const fetchStoryData = async () => {
        fetchWithToken(`http://localhost:8080/stories`)
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
        <div className="mt-16 pb-12 overflow-y-scroll">
            {storyData?.map(
                (
                    {
                        userProfileName,
                        imgContent,
                        textContent,
                        userProfilePicUrl,
                        likes,
                        timestamp,
                        id,
                    },
                    index
                ) => {
                    const date = new Date(timestamp).getTime()
                    const imgs = imgContent ? JSON.parse(imgContent) : []
                    const profileImg = JSON.parse(userProfilePicUrl)[0]
                    const likedByMe = likes.find(
                        (like) => like.userId === currentUserId
                    )
                    console.log(likedByMe)
                    return (
                        <div key={index} className="flex mb-5 pb-4 border-b-2">
                            <div className="pr-3 w-auto">
                                <img
                                    className="h-14 w-14 rounded-lg"
                                    src={profileImg}
                                    alt={userProfileName}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold">{userProfileName}</p>
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
                                                        ImageViewer.Multi.show({
                                                            images: imgs,
                                                            defaultIndex:
                                                                Number(index),
                                                        })
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
                                <div className="w-auto bg-purple-100 p-2 mt-2 pl-3 flex items-center justify-between text-base ">
                                    <div className="flex items-center ">
                                        {likes.length > 0 &&
                                            likes.map(
                                                (
                                                    { profileImage: imgUrl },
                                                    index
                                                ) =>
                                                    imgUrl && (
                                                        <div
                                                            className="flex h-8 w-8 -ml-2 rounded-full bg-no-repeat bg-cover"
                                                            key={index}
                                                            style={{
                                                                backgroundImage: `url("${
                                                                    JSON.parse(
                                                                        imgUrl
                                                                    )[0]
                                                                }")`,
                                                            }}
                                                        ></div>
                                                    )
                                            )}
                                        <span className="ml-1">
                                            {likes.length} likes
                                        </span>
                                    </div>
                                    <div className="flex">
                                        {likedByMe ? (
                                            <HeartIconSolid
                                                onClick={async () => {
                                                    const url = `http://localhost:8080/likes/${likedByMe.id}` // Adjust the URL to match your server
                                                    try {
                                                        const response =
                                                            await fetchWithToken(
                                                                url,
                                                                {
                                                                    method: 'DELETE',
                                                                    headers: {
                                                                        // Include any necessary headers here
                                                                        // For example, authentication tokens if your API requires it
                                                                    },
                                                                }
                                                            )

                                                        if (!response.ok) {
                                                            throw new Error(
                                                                `Error: ${response.status}`
                                                            )
                                                        }

                                                        console.log(
                                                            'Dislike successful'
                                                        )

                                                        fetchStoryData()
                                                    } catch (error) {
                                                        console.error(
                                                            'Error during dislike:',
                                                            error
                                                        )
                                                    }
                                                }}
                                                className="h-5 w-5 text-red-600"
                                            />
                                        ) : (
                                            <HeartIconOutline
                                                className="h-5 w-5"
                                                onClick={async () => {
                                                    try {
                                                        const response =
                                                            await fetchWithToken(
                                                                'http://localhost:8080/likes',
                                                                {
                                                                    method: 'POST', // or 'PUT'
                                                                    headers: {
                                                                        'Content-Type':
                                                                            'application/json',
                                                                    },
                                                                    body: JSON.stringify(
                                                                        {
                                                                            userId: currentUserId,
                                                                            storyId:
                                                                                id,
                                                                        }
                                                                    ),
                                                                }
                                                            )

                                                        fetchStoryData()
                                                        console.log(
                                                            'Success:',
                                                            response
                                                        )
                                                    } catch (error) {
                                                        console.error(
                                                            'Error:',
                                                            error
                                                        )
                                                    }
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            )}
        </div>
    )
}
export default StoryList
