import fs from 'fs';

const logFile = 'test-log.txt';


export function initializeLogFile() {
    fs.writeFileSync(logFile, '', 'utf8');
}

export function logToFile(message: string) {
    const now = new Date();
    const timestamp = now.toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    fs.appendFileSync(logFile, logMessage + '\n', 'utf8');
}


export function logTestName(testInfo: { title: any; }) {
    console.log(`Test completed: ${testInfo.title}`);
  }