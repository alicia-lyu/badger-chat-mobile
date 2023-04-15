import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import BadgerChatMessage from "./BadgerChatMessage";
import BadgerPostModal from "./BadgerPostModal";
import fetchMessages from "../utils/fetchMessages";

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchMessages(props.name).then(messages => {
            // console.log(messages);
            setMessages(messages);
        })
    }, [])

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const handleRefresh = () => {
        setMessages([]);
        fetchMessages(props.name).then(messages => {
            // console.log(messages);
            setMessages(messages);
        })
    }

    return <View style={{ flex: 1 }}>
        <ScrollView>
            {
                messages.map((message) => <BadgerChatMessage
                    created={message.created}
                    title={message.title}
                    poster={message.poster}
                    content={message.content}
                    key={message.id}
                />)
            }
        </ScrollView>
        <View style={styles.rowContainer}>
            <Button title="ADD POST" onPress={toggleModal} />
            <Button title="REFRESH" onPress={handleRefresh} />
        </View>
        <BadgerPostModal toggle={toggleModal} visible={isModalVisible} chatroom={props.name} refresh={handleRefresh}/>
    </View>
}

const styles = StyleSheet.create({
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
});

export default BadgerChatroomScreen;