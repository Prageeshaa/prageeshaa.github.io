var choiceOfDrink = document.getElementsByName("choice_of_drink");
var sizeOfDrink = document.getElementsByName("size_of_drink");
var sugarAddOn = document.getElementById("sugar_for_drink");
var creamAddOn = document.getElementById("cream_for_drink");
var syrupShots = document.getElementById("syrup_for_drink");
var currentOrderSubmitBtn = document.getElementById("submit_current_drink");
var FinalizeOrderSubmitBtn = document.getElementById("submit_order");
const priceOfSmall = 200.00;
const priceOfMedium = 250.00;
const priceOfLarge = 300.00;
const priceOfCream = 50.00;
const priceOfSyrupShot = 25.00;

var orderList = new Array();


for (let x = 0; x < choiceOfDrink.length; x++) {

    choiceOfDrink[x].addEventListener("click", checkForMilk);
    choiceOfDrink[x].addEventListener("click", checkPrice);

}

for (let x = 0; x < sizeOfDrink.length; x++) {
    sizeOfDrink[x].addEventListener("click", checkPrice);
}

creamAddOn.addEventListener("click", addCream);
syrupShots.addEventListener("click", addSyrup);
currentOrderSubmitBtn.addEventListener("click", submitCurrentOrder);
FinalizeOrderSubmitBtn.addEventListener("click", FinalizeOrder);

function checkForMilk() {


    var drinkName = document.querySelector('input[name="choice_of_drink"]:checked').value;
    var childNodes = document.getElementById("choice_container_item2").getElementsByTagName('*');

    if (drinkName == "Latte") {
        for (var node of childNodes) {
            node.disabled = false;
        }

    } else if (drinkName == "Cappuccino") {
        for (var node of childNodes) {
            node.disabled = false;
        }
    } else if (drinkName == "Flat_white") {
        for (var node of childNodes) {
            node.disabled = false;
        }
    } else if (drinkName == "Espresso") {
        for (var node of childNodes) {
            node.disabled = true;
        }
    } else if (drinkName == "Americano") {
        for (var node of childNodes) {
            node.disabled = true;
        }

    }


}

function checkPrice() {


    var sizeOfDrink = document.querySelector('input[name="size_of_drink"]:checked').value;

    if (sizeOfDrink == "Small") {
        document.getElementById("price_of_current_drink").value = priceOfSmall;
    } else if (sizeOfDrink == "Medium") {
        document.getElementById("price_of_current_drink").value = priceOfMedium;
    } else if (sizeOfDrink == "Large") {
        document.getElementById("price_of_current_drink").value = priceOfLarge;
    }
}

function addCream() {
    checkPrice();
    var totalForShots = 0.00;
    var numberOfShots = 0;
    try { //cream is on but  syrup could be on
        var cream = document.querySelector('input[name="cream_for_drink"]:checked').value;


        if (cream == "Extra-Cream") {
            if (document.getElementById("syrup_for_drink").value > 0 || document.getElementById("syrup_for_drink").value == "") {
                numberOfShots = document.getElementById("syrup_for_drink").value;
                totalForShots = numberOfShots * priceOfSyrupShot;
            }

            var x = parseInt(document.getElementById("price_of_current_drink").value);
            document.getElementById("price_of_current_drink").value = x + priceOfCream + totalForShots;

        }

    } catch (execption) //cream is off but  syrup could be on
    {
        checkPrice();
        if (document.getElementById("syrup_for_drink").value > 0 || document.getElementById("syrup_for_drink").value == "") {
            numberOfShots = document.getElementById("syrup_for_drink").value;
            totalForShots = numberOfShots * priceOfSyrupShot;
        }
        var y = parseInt(document.getElementById("price_of_current_drink").value);
        document.getElementById("price_of_current_drink").value = y + totalForShots;
    }

}

