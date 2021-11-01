import { useEffect } from 'react';
import useTimeout from './useTimeout';

const useDebounce = (cb: Function, delay: number, dependencies: any[]) => {
    const { reset, clear } = useTimeout(cb, delay);
    useEffect(reset, [...dependencies, reset]);
    useEffect(clear, []);
}

export default useDebounce;