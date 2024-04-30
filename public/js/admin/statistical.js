const totalSale = document.querySelector('.total-sale')
let orders
const apiOrder = 'http://localhost:5500/order'

const fetchApiOrder = async () => {
    const response = await fetch(apiOrder)
    if(response.ok){
        console.log('thanh cong')
    }
    orders = await response.json();
    getTotalSale()
    showOrder()
}

const getTotalSale = () => {
    let total = 0
    orders.forEach(order => {
        total += order.totalAmount
    });
    console.log(total)
    totalSale.innerHTML = `$${total}`

    document.querySelector('.total-order').innerHTML = orders.length
}

fetchApiOrder()

const showOrder = () => {
    let html =``
    orders.forEach((order, index) => {
        html += `
        <tr>
        <th scope="row">${index+1}</th>
        <td>${order.userId}</td>
        <td>${order.orderDate}</td>
        <td><a onclick="showDetail(${index})" href="#">view</a></td>
      </tr>
        `
    });

    document.querySelector('.order').innerHTML = html
}

const showDetail = (index) => {
    const order = orders[index];
    console.log(orders)
    console.log(order)
    

    let detailHtml = `<h3>order deitel #${index + 1}</h3>`;
    order.items.forEach((item) => {
        detailHtml += `
        <div class="card-body">
                                                                <div class="row gy-3">
                                                                    <div class="col-sm-auto">
                                                                        <div class="avatar-lg bg-light rounded p-1">
                                                                            <img src="/uploads/${item.image}" alt=""
                                                                                class="img-fluid d-block">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm">
                                                                        <h5 class="fs-14 text-truncate"><a
                                                                                href="#"
                                                                                class="text-dark">${item.courseId}</a></h5>
                                                                       


                                                                    </div>
                                                                    <div class="col-sm-auto">
                                                                        <div class="text-lg-end">
                                                                            <p class="text-muted mb-1">Item Price:</p>
                                                                            <h5 class="fs-14">$<span id="ticket_price"
                                                                                    class="product-price">${item.price}</span>
                                                                            </h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
        `;
    });

    // Hiển thị chi tiết đơn hàng
 

    const html1 = ` <div class="container-fluid">
    <div class="row mb-3" style="padding-top: 20px;">
        <div class="col-xl-8">
            <div class="row align-items-center gy-3 mb-3">
                <div class="col-sm">
                    <div>
                        <h5 class="number fs-14 mb-0"></h5>
                    </div>
                </div>

            </div>

            <div class="card-items">
                <div id="orderDetailContainer" class="card product">
                    
                    
                    <!-- card body -->
                    <div class="card-footer">
                        <div class="row align-items-center gy-3">
                            <div class="col-sm">
                                <div class="d-flex flex-wrap my-n1">

                                </div>
                            </div>
                            <div class="col-sm-auto">
                                <div
                                    class="d-flex align-items-center gap-2 text-muted">
                                    <div>Total :</div>
                                    <h5 class="fs-14 mb-0">$<span
                                            class="product-line-price">239.98</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end card footer -->
                </div>
            </div>
            
            <!-- end card -->




        </div>
        <!-- end col -->

        <table class="table table-borderless mb-0">
            <tbody>


                <tr class="table-active">
                    <th>Total (USD) :</th>
                    <td class="text-end">
                        <span class="total fw-semibold" id="cart-total">
                            $${order.totalAmount}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- end row -->
</div>`
    document.getElementById('myPieChart').innerHTML = html1
    const orderDetailContainer = document.getElementById('orderDetailContainer');
    orderDetailContainer.innerHTML = detailHtml;
}





