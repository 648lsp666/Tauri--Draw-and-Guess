import {useEffect, useState} from 'react';
// @ts-ignore
import GoEasy from "goeasy";

const useGoeasy = () => {
    let goEasy;
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        goEasy = GoEasy.getInstance({
            host: 'hangzhou.goeasy.io',
            appkey: 'BC-1eadd97ec64d4f6cb391e3bfc1d84d5f',
            modules: ['pubsub', 'im'],
        });
        // if (goEasy) {
        //     goEasy.connect({
        //         onSuccess: function () {  //连接成功
        //             console.log("GoEasy connect successfully.") //连接成功
        //         },
        //         onFailed: function (error: any) { //连接失败
        //             console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
        //         },
        //         onProgress: function (attempts: any) { //连接或自动重连中
        //             console.log("GoEasy is connecting", attempts);
        //         }
        //     });
        // }
    }, []);

    // const subscribe = (channel) => {
    //     goEasy.current.subscribe({
    //         channel: channel,
    //         onMessage: (message) => {
    //             setMessages((prevMessages) => [...prevMessages, message]);
    //         },
    //         onSuccess: () => {
    //             setSubscribed(true);
    //         },
    //         onFailed: (error) => {
    //             setSubscribeError(error);
    //         },
    //     });
    // };
    //
    // const unsubscribe = (channel) => {
    //     goEasy.current.unsubscribe({
    //         channel: channel,
    //     });
    //     setSubscribed(false);
    // };

    return [goEasy, messages, connected, subscribed];
};

export default useGoeasy;

