// app.js - تهيئة المحرك
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

async function processMedia(videoFile, audioFile) {
    await ffmpeg.load();
    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));
    ffmpeg.FS('writeFile', 'audio.mp3', await fetchFile(audioFile));

    // دمج الفيديو مع الصوت
    await ffmpeg.run('-i', 'input.mp4', '-i', 'audio.mp3', '-c', 'copy', 'output.mp4');

    const data = ffmpeg.FS('readFile', 'output.mp4');
    return new Blob([data.buffer], { type: 'video/mp4' });
}
