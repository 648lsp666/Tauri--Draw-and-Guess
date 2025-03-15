import { useEffect, useState } from 'react';
import GoEasy from 'goeasy';

const CURSOR_CHAT_MESSAGE = 'cursor_chat_message';
const MOVING_CURSOR_SPEED = 10; // 示例速度值

const useGoEasy = (roomId, id, name) => {
    const [goEasy, setGoEasy] = useState(null);

    useEffect(() => {
        const initGoEasy = () => {
            const instance = GoEasy.getInstance({
                host: 'hangzhou.goeasy.io', // 替换为您的主机地址
                appkey: "BC-1eadd97ec64d4f6cb391e3bfc1d84d5f", // 替换为您的应用appkey
                modules: ['pubsub']
            });

            instance.connect({
                onSuccess: () => {
                    console.log("GoEasy connect successfully."); // 连接成功
                },
                onFailed: (error) => {
                    console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
                }
            });

            instance.pubsub.subscribe({
                channel: roomId,
                onMessage: (message) => {
                    console.log("Channel:" + message.channel + " content:" + message.content);
                },
                onSuccess: () => {
                    console.log("Channel订阅成功。");
                },
                onFailed: (error) => {
                    console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
                }
            });

            instance.pubsub.publish({
                channel: roomId, // 替换为您自己的channel
                message: JSON.stringify({
                    type: CURSOR_CHAT_MESSAGE,
                    userId: id,
                    userName: name,
                    x: 0,
                    y: 0,
                    speed: MOVING_CURSOR_SPEED,
                }),
                onSuccess: () => {
                    console.log("消息发布成功。");
                },
                onFailed: (error) => {
                    console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
                }
            });

            setGoEasy(instance);
        };

        initGoEasy();

        return () => {
            if (goEasy) {
                goEasy.pubsub.unsubscribe({
                    channel: roomId,
                    onSuccess: () => {
                        console.log("取消订阅成功。");
                    },
                    onFailed: (error) => {
                        console.log("取消订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
                    }
                });

                goEasy.disconnect({
                    onSuccess: () => {
                        console.log("GoEasy disconnect successfully.")
                    },
                    onFailed: (error) => {
                        console.log("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error.content);
                    }
                });
            }
        };
    }, [roomId, id, name]);

    return goEasy;
};

export default useGoEasy;