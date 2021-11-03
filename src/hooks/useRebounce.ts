import { useEffect } from 'react';
import useDebounce from './useDebounce';
import useToggle from './useToggle';

const useRebounce = (cb: Function, delay: number, dependencies: any[], rebounce: boolean) => {
    const [trigger, Rebounce] = useToggle(false);
    useDebounce(() => { 
        if (rebounce) Rebounce();
        return cb();
    }, delay, [...dependencies, trigger]);
    useEffect(() => Rebounce(), [])
}

export default useRebounce;