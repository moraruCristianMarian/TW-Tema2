window.onload = function()
{
    /// =======================================
    /// localStorage, onclick, addEventListener
    /// =======================================
    /// Cand se da click pe una din cele doua imagini de la finalul paginii:
    ///     - daca nu a fost setata deja o imagine de fundal, sau daca cealalta imagine a fost setata, cea pe care s-a apasat va deveni imaginea de fundal
    ///     - daca imaginea de fundal deja setata este cea pe care se face click, se va reveni la imaginea initiala de fundal
    /// Schimbarile la imaginea de fundal sunt facute la reincarcarea paginii.
    changeBackground();
    document.body.addEventListener("keyup", function(event) { if (event.key === 'b') changeBackground(); });
    function changeBackground()
    {
        if ((localStorage.getItem("backgroundImage") != "undefined") && (localStorage.getItem("backgroundImage") != null))
        {
            // Se ia o copie a imaginii cu calitate mai buna.
            let imgName = localStorage.getItem("backgroundImage").replace(".png", "-HD.png");
            document.body.style.background = "url(" + imgName + ")";
    
            // Setarile din CSS care nu sunt salvate
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center center";
            document.body.style.backgroundSize = "cover";
        }
    }

    let backgroundImages = document.getElementsByClassName("bg-img");
    for (backgroundImage of backgroundImages)
        backgroundImage.onclick = function(event)
        {
            var mesaj = "";
            if ((localStorage.getItem("backgroundImage") == undefined) || (localStorage.getItem("backgroundImage").indexOf(this.src) == -1))
            {
                localStorage.setItem("backgroundImage", this.src);
                // Split pentru a afisa doar numele imaginii fara tot restul adresei
                let fisierSplit = this.src.split("/");
                mesaj = "Imaginea de fundal a fost schimbata in " + fisierSplit[fisierSplit.length - 1] + ".\nApasati tasta \"b\" sau reincarcati pagina pentru a afisa modificarile.";
            }
            else
            {
                localStorage.setItem("backgroundImage", undefined);
                mesaj = "Imaginea de fundal a fost resetata la cea initiala.\nReincarcati pagina pentru a afisa modificarile.";
            }

            var bgMesajCheck = document.getElementById("bgMesaj");
            if (bgMesajCheck == null)
            {
                let bgMesaj = document.createElement("p");
                bgMesaj.innerText = mesaj;
                bgMesaj.className = "text";
                bgMesaj.id = "bgMesaj";
                document.body.getElementsByTagName("main")[0].appendChild(bgMesaj);

                // Sterge mesajul cand se face click pe el
                bgMesaj.addEventListener("click", function()
                {
                    document.body.getElementsByTagName("main")[0].removeChild(this);
                });
            }
            else
            {
                bgMesajCheck.innerText = mesaj;
            }
        }


    ///=====
    /// CRUD
    ///=====
    var adminPanel = document.getElementById("adminPanel");
    var butonAutentificare = document.getElementById("butonAutentificare");

    if (localStorage.getItem("adminAutentificat") === "da")
    {
        adminPanel.removeChild(butonAutentificare);
        let lb = document.createElement("br");
        adminPanel.appendChild(lb);

        editorArticole();
    }

    butonAutentificare.onclick = function()
    {
        adminPanel.removeChild(butonAutentificare);

        let nume = document.createElement("input");
        let parola = document.createElement("input");
        nume.placeholder = "Nume";
        parola.type = "password";
        parola.placeholder = "Parola";
        adminPanel.appendChild(nume);
        adminPanel.appendChild(parola);

        let lb = document.createElement("br");
        adminPanel.appendChild(lb);

        let butonEnterDate = document.createElement("button");
        butonEnterDate.id = "butonEnterDate";
        butonEnterDate.innerText = "Confirma";
        adminPanel.appendChild(butonEnterDate);

        butonEnterDate.onclick = function()
        {
            if ((nume.value != "") && (parola.value != ""))
            {
                localStorage.setItem("adminAutentificat", "da");

                adminPanel.removeChild(nume);
                adminPanel.removeChild(parola);
                adminPanel.removeChild(butonEnterDate);

                editorArticole();
            }
            else
            {
                nume.placeholder = "Nume/parola incomplete!";
                nume.value = "";
                parola.value = "";
            }
        }
    }

    function editorArticole()
    {
        adminPanel.innerText = "Editor articole\n-";

        // Adauga buton pentru deautentificare
        let butonDeautentificare = document.createElement("button");
        butonDeautentificare.innerText = "Deautentificare";
        butonDeautentificare.id = "butonDeautentificare";
        butonDeautentificare.onclick = function()
        {
            localStorage.setItem("adminAutentificat", "nu");
            window.location.reload();
        };
        adminPanel.appendChild(butonDeautentificare);


        // Adauga input-urile pentru titlul si imaginea articolului de adaugat/modificat
        let inputTitlu = document.createElement("input");
        inputTitlu.id = "inputTitlu";
        inputTitlu.placeholder = "Titlul articolului";
        adminPanel.appendChild(inputTitlu);

        let inputImagine = document.createElement("input");
        inputImagine.id = "inputImagine";
        inputImagine.placeholder = "Imaginea articolului";
        adminPanel.appendChild(inputImagine);


        // Adauga butoane pentru adaugare, stergere si modificare
        let butonAdaugare = document.createElement("button");
        butonAdaugare.innerText = "Adauga articol";
        butonAdaugare.onclick = adaugaArticol;

        let divStergere = document.createElement("div");
        divStergere.id = "divStergere";
            let butonStergere = document.createElement("button");
            butonStergere.innerText = "Sterge articol cu ID: ";
            butonStergere.onclick = stergeArticol;
            divStergere.appendChild(butonStergere);

            let inputStergere = document.createElement("input");
            inputStergere.type = "text";
            inputStergere.id = "inputStergere";
            inputStergere.placeholder = "ID";
            divStergere.appendChild(inputStergere);

        let divModificare = document.createElement("div");
        divModificare.id = "divModificare";
            let butonModificare = document.createElement("button");
            butonModificare.innerText = "Modifica articol cu ID: ";
            butonModificare.onclick = actualizeazaArticol;
            divModificare.appendChild(butonModificare);

            let inputModificare = document.createElement("input");
            inputModificare.type = "text";
            inputModificare.id = "inputModificare";
            inputModificare.placeholder = "ID";
            divModificare.appendChild(inputModificare);

        adminPanel.appendChild(butonAdaugare);
        adminPanel.appendChild(divStergere);
        adminPanel.appendChild(divModificare);

        // Adauga un timeout care sa creeze butoane ce copiaza ID-ul fiecarui articol in input-urile de stergere si modificare
        var loadDelayID = setTimeout(function()
        {
            let getUUIDs = document.getElementsByClassName("getUUID");
            for (getUUID of getUUIDs)
            {
                getUUID.style.display = "block";
            }
        }, 200);
    }
}