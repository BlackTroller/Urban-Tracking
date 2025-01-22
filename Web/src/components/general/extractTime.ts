function extractTimeFromTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    // Extract hours, minutes, and seconds
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
}

export default extractTimeFromTimestamp;