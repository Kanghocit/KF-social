import { Button, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const HomePage = () => {
  return (
    <Link to={"/Kang15.8"}>
        <Flex w={"full"} justifyContent={"center"}>
            <Button mx={"auto"}>Visit profile page</Button>
        </Flex>
    </Link>
  )
}

export default HomePage