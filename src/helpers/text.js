import { saveAs } from 'file-saver';

/**
 * Download the given lines as a file.
 * @param {string} name - the name of the file
 * @param {string[]} lines - the lines to put in the file
 * @param {string} [type='text/plain;charset=utf-8'] - the mime type of the file
 */
export const downloadAsFile = (name, lines = [], type = 'text/plain;charset=utf-8') => {
    const blob = new Blob([lines.join('\r\n')], { type });
    saveAs(blob, name);
};
