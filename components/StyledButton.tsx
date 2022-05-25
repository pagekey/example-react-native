interface Props {

}

export default function StyledButton(props: Props) {
    return (
        <>
            <View style={props.style}>
                <Button></Button>
            </View>
        </>
    )
}