var currentDogId;
function fetchArticole() {
    let content = document.getElementsByClassName("altele")[0];
    let appendLoading = document.getElementsByClassName("altele")[0];

    let loading = document.createElement("p");
    loading.className = "text";
    loading.innerText = "Se incarca articolele...";
    loading.setAttribute("id", "loading");
    appendLoading.appendChild(loading);

    fetch('http://localhost:3000/articole',
        {
            method:'get'
        }).then(function(response)
        {
            response.json().then((data)=>
            {
                if (data.length)
                    appendLoading.removeChild(loading); 

                for (let i = 0; i < data.length; i++)
                {
                    let articolContainer = document.createElement("p");
                    articolContainer.className = "text articolContainer";
                    content.appendChild(articolContainer);

                    let imagine = document.createElement("img");
                    imagine.className = "art-img";
                    imagine.setAttribute("src", data[i].imagine);
                    imagine.setAttribute("alt", "Imagine articol");
                    imagine.width = 100;

                    let titlu = document.createElement("a");
                    titlu.href = "";
                    titlu.innerText = data[i].titlu;

                    let getUUID = document.createElement("button");
                    getUUID.style.position = "absolute";
                    getUUID.style.display = "none";
                    getUUID.style.right = "15%";
                    getUUID.innerText = "ID";
                    getUUID.className = "getUUID";
                    getUUID.onclick = function()
                    {
                        if (document.getElementById("inputModificare") != null)
                        {
                            document.getElementById("inputModificare").value = data[i].id;
                            document.getElementById("inputStergere").value = data[i].id;
                        }
                    }

                    articolContainer.appendChild(getUUID);
                    articolContainer.appendChild(imagine);
                    articolContainer.appendChild(titlu);


                }   
            })
        });
}

fetchArticole();


function adaugaArticol()
{
    let titlu = document.getElementById("inputTitlu").value;
    let imagine = document.getElementById("inputImagine").value;

    let articolNou = {
        titlu: titlu,
        imagine: imagine
    };

    fetch('http://localhost:3000/articole',
    {
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(articolNou)
    }).then(function(response)
    {
        window.location.reload();
        console.log(response);
    });
}

function actualizeazaArticol()
{
    let titlu = document.getElementById("inputTitlu").value;
    let imagine = document.getElementById("inputImagine").value;

    let articolNou = {
        titlu: titlu,
        imagine: imagine
    };

    let articolActual = document.getElementById("inputModificare").value;

    fetch('http://localhost:3000/articole/' + articolActual,
    {
        method:'put',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(articolNou)
    }).then(function(response)
    {
        window.location.reload();
        console.log(response);
    });
}

function stergeArticol()
{
    let articolActual = document.getElementById("inputStergere").value;

    fetch('http://localhost:3000/articole/' + articolActual,
    {
        method:'delete',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(function(response)
    {
        window.location.reload();
        console.log(response);
    });          
}