import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"
import { styles } from "./filter.styles"
import { FilterStatus } from "@/types/FilterStatus"
import { StatusIcon } from "../StatusIcon"

type Props = TouchableOpacityProps & {
    status: FilterStatus
    isActive: boolean
    size: number
    name?: string
}

export function Filter({status, size, name, isActive, ...rest}: Props){
    return(
        <TouchableOpacity 
            style={[styles.container, {opacity: isActive? 1: 0.5}]} 
            activeOpacity={0.8}
            {...rest}
        >
            <StatusIcon status={status} />
            <Text style={styles.title}>
                {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}              
            </Text>
        </TouchableOpacity>
    )
}
