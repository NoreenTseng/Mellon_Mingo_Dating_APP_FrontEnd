import React from 'react'
import { Swiper } from 'antd-mobile'
const MatchSwiper = ({ imgUrls }) => {
    return (
        <div className="mt-3">
            <Swiper>
                {imgUrls.map((url, index) => (
                    <Swiper.Item key={index}>
                        <div
                            style={{
                                backgroundImage: 'url(' + url + ')',
                            }}
                            className="card w-full"
                        ></div>
                    </Swiper.Item>
                ))}
            </Swiper>
        </div>
    )
}
export default MatchSwiper
