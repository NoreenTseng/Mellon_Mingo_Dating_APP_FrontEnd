import React, { useState } from 'react'
import StoryHeader from './StoryHeader'
import EditStory from './EditStory.jsx'
import StoryList from './StoryList'
import MyStoryList from './MyStoryList.jsx'

const Story = () => {
    const [isManagingStories, setIsManagingStories] = useState(false)
    const [isEditing, setIsEditing] = React.useState(false)
    return (
        <div className="mb-24">
            {isManagingStories ? (
                <MyStoryList setIsManagingStories={setIsManagingStories} />
            ) : isEditing ? (
                <EditStory setIsEditing={setIsEditing} />
            ) : (
                <>
                    <StoryHeader
                        setIsManagingStories={setIsManagingStories}
                        setIsEditing={setIsEditing}
                    />
                    <StoryList />
                </>
            )}
        </div>
    )
}
export default Story
