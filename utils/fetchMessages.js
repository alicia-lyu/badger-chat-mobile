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

export default fetchMessages;