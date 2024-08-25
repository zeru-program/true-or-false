var db = "https://trueorfalse-f0c6d-default-rtdb.firebaseio.com/";
var questionArray = []; // Array untuk menyimpan pertanyaan yang telah diambil
var currentQuestionIndex = 0; // Index pertanyaan saat ini

fetch("backsound.mp3")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.blob();
    })
    .then(blob => {
        document.querySelector(".spinner-container").style.display = "none";
        document.querySelector(".button-start").style.display = "flex";
    })
    .catch(error => {
        console.error(
            "There has been a problem with your fetch operation:",
            error
        );
    });

function startSetup() {
    document.querySelector("#audio-bs").play();
    document.querySelector(".button-start").style.display = "none";
    document.querySelector(".warn-popup").style.display = "flex";
}

function gameStart() {
    document.querySelector(".warn-popup").style.display = "none";
    document.querySelector("main").style.display = "flex";
    document.querySelector(".player-info-container").style.display = "flex";
}

function jumpscare() {
    imgJsArray = ["j1.jpeg", "j2.jpeg", "j3.jpeg", "j4.jpeg", "j5.jpeg"];
    document.querySelector("#audio-js").play();
    const imgJs = document.createElement("img");
    imgJs.src = imgJsArray[Math.floor(Math.random() * imgJsArray.length)];
    imgJs.classList.add("img-js");
    const blinkJs = document.createElement("div");
    blinkJs.classList.add("blink-js");
    document.querySelector("main").append(imgJs);
    document.querySelector("main").append(blinkJs);
    setTimeout(() => {
        document.querySelector(".img-js").remove();
        document.querySelector(".blink-js").remove();
    }, 2300);
}

function modeSelect(mode) {
    document.querySelector(".spinner-container").style.display = "flex";
    document.querySelector(".player-info-container").style.display = "none";
    document.querySelector("main").style.display = "none";

    setTimeout(() => {
        document.querySelector(".spinner-container").style.display = "none";
        document.querySelector(".player-info-container").style.display = "flex";
        document.querySelector("main").style.display = "flex";
        document.querySelector(".mode-con").remove();
        document.querySelector("#img-p").classList.remove("img-p");
        document.querySelector("#img-p").classList.add("img-pb");
        document.querySelector("#question-con").style.display = "flex";

        // Menentukan tingkat kesulitan
        if (mode == 0) {
            getting = "easy";
        } else if (mode == 1) {
            getting = "mid";
        } else if (mode == 2) {
            getting = "hard";
            alert("maaf mode ini belum tersedia");
            location.reload();
        } else if (mode == 3) {
            getting = "extreme";
            alert("maaf mode ini belum tersedia");
            location.reload();
        }

        // Fetch semua pertanyaan dari mode yang dipilih
        fetch(db + getting + ".json")
            .then(res => res.json())
            .then(data => {
                for (let key in data) {
                    questionArray.push(data[key]);
                }
                showRandomQuestion(); // Tampilkan pertanyaan pertama secara acak
            });
    }, 1500);
}

function showRandomQuestion() {
    // Pilih pertanyaan acak dari array dan hapus dari array agar tidak muncul kembali
    currentQuestionIndex = Math.floor(Math.random() * questionArray.length);
    var questionData = questionArray.splice(currentQuestionIndex, 1)[0];

    document.getElementById("question-text").innerHTML = questionData.question;
    document.querySelector(".ipt-true-answer").value = questionData.answer;
}
var pointUserNow = localStorage.getItem("point");
if (pointUserNow) {
  document.getElementById("point").innerText = pointUserNow;
} else {
  document.getElementById("point").innerText = "0";
}
function addPoint() {
    var p = parseInt(document.getElementById("point").innerText);
    var pAdded = p + 2;
    document.getElementById("point").innerText = pAdded;
    localStorage.setItem("point", pAdded);
}

function checkJawaban(ft) {
    var benar = document.querySelector(".ipt-true-answer").value;
    if (ft === benar) {
        alert("Kamu benar, bisa lanjut");
        if (questionArray.length > 0) {
            showRandomQuestion(); // Tampilkan pertanyaan berikutnya
            addPoint();
        } else {
            alert("Semua pertanyaan telah dijawab!");
        }
    } else {
        jumpscare();
    }
}

function reedemShow() {
    alert("akan datang");
}
