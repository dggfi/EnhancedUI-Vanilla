import { useEffect } from 'react';
import useTimeout from './useTimeout';
import useToggle from './useToggle';

const useDebounce = (cb: Function, delay: number, dependencies: any[]) => {
    const [trigger, Rebounce] = useToggle(false);

    const { reset, clear } = useTimeout(() => { cb; Rebounce() }, delay);
    useEffect(reset, [...dependencies, reset, trigger]);
    useEffect(clear, []);
}

export default useDebounce;