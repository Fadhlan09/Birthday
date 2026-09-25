const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwCVyJbP1OuZa6uYMsagPKZRew2ch5u9nVr5-9I28IbxxAbOZ_3vvYIxwJnTqVCsazT/exec";


function openForm() {
    document
        .getElementById("messageModal")
        .classList.add("active");
}


function closeForm() {
    document
        .getElementById("messageModal")
        .classList.remove("active");
}


// Tutup modal jika klik di luar kotak
document
    .getElementById("messageModal")
    .addEventListener("click", function (event) {

        if (event.target === this) {
            closeForm();
        }

    });


// Form ucapan
document
    .getElementById("birthdayForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const nama =
            document
                .getElementById("nama")
                .value
                .trim();

        const ucapan =
            document
                .getElementById("ucapan")
                .value
                .trim();

        const button =
            document
                .getElementById("sendButton");

        const success =
            document
                .getElementById("successMessage");


        // Cek input
        if (!nama || !ucapan) {
            alert("Nama dan ucapan harus diisi!");
            return;
        }


        button.disabled = true;
        button.innerText = "Mengirim...";


        // Buat iframe tersembunyi
        const iframe = document.createElement("iframe");

        iframe.name = "hidden_iframe";
        iframe.style.display = "none";

        document.body.appendChild(iframe);


        // Buat form sementara
        const form = document.createElement("form");

        form.method = "POST";
        form.action = SCRIPT_URL;
        form.target = "hidden_iframe";
        form.style.display = "none";


        // Input nama
        const inputNama =
            document.createElement("input");

        inputNama.type = "hidden";
        inputNama.name = "nama";
        inputNama.value = nama;


        // Input ucapan
        const inputUcapan =
            document.createElement("input");

        inputUcapan.type = "hidden";
        inputUcapan.name = "ucapan";
        inputUcapan.value = ucapan;


        form.appendChild(inputNama);
        form.appendChild(inputUcapan);

        document.body.appendChild(form);


        // Kirim ke Apps Script
        form.submit();


        // Tampilkan berhasil
        setTimeout(function () {

            success.style.display = "block";

            document
                .getElementById("birthdayForm")
                .reset();

            button.innerText = "Terkirim ❤️";


        }, 500);


        // Tutup form
        setTimeout(function () {

            closeForm();

            success.style.display = "none";

            button.disabled = false;

            button.innerText = "Kirim Ucapan ❤️";


            form.remove();
            iframe.remove();

        }, 2500);

    });