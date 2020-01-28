

 $(function( $ ){
      $.ajax({
        method: "GET",
        url: "/api/orders"
      }).done((resources) => {
        $.ajax({
           method: "GET",
            url: "/api/items"
        }).done ((items) => {
    console.log("check" + resources)
    if(resources[0]){
    let price = 0;
    let totalPrice = 0;
    let data = resources[0].itemsOrdered
    let crop = data.split(",")
    let fixedData = {}
    for (resource of crop){
      if (resource in fixedData){
        fixedData[resource] += 1;
      }
      else {
        fixedData[resource] = 1
      }
    }

    for(let resource in fixedData){

      let name = resource
      let amount = fixedData[resource]
      for(product of items){
        if(resource == product.description){
          price = product.price;
          totalPrice += (price * amount);
        }
      }

      console.log(amount)

      renderOrders(createOrder(resource,amount,price))
    }

    calculateTotalPrice(totalPrice)
  }
  })
});

function createOrder(resource,amount,price){

  if(resource.length > 0){
    let dummy = $("<div></div>");
    $(dummy).addClass("cartItem");
    $(dummy).text(resource);
    let quantity = $("<input></input>")
    $(quantity).attr({
      id: resource + "Cart",
      size: "10",
      class: "itemInputBox",
      type: "number",
      min: "1",
      max: "10",
      value: amount,
      alt: amount

    })

    let numOfPrice = $("<p></p>")
    $(numOfPrice).attr({id: resource+"Price", class:"itemPrice"})
    $(numOfPrice).text(`Cost: $ ${price * amount}`);
    $(dummy).append(quantity)
    $(dummy).append(numOfPrice);
    let deleteOrder = $("<a></a>")
    $(deleteOrder).attr({id: "remove" + resource, href: "#", class: "removeItem"})
    $(deleteOrder).text("Remove Item")
    $(dummy).append(deleteOrder);
    return dummy
  }
  };


function renderOrders(data) {
  if(data){
    data.appendTo($('#cartItems'));
  }
}

function calculateTotalPrice(price){
  $('#totalCost').text(`Total Cost: $ ${price}`)
}

});


