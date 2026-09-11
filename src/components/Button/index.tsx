import { TouchableOpacity, TouchableHighlightProps, Text } from "react-native";
import {styles} from "./button.styles"

//Tipagem
type Props = TouchableHighlightProps & {
    title: string
}

export function Button(props: Props, {...rest}){

    return(
        <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    )
}