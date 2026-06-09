document.getElementById("orderForm").addEventListener("submit", function(event){

    event.preventDefault();

    alert("Спасибо! Ваша заявка успешно отправлена.");

    this.reset();

});