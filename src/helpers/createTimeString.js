import React from "react";

function createTimeString(timestamp) {
    const time = new Date(timestamp * 1000);
    return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

export default createTimeString;