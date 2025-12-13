let imgContainer = document.querySelector(".img-container")
let displayPhonkImg = document.querySelector(".img-container img")
let voiceJif = document.querySelector(".voice")
let displayPhonkName = document.querySelector(".phonk-name")
let audioRange = document.querySelector(".audio-range")
let volumeRange = document.querySelector(".volume-range")
let controlBtns = document.querySelectorAll(".audio-controls-btns button")
let muteVolume = document.querySelector(".volume-range-container span")

let currIndex = 0
let songPlaying = false
let audioTrack = document.createElement("audio")

let songsArr = [
    {
        phonkName : "Phonk 01",
        phonkImg : "Phonk Images/Phonk-01 image.webp",
        phonkPath : "Phonks/Phonk-01.mp3"
    },
    {
        phonkName : "Phonk 02",
        phonkImg : "Phonk Images/Phonk-02 image.webp",
        phonkPath : "Phonks/Phonk-02.mp3"
    },
    {
        phonkName : "Phonk 03",
        phonkImg : "Phonk Images/Phonk-03 image.webp",
        phonkPath : "Phonks/Phonk-03.mp3"
    },
    {
        phonkName : "Phonk 04",
        phonkImg : "Phonk Images/Phonk-04 image.webp",
        phonkPath : "Phonks/Phonk-04.mp3"
    },
    {
        phonkName : "Phonk 05",
        phonkImg : "Phonk Images/Phonk-05 image.webp",
        phonkPath : "Phonks/Phonk-05.mp3"
    }
]


function loadAudioTrack(idx){
    displayPhonkName.textContent = songsArr[idx].phonkName
    audioTrack.src = songsArr[idx].phonkPath
    let imgSrc = songsArr[idx].phonkImg
    displayPhonkImg.src = imgSrc
}
loadAudioTrack(currIndex)

audioTrack.addEventListener("ended", () => {
    voiceJif.classList.remove("voiceDisplay")
    imgContainer.classList.remove("imgContainerAnimation")
    document.querySelector(".play-pause-btn").innerHTML = "&#9654;"
    songPlaying = false
})


setInterval(() => {
    audioRange.max = audioTrack.duration
    audioRange.value = audioTrack.currentTime
    audioTrack.autoplay
}, 1000);

function audioRangeFun(){
    audioTrack.currentTime = audioRange.value
}
audioRange.addEventListener("input" , audioRangeFun)


function volumeHandlerFun(){
    audioTrack.volume = volumeRange.value / 100
    if(audioTrack.volume === 0){
        muteVolume.style.textDecoration = "line-through"
    }
    else{
        muteVolume.style.textDecoration = "none"
    }
}
volumeRange.addEventListener("input" , volumeHandlerFun)



controlBtns.forEach((btns)=>{
    btns.addEventListener("click" , ()=>{

       if(btns.classList.contains("next-btn")){
        currIndex++
        if(currIndex >= songsArr.length){
            currIndex = 0
        }
        loadAudioTrack(currIndex)
        audioTrack.play()
        songPlaying = true
        audioRange.value = 0
        document.querySelector(".play-pause-btn").innerHTML = "&#10073;&#10073;"
        imgContainer.classList.add("imgContainerAnimation")
        voiceJif.classList.add("voiceDisplay")
        }

        else if(btns.classList.contains("previous-btn")){
            currIndex--
            if(currIndex < 0){
                currIndex = songsArr.length - 1
            }
            loadAudioTrack(currIndex)
            audioTrack.play()
            songPlaying = true
            document.querySelector(".play-pause-btn").innerHTML = "&#10073;&#10073;"
            imgContainer.classList.add("imgContainerAnimation")
            voiceJif.classList.add("voiceDisplay")
        }

        else if(btns.classList.contains("play-pause-btn")){
            if(songPlaying === true){
                songPlaying = false
                audioTrack.pause()
                document.querySelector(".play-pause-btn").innerHTML = "&#9654;"
                imgContainer.classList.remove("imgContainerAnimation")
                voiceJif.classList.remove("voiceDisplay")
            }
            else{
                
                songPlaying = true
                audioTrack.play()
                document.querySelector(".play-pause-btn").innerHTML = "&#10073;&#10073;"
                imgContainer.classList.add("imgContainerAnimation")
                voiceJif.classList.add("voiceDisplay")
            }
        }

    })
})

document.addEventListener("keydown", (e) => {
  if(e.code === "Space"){
    e.preventDefault();
    document.querySelector(".play-pause-btn").click();
  }
    if(e.code === "ArrowRight"){
        document.querySelector(".next-btn").click();
    }
if(e.code === "ArrowLeft"){
    document.querySelector(".previous-btn").click();
  }
});



