import React from 'react'
import "./chatonline.css"

export default function ChatOnline() {
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className='chatOnlineImg' src="" alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Nicolas</span>
        </div>
    </div>
  )
}
