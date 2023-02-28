import { useCallback, useState } from 'react';

export const useForceRerender = () => {
    const [, setCount] = useState(0);
    return useCallback(() => setCount((count) => count + 1), []);
}
