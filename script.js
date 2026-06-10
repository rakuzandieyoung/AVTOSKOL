document.getElementById("orderForm").addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.querySelector('input[type="text"]').value;
    const phone = document.querySelector('input[type="tel"]').value;
    const service = document.querySelector('select').value;
    const comment = document.querySelector('textarea').value;

    const message =
`Здравствуйте!

Имя: ${name}
Телефон: ${phone}
Услуга: ${service}

Комментарий:
${comment}`;

    const whatsappUrl =
`https://wa.me/77788811124?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

});
