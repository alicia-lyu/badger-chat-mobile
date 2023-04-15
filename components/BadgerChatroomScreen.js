import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import BadgerChatMessage from "./BadgerChatMessage";

const fetchMessages = async (name) => {
    console.log(name);
    const res = await fetch(`https://cs571.org/s23/hw10/api/chatroom/${name}/messages`, {
        headers: {
            "X-CS571-ID": "bid_30e5ed25e99b26f8f91c",
        }
    })
    const data = await res.json();
    return data.messages
}

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages(props.name).then(messages => {
            // console.log(messages);
            setMessages(messages);
        })
    }, [])

    const handleAddPostModal = () => {
        
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
            <Button title="ADD POST" onPress={handleAddPostModal} />
            <Button title="REFRESH" onPress={handleRefresh} />
        </View>
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