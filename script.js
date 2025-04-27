

const menuItems = document.querySelector(".menu-items");

function fetchFoodItems(){
    let foodItems = fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json").then((res) => {
        return res.json();
    }).then((res) => {
        return res;
    });

    return foodItems;
};

async function getMenu(){
    menuItems.innerHTML = "";
    let foodItems = await fetchFoodItems();
    
    foodItems.map((item) => {
        menuItems.innerHTML += 
        `
        <div class="menu-item">
            <img class="food-image" src=${item.imgSrc && "../images/burger.png"} alt="food-item">
            <div style="display: flex; justify-content: space-between; width: 90%;">
                <div>
                    <h4>${item.name}</h4>
                    <h5>$${item.price}/-</h5>    
                </div>
                <img class="pointer" width="30px" src="../assets/add-to-cart-logo.svg" alt="add-to-cart-btn">
            </div>
        </div>
        `   
    })
}

async function takeOrder(){
    let foodItems = await fetchFoodItems();

    return new Promise((res, rej) => {
        setTimeout(() => {

            const shuffled = [...foodItems].sort(() => 0.5 - Math.random());
            const selectedFood = shuffled.slice(0, 3);

            let order = {
                food : selectedFood,
            }

            if(order.food.length > 0){
                res(order);
            } else {
                rej("Order Not Received!");
            };

        }, 2500);
    });
};

function orderPrep(){
    return new Promise((res, rej) => {

        let order = {
            order_status: true, 
            paid: false,
        }

        setTimeout(() => {
            if(order.order_status){
                res(order);
            } else {
                rej("Order Not Prepared.");
            }
        },1500);
    });
};

function payOrder(){
    return new Promise((res, rej) => {

        let order = {
            order_status: true, 
            paid: true,
        };

        setTimeout(() => {
            if(order.paid){
                res(order);
            } else {
                rej("Payment Not Received.");
            }
        },1000);
    });
};

function thankyouFunc () {
    if(payOrder().then((res) => res.paid)){
        alert("Thankyou for eating with us Today!");
    };
};


getMenu();

takeOrder().then((res) => {
    console.log(res);
    return orderPrep();  
}).then((res) => {
    console.log(res);
    return payOrder();
}).then((res) => {
    console.log(res);
    thankyouFunc();
}).catch((error) => {
    console.log(error);
})


