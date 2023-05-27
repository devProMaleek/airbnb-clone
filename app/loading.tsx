import React from 'react'
import Loader from './components/Loader'

type Props = {}

const Loading = (props: Props) => {
  return (
    <>
      <div className="">
        <Loader />
      </div>
    </>
  )
}

export default Loading