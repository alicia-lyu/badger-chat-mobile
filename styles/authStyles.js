import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        display: "flex",
        justifyContent: "center"
    },
    body: {
        flex: 2,
        display: "flex",
        justifyContent: "center"
    },
    footer: {
        flex: 1
    },
    inputContainer: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    },
    inputPrompt: {
        flex: 1,
        textAlign: "center"
    },
    inputBox: {
        flex: 2,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 2
    },
    inputBoxText: {
        color: "#575757"
    }
});

export default authStyles;