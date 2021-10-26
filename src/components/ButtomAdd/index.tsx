import {IconButton,Icon, ButtonProps as Chakrabutton} from "@chakra-ui/react"
import  {TiPlus} from "react-icons/ti"

interface ButtonProps extends Chakrabutton {

}

export const ButtonAdd = ({...rest}:ButtonProps) => {
    return (
            <IconButton aria-label="Show modals" colorScheme="white" color="green.300" borderRadius="100%" position="absolute" bottom="25%" right="5%" {...rest} bg="white" zIndex="7">
                <Icon as={TiPlus} fontSize='2xl'/>
            </IconButton>
    )
}