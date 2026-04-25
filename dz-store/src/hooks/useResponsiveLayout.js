import { useEffect, useState } from 'react';

const useResponsiveLayout = () => {
    const [layout, setLayout] = useState('desktop');

    const updateLayout = () => {
        const width = window.innerWidth;
        if (width < 768) {
            setLayout('mobile');
        } else if (width >= 768 && width < 1024) {
            setLayout('tablet');
        } else {
            setLayout('desktop');
        }
    };

    useEffect(() => {
        updateLayout(); // Set the initial layout
        window.addEventListener('resize', updateLayout);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    return layout;
};

export default useResponsiveLayout;