function submitForm1() {

    document.getElementById("eName").innerHTML = "Please enter your name";
    document.getElementById("eName").style.color = 'yellow';

    document.getElementById("eEmail").innerHTML = "Please enter your email";
    document.getElementById("eEmail").style.color = 'yellow';

    document.getElementById("eSubject").innerHTML = "Please enter the subject";
    document.getElementById("eSubject").style.color = 'yellow';

    document.getElementById("enterEnquiry").innerHTML = "Please enter your message within 500 characters";
    document.getElementById("enterEnquiry").style.color = 'yellow';
}

function submitForm2() {

    document.getElementById("enterName").innerHTML = "Please enter your name";
    document.getElementById("enterName").style.color = 'yellow';

    document.getElementById("enterPhone").innerHTML = "Please enter your contact number";
    document.getElementById("enterPhone").style.color = 'yellow';

    document.getElementById("enterEmail").innerHTML = "Please enter your email";
    document.getElementById("enterEmail").style.color = 'yellow';

    document.getElementById("enterComments").innerHTML = "Please enter the comments within 500 characters";
    document.getElementById("enterComments").style.color = 'yellow';
}

function resetForm1() {

    document.getElementById("eName").innerHTML = "";
    document.getElementById("eEmail").innerHTML = "";
    document.getElementById("eSubject").innerHTML = "";
    document.getElementById("enterEnquiry").innerHTML = "";
}

function resetForm2() {

    document.getElementById("enterName").innerHTML = "";
    document.getElementById("enterPhone").innerHTML = "";
    document.getElementById("enterEmail").innerHTML = "";
    document.getElementById("enterComments").innerHTML = "";
}

//event listener to auto load cart throughtout all web pages
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
  });

var total = 0;
var count = 0;
var total = 0;

//fucntion to add items to cart
function addToCart(p_code,price) {

    total += price;
    count +=1;
    var li = document.createElement("LI");
    var span = document.createElement("SPAN");
    const classListLI = li.classList;
    classListLI.add("list-group-item","d-flex","justify-content-between","align-items-center");
    const classListSpan = span.classList;
    classListSpan.add("badge","bg-primary","rounded-pill");
    li.innerText = p_code;
    span.innerText = "$"+price;
    var parent = document.getElementById("cart");
    parent.appendChild(li);
    li.appendChild(span);
    document.getElementById("total").innerHTML = "$"+total;
    document.getElementById("addItems").innerHTML = count;

    localStorage.setItem("localCart", document.getElementById("cart").innerHTML);
    localStorage.setItem("localCartNum",document.getElementById("addItems").innerHTML);
    localStorage.setItem("cartValue",total);
}

//function to reset the cart
function resetCart() {
    document.getElementById("cart").innerHTML = "";
    document.getElementById("total").innerHTML = "";
    total = 0;
    count = 0;
    document.getElementById("addItems").innerHTML = 0;
    localStorage.setItem("localCart", "");
    localStorage.setItem("localCartNum",0);
    localStorage.setItem("cartValue",0);
}

//function to auto load cart throughtout all web pages
function loadCart() {

    document.getElementById("cart").innerHTML = localStorage.getItem("localCart");
    document.getElementById("addItems").innerHTML = localStorage.getItem("localCartNum");
    document.getElementById("total").innerHTML = "$"+localStorage.getItem("cartValue")
    count = parseInt(document.getElementById("addItems").innerHTML);
    total = parseInt(localStorage.getItem("cartValue"));
}