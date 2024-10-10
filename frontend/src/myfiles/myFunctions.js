let data = [
    'curious which components explicitly require our javascript and popper navs',
    'with the tab plugin for toggling content panes system now fact eye some again',
    'do need for own think may and voluptates ex maiores animi aims to minimum word',
    'of styles to make a layout work the much at there around you they part may use',
    'navs with the tab plugin for toggling behavior a layout navigation with the tab plugin',
    'scrollspy for scroll behavior and navigation updates iure voluptates know',
    'ex a layout problem aims with the tab plugin content panes work and updates',
    'aims a layout work to apply the bare minimum of styles to make a layout',
    'work the navigation updates scroll behavior aims work maiores apply the bare',
    'when an unknown printer took a galley of type and scrambled it to make',
    'do like small play however can as then in ask up home feel few problem',
    'a type specimen book updates iure apply the of styles against great help'
];
var arr = [];
let j = 0;
let para = '', errors = 0;
let isFirst = true;
let startTime = null;

let t1 = 0, n;
let timeId;
var answer = {};

// set all default values
function Restart() {
    getTimeValue();
    isFirst = true;
    errors = 0;
    j = 0;
    t1 = 0;
    for (let i = 0; i < para.length; i++) {
        let t1 = document.getElementById('txt' + i);
        t1.style.color = 'white';
    }
    para = '';
}

// display the text
function display() {

    let ind = parseInt(Math.random() * data.length);
    arr = [...data[ind]];
    let i = 0;
    let formatedData = arr.map((ele) => {
        return <span id={"txt" + i++} className="mytxt">{ele}</span>
    });
    return formatedData;
}

// to check if pressed key is right or not
function Check(e) {

    if (para.length < arr.length) {
        let c1 = e.key;
        let c2 = document.getElementById("txt" + j);

        if (e.key == "Backspace") {
            j--;
            c2 = document.getElementById('txt' + j);
            c2.style.color = 'white';
            para = para.substring(0, para.length - 1);
        }
        else {
            if (c1 == c2.innerText) {

                // if typed char is correct
                c2.style.color = 'rgb(42, 255, 42)';

            } else {
                errors++;
                // if typed char is not correct
                c2.style.color = 'rgb(231, 26, 26)';
            }
            para += c1;
            j++;
        }
    }

    if (para.length >= arr.length) {
        return 'end';
    }

}

// for Normal Mode
function TestNormalMode(e) {
    if (isFirst) {
        startTime = Date.now();
        isFirst = false;
    }

    let obj = Check(e);
    if (obj === 'end') {
        let ans = ShowResult(startTime);
        return ans;
    }
}

function ShowResult(startTime) {
    let endTime = Date.now();

    // calcultaing speed
    let totalTime = (endTime - startTime) / (1000 * 60); // in minutes
    let totlalWords = (para.split(" ")).length; // words typed

    // calculation accuracy

    let acc = ((arr.length - errors) / arr.length) * 100;
    acc = parseInt(acc);

    let speed = parseInt(totlalWords / totalTime); // words/ minutes
    alert("Your typing speed is = " + speed + "  wpm and accuracy = " + acc + "%");

    var obj = { "speed": speed, "accuracy": acc };
    Restart();
    return obj;
}

    // for Time Mode

// to get value of radio btn
function getTimeValue() {
    if (timeId !== undefined) {
        clearInterval(timeId);
        isFirst = true;
        display();
    }

    let timeValues = document.getElementsByName("time"); // array of object
    for (let i = 0; i < timeValues.length; i++) {
        if (timeValues[i].checked) {
            document.getElementById('displayTime').innerHTML = timeValues[i].value;
            return timeValues[i].value;
        }
    }
}

// display decresing time
function timeDecrement() {
    console.log("n = " + n);

    let displayTime = document.getElementById('displayTime');
    t1 = parseInt(displayTime.innerText);
    t1--;
    displayTime.innerText = t1;
    if (t1 < 1) {
        clearInterval(timeId);
        timeId = null;
        ShowTimeResult(para, n);
    }
}

// test time mode
function TestTimeMode(e) {
    if (isFirst) {
        n = getTimeValue();
        timeDecrement();
        timeId = setInterval(timeDecrement, 1000);
        startTime = parseInt(Date.now());
        isFirst = false;
    }
    Check(e);
    if (timeId === null) {
        return answer;
    }
}

function ShowTimeResult(para, AllTime) {
    let words = para.split(' ');

    let speed = parseInt((words.length) / (AllTime / 60));
    let acc = parseInt(((para.length - errors) / para.length) * 100);

    alert("Your typing speed is: " + speed + " Words/Minute and accuracy is " + acc + "%");
    answer = { "speed": speed, "accuracy": acc };
    
    Restart();
    return answer;
}

export { display, TestNormalMode, getTimeValue, TestTimeMode, Restart };