const card = document.querySelector('.card-items')
const totalt = document.querySelector('.total')
var dataCart = localStorage.getItem('cartItems')
dataCart = JSON.parse(dataCart);

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    // Đặt thời gian hết hạn của cookie sang quá khứ (1 giây trước đây)
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
console.log(dataCart)


const showCarts = () => {
    let cartLength = dataCart.length
    let total = 0;
    let html = ``;
    allPrice = 0; // Reset total price before re-calculating
    dataCart.forEach(item => {

        total += item.price
        html += `<div class="card product">
      <div class="card-body">
          <div class="row gy-3">
              <div class="col-sm-auto">
                  <div class="avatar-lg bg-light rounded p-1">
                      <img style='width:100%; height: 100%' src="/uploads/${item.image}" alt="" class="img-fluid d-block">
                  </div>
              </div>
              <div class="col-sm">
                  <h5 class="fs-14 text-truncate"><a href="ecommerce-product-detail.html" class="text-dark">${item.name}</a></h5>

      
                 
              </div>
              <div class="col-sm-auto">
                  <div class="text-lg-end">
                      <p class="text-muted mb-1">Item Price:</p>
                      <h5 class="fs-14">$<span id="ticket_price" class="product-price">${item.price} vnđ</span></h5>
                  </div>
              </div>
          </div>
      </div>
      <!-- card body -->
      <div class="card-footer">
          <div class="row align-items-center gy-3">
              <div class="col-sm">
                  <div class="d-flex flex-wrap my-n1">
                      <div>
                          <a onclick="removeFromCart()" href="#" class="d-block text-body p-1 px-2" data-bs-toggle="modal" data-bs-target="#removeItemModal"><i class="ri-delete-bin-fill text-muted align-bottom me-1"></i> Remove</a>
                      </div>
                      <div>
                          <a href="#" class="d-block text-body p-1 px-2"><i class="ri-star-fill text-muted align-bottom me-1"></i> Add Wishlist</a>
                      </div>
                  </div>
              </div>
              <div class="col-sm-auto">
                  <div class="d-flex align-items-center gap-2 text-muted">
                      <div>Total :</div>
                      <h5 class="fs-14 mb-0">$<span class="product-line-price">${item.price}</span></h5>
                  </div>
              </div>
          </div>
      </div>
      <!-- end card footer -->
      </div>`

    });


    card.innerHTML = html;
    totalt.innerHTML = `$${total}`
    document.querySelector('.number').innerHTML = `Your Cart (${cartLength} items)`

};
showCarts()

const removeFromCart = (itemName) => {
    const itemIndex = dataCart.findIndex(item => item.name === itemName);
    dataCart.splice(itemIndex, 1);
    localStorage.setItem('cartItems', JSON.stringify(dataCart));
    showCarts();
};

const apiOrder = 'http://localhost:5500/order'

const thanhtoan = document.querySelector('.thanhtoan')
thanhtoan.addEventListener('click', async (event) => {
    try {
        const cookieUser = getCookie('user');
        const user = JSON.parse(cookieUser);
        const formData = {
            userId: user.email,
            items: dataCart,
        };

        const response = await fetch(`${apiOrder}/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log("hâh")
        alert('Đã thanh toán thành công');

        dataCart = [];
        showCarts();

        localStorage.setItem('cartItems', JSON.stringify(dataCart));
    } catch (error) {
        console.error('thanh toán không thành công:', error);
    }

});