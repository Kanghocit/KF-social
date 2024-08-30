import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
    <>
    <UserHeader/>
    <UserPost likes={1200} replies={481} postImg={"/post1.png"} postTitle={"Post1"}/>
    <UserPost likes={450} replies={81} postImg={"/post2.png"} postTitle={"Post2"}/>
    <UserPost likes={123} replies={41} postImg={"/post3.png"} postTitle={"Post3"}/>
    <UserPost likes={150} replies={48}  postTitle={"Post4"}/>
    

    </>
  )
}

export default UserPage