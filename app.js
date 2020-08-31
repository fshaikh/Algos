const S = `my.song.mp3 11b
greatSong.flac 1000b
not3.txt 5b
video.mp4 200b
game.exe 100b
mov!e.mkv 10000b`;

const MUSIC_TYPES = ["mp3", "aac", "flac"];
const IMAGE_TYPES = ["jpg", "bmp", "gif"];
const MOVIE_TYPES = ["mp4", "avi", "mkv"];
function solution(S) {
  // write your code in JavaScript (Node.js 8.9.4)
  // ALGO:
  const musicFiles = [],
    imageFiles = [],
    movieFiles = [],
    otherFiles = [];

  const files = S.split('\n'); // How does this regex work? // /\r?\n/
  files.forEach((file) => {
    const { fileName, fileExtension, fileSize } = getFileMeta(file);
    addToFiles(fileName, fileExtension, fileSize);
  });
  // collate each file type size
  const musicMeta = getFinalFileMeta(musicFiles, "music");
  const imageMeta = getFinalFileMeta(imageFiles, "images");
  const moviesMeta = getFinalFileMeta(movieFiles, "movies");
  const otherMeta = getFinalFileMeta(otherFiles, "other");

  return musicMeta + "\n" + imageMeta + "\n" + moviesMeta + "\n" + otherMeta;
  function addToFiles(fileName, fileExtension, fileSize) {
    if (isMusicType(fileExtension)) {
      musicFiles.push({ fileName, fileSize });
    } else if (isImageType(fileExtension)) {
      imageFiles.push({ fileName, fileSize });
    } else if (isMovieType(fileExtension)) {
      movieFiles.push({ fileName, fileSize });
    } else {
      otherFiles.push({ fileName, fileSize });
    }
  }
}
function getFileMeta(file) {
  const fileDetails = file.split(" ");
  const fileNameAndExtension = fileDetails[0];
  const fileSize = fileDetails[1];

  const dotIndex = fileNameAndExtension.lastIndexOf(".");
  const fileName = fileNameAndExtension.substring(0, dotIndex);
  const fileExtension = fileNameAndExtension.substring(
    dotIndex + 1,
    fileNameAndExtension.length
  );
  return {
    fileName,
    fileExtension,
    fileSize: +fileSize.substring(0, fileSize.length - 1),
  };
}

function isMusicType(fileExtension) {
  return MUSIC_TYPES.includes(fileExtension);
}
function isImageType(fileExtension) {
  return IMAGE_TYPES.includes(fileExtension);
}
function isMovieType(fileExtension) {
  return MOVIE_TYPES.includes(fileExtension);
}

function getFinalFileMeta(files, type) {
  const totalSize = files.reduce((sum, value) => sum + value.fileSize, 0);
  return `${type} ${totalSize}b`;
}

console.log(solution(S));


// function add(a,b){
//     return a + b;
// }

// console.log(add(1,2)); // returns 3

function add(a){
    return function add2(b){
        return function add3(c){
            return a + b + c;
        }
    }
}
console.log(add(1)(2)(3)); // should return 3