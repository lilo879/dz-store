import React, { useState } from 'react';

const DeviceSettings = () => {
    const [deviceType, setDeviceType] = useState('mobile');

    const handleDeviceChange = (event) => {
        setDeviceType(event.target.value);
    };

    return (
        <div>
            <h1>Select Device Type</h1>
            <select onChange={handleDeviceChange} value={deviceType}>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
                <option value="desktop">Desktop</option>
            </select>
            <p>Selected Device: {deviceType}</p>
        </div>
    );
};

export default DeviceSettings;