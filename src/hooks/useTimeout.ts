import { useCallback, useEffect, useRef } from 'react';

const useTimeout = (cb: Function, delay: number) => {
    const callbackRef = useRef(cb);
    const timeoutRef = useRef(null);

    useEffect(() => {
        callbackRef.current = cb;
    }, [cb])

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
    }, [delay]);

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        set();
        return clear;
    }, [delay, set, clear])

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]);

    return { reset, clear };
}

export default useTimeout;