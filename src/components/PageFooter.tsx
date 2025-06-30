import React from 'react'

export default function PageFooter() {
  return (
    <div>
        <p className='links'>
            <span className='linkItem'>链接</span>
            <a href="https://www.baidu.com" target='_blank' rel='noreferrer' className='linkItem'>百度</a>
            <a href="https://www.baidu.com" target='_blank' rel='noreferrer' className='linkItem'>百度</a>
        </p>
        <p>© 2022 - Coder Station</p>
        <p>Powered by Create React App</p>
    </div>
  )
}