function addSyrup() {
    checkPrice();
    var numberOfShots = 0;
    var totalForShots = 0.00;
    try {
        //cream is on and syrup is on
        var cream = document.querySelector('input[name="cream_for_drink"]:checked').value;
        numberOfShots = document.getElementById("syrup_for_drink").value;
        totalForShots = numberOfShots * priceOfSyrupShot;

        if (cream == "Extra-Cream") {
            var x = parseInt(document.getElementById("price_of_current_drink").value);
            document.getElementById("price_of_current_drink").value = x + priceOfCream + totalForShots;
        }

        // var x = parseInt(document.getElementById("price_of_current_drink").value);
        // document.getElementById("price_of_current_drink").value = x + totalForShots;

    } catch (execption) {
        //cream is off syrup is on
        checkPrice();
        numberOfShots = document.getElementById("syrup_for_drink").value;
        totalForShots = numberOfShots * priceOfSyrupShot;
        var y = parseInt(document.getElementById("price_of_current_drink").value);
        document.getElementById("price_of_current_drink").value = y + totalForShots;

    }






}

function submitCurrentOrder() {
    var drinkType = document.querySelector('input[name="choice_of_drink"]:checked');
    var milkChoice = document.querySelector('input[name="choice_of_milk"]:checked');
    var drinkSize = document.querySelector('input[name="size_of_drink"]:checked');
    // var sugar =  document.querySelector('input[name="sugar_for_drink"]:checked');  
    // var cream = document.querySelector('input[name="cream_for_drink"]:checked'); 
    var sugar = document.getElementById("sugar_for_drink");
    var cream = document.getElementById("cream_for_drink");
    var shotsOfSyrup = document.getElementById("syrup_for_drink");
    var price = document.getElementById("price_of_current_drink");

    var tempSugar = "";
    var tempCream = "";

    if (sugar.checked && cream.checked) {
        tempSugar = sugar.value;
        tempCream = cream.value;
    } else {
        if (sugar.checked) {
            tempSugar = sugar.value;

        }
        if (cream.checked) {
            tempCream = cream.value;
        }

        if (!sugar.checked && !cream.checked) {
            tempSugar = "No-Extra-Sugar";
            tempCream = "No-Extra-Cream";
        } else {
            if (!sugar.checked) {
                tempSugar = "No-Extra-Sugar";
            }
            if (!cream.checked) {
                tempCream = "No-Extra-Cream";
            }
        }
    }

    orderList.push({
        drinkType: drinkType.value,
        milkChoice: milkChoice.value,
        drinkSize: drinkSize.value,
        sugar: tempSugar,
        cream: tempCream,
        shotsOfSyrup: shotsOfSyrup.value,
        price: price.value,
        get getAllDetails() {
            return this.drinkType + " - " + this.milkChoice + " - " + this.drinkSize + " - " + this.sugar + " - " + this.cream + " - " + " Syrup:" + this.shotsOfSyrup + " - " + "LKR:" + this.price;
        },
        get getPrice() {
            return this.price;
        }
    });


    var orderDetails = document.getElementById("Order_details");
    orderDetails.append("\n\t");
    orderDetails.append(orderList[(orderList.length - 1)].getAllDetails);


    var finalPrice = 0;
    for (var tempOrder of orderList) {
        finalPrice = parseInt(tempOrder.getPrice) + finalPrice;
    }
    document.getElementById("total_of_order").value = finalPrice;

    //notification
    var popup = document.getElementById("myPopup");
    popup.innerHTML = "Current Order Succefully Submitted!"
    popup.classList.toggle("show");
    setTimeout(() => {
        popup.classList.toggle("show");
    }, 2500);
}

function FinalizeOrder() {
    //notification
    var popup = document.getElementById("myPopup");
    popup.innerHTML = "Thank You For Ordering with us. Please Come again!"
        // popup.style.width="100%";
    popup.classList.toggle("show");
    setTimeout(() => {
        popup.classList.toggle("show");
    }, 3500);
}