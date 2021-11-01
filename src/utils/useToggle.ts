import { useState } from 'react';

const useToggle = (defaultValue: boolean): [boolean, Function] => {
    const [value, setValue] = useState<boolean>(defaultValue);

    function toggleValue(truth?: boolean) {
        setValue(currentTruth => truth ?? !currentTruth)
    }

    return [value, toggleValue];
}

export default useToggle;