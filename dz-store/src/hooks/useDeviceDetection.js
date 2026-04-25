// useDeviceDetection.js

import { useEffect, useState } from 'react';

const useDeviceDetection = () => {
    const [deviceType, setDeviceType] = useState(() => {
        // Check localStorage first to prevent recalculating device type
        return localStorage.getItem('deviceType') || 'desktop';
    });

    const detectDevice = () => {
        const userAgent = navigator.userAgent;

        if (/android|iphone|ipad|ipod/i.test(userAgent)) {
            return 'mobile';
        } else if (/tablet/i.test(userAgent)) {
            return 'tablet';
        }
        return 'desktop';
    };

    useEffect(() => {
        const currentDevice = detectDevice();
        setDeviceType(currentDevice);
        localStorage.setItem('deviceType', currentDevice);
    }, []);

    return deviceType;
};

export default useDeviceDetection;