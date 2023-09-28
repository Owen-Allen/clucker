import React from 'react'
import { Button } from './ui/button'


interface FollowButtonProps {
    isFollowing: boolean,
    followHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
  }
  
export default function FollowButton({isFollowing, followHandler} : FollowButtonProps) {

    if(isFollowing){
     return <Button className="w-24 bg-blue-200 text-black hover:bg-blue-200 disabled:pointer-events-none" id='following' onClick={followHandler}> Following </Button>
    }
     return <Button className="w-24 bg-blue-700 text-white hover:bg-blue-700 disabled:pointer-events-none" id='follow' onClick={followHandler}> Follow </Button>

}
