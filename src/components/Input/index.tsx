import { TextInput, TextInputProps } from "react-native"
import { styles } from "./input.styles"

export function Input({...rest}: TextInputProps){
    return(
        <TextInput style={styles.container} {...rest} />
    )
}