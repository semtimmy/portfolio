function getTruth()
{
    $.ajax({
        url:"truths.txt",
    })
    .done(function(data) {
        var lines = data.split('\n');
        var truth = lines[Math.floor(Math.random()*lines.length)]
        getLie(truth)
    });
}

function getLie(truth)
{
    $.ajax({
        url:"lies.txt",
    })
    .done(function(data) {
        var lines = data.split('\n');
        var lie = lines[Math.floor(Math.random()*lines.length)]
        pushTitle(truth, lie);
    });
}

function pushTitle(truth, lie)
{
    document.getElementById("score").textContent = document.cookie;
    let answerOne = document.getElementById("answer1");
    let answerTwo = document.getElementById("answer2");

    if(Math.random() > 0.5)
    {
        answerOne.textContent = truth;
        answerTwo.textContent = lie;
        answer = 1;
    }
    else
    {
        answerOne.textContent = lie;
        answerTwo.textContent = truth;
        answer = 2;
    }
}

$(document).ready(function setTitles() 
{
    getTruth() // gets truth, then lie, and pushes after. all done in get truth function. i dont get async functions :)
})

function updateHistory(correct)
{
    let answerOne = document.getElementById("answer1");
    let answerTwo = document.getElementById("answer2");
    let historyCont = document.getElementById("historyCont");

    let historyItem = document.createElement("div");
    historyItem.classList.add("historyItem");

    if (answer == 1)
    {
        historyReal = document.createElement("a");
        historyReal.textContent = "Real: " + answerOne.textContent;
        historyReal.setAttribute("href", "https://www.google.com/search?q=" + answerOne.textContent);
        historyReal.setAttribute("target", "_blank");

        historyFake = document.createElement("a");
        historyFake.textContent = "Fake: " + answerTwo.textContent;
 
        historyItem.appendChild(historyReal);
        historyItem.innerHTML += "<br>";
        historyItem.appendChild(historyFake);
    }
    else
    {
        historyReal = document.createElement("a");
        historyReal.textContent = "Real: " + answerTwo.textContent;
        historyReal.setAttribute("href", "https://www.google.com/search?q=" + answerTwo.textContent);
        historyReal.setAttribute("target", "_blank");

        historyFake = document.createElement("a");
        historyFake.textContent = "Fake: " + answerOne.textContent;
 
        historyItem.appendChild(historyReal);
        historyItem.innerHTML += "<br>";
        historyItem.appendChild(historyFake);
    }

    if (correct)
    { historyItem.classList.add("correct"); }
    else
    { historyItem.classList.add("incorrect"); }

    historyCont.insertBefore(historyItem, historyCont.firstChild);
}

function guessButton(guess) //if answer = 1, guess should also be one, etc.
{
    if(guess == answer)
    {
        document.cookie = parseInt(document.cookie, 10) + 1;
        updateHistory(true)
    }
    else
    {
        document.cookie = 0;
        updateHistory(false)
    }
    getTruth()
}