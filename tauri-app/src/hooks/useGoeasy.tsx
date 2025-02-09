// GoEasyContext.tsx
import {createContext, ReactNode, useContext} from 'react';
// @ts-ignore
import GoEasy from 'goeasy';

export const GoEasyContext = createContext<GoEasy.IGoEasy | null>(null);

export const GoEasyProvider = ({children}: { children: ReactNode }) => {
    const goEasy = GoEasy.getInstance({
        host: 'hangzhou.goeasy.io',
        appkey: 'BC-1eadd97ec64d4f6cb391e3bfc1d84d5f',
        modules: ['pubsub', 'im'],
    });

    return (
        <GoEasyContext.Provider value={goEasy}>
            {children}
        </GoEasyContext.Provider>
    );
};

export const useGoEasy = () => useContext(GoEasyContext);