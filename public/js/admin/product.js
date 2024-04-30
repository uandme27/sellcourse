const apiCourses = 'http://localhost:5500/courses'
let courses
let courseIdd
let courseId;
const courseIdElement = document.getElementById('courseId');
if (courseIdElement) {
    courseId = courseIdElement.dataset.courseId || undefined;
} else {
    courseId = undefined;
}
console.log(courseId)

const fetchApiCourses = async () => {
    const response = await fetch(apiCourses)
    courses = await response.json()
    console.log(courses)

    showProduct()
}




const showProduct = () => {
    const dateString = "2023-11-15T16:50:56.422+00:00";
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0
    const day = dateObject.getDate();
    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();


    let html = ''
    courses.forEach(course => {
        html += `
        <tr class="gridjs-tr">
            <td data-column-id="#" class="gridjs-td">
            <span><div class="form-check checkbox-product-list">
        		<input class="form-check-input" type="checkbox" value="1" id="checkbox-1">					<label class="form-check-label" for="checkbox-1"></label>				  </div></span></td><td data-column-id="product" class="gridjs-td"><span><div class="d-flex align-items-center"><div class="flex-shrink-0 me-3"><div class="avatar-sm bg-light rounded p-1"><img src="/uploads/${course.image}" alt="" class="img-fluid d-block"></div></div><div class="flex-grow-1"><h5 class="fs-14 mb-1"><a href="apps-ecommerce-product-details.html" class="text-dark">${course.name}</a></h5><p class="text-muted mb-0">Category : <span class="fw-medium">Fashion</span></p></div></div></span></td><td data-column-id="stock" class="gridjs-td">12</td><td data-column-id="price" class="gridjs-td"><span>${course.price}đ</span></td><td data-column-id="orders" class="gridjs-td">${course._id}</td><td data-column-id="rating" class="gridjs-td"><span><span class="badge bg-light text-body fs-12 fw-medium"><i class="mdi mdi-star text-warning me-1"></i>4.2</span></span></td><td data-column-id="published" class="gridjs-td"><span>${course.updatedAt}</span></td><td data-column-id="action" class="gridjs-td"><span><div class="dropdown"><button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="ri-more-fill"></i></button><ul class="dropdown-menu dropdown-menu-end"><li><a class="dropdown-item" href="apps-ecommerce-product-details.html"><i class="ri-eye-fill align-bottom me-2 text-muted"></i> View</a></li><li><a class="dropdown-item edit-list" data-edit-id="${course._id}" href="editProduct"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</a></li><li class="dropdown-divider"></li><li><a class="dropdown-item remove-list" href="#"  data-bs-toggle="modal"  onclick="deleteCourse('${course._id}')"><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete</a></li></ul>
                            </div></span>
            </td>
        </tr>
        `

    })
    document.querySelector('.gridjs-tbody').innerHTML = html

    function handleEditButtonClick(event) {
        const editButton = event.target.closest('.edit-list');
        if (editButton) {
            event.preventDefault();
            courseIdd = editButton.getAttribute('data-edit-id'); // Gán giá trị courseId
            if (courseIdd) {
                // Chuyển hướng đến trang sửa với ID của sản phẩm
                window.location.href = `/admin/product/editProduct/${courseIdd}`;
            } else {
                console.error('Không có ID khóa học để sửa');
            }
        }
    }

    document.querySelector('.gridjs-tbody').onclick = handleEditButtonClick;

}
const deleteCourse = async courseId => {
    const response = await fetch(`${apiCourses}/${courseId}`, {
        method: 'DELETE',
    }
    )
    if (response.ok) {
        console.log('Xóa khóa học thành công');
        location.reload();

    } else {
        // Nếu có lỗi, xử lý lỗi ở đây

    }
}
fetchApiCourses()

const createCourse = async (formData) => {
    
    // Gửi yêu cầu POST đến máy chủ
    const response = await fetch(`${apiCourses}/post`, {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
       
        // Nếu thành công, làm mọi điều bạn muốn ở đây (ví dụ: làm mới danh sách khóa học)
        fetchApiCourses(); // Làm mới danh sách khóa học sau khi thêm mới
        // window.location.href = '/admin/product';
    } else {
        // Nếu có lỗi, xử lý lỗi ở đây
        console.error('Thêm khóa học không thành công');
        console.log(formData)
        console.log(response)
        

    }
}

const editCourse = async (courseId, formData) => {





    const response = await fetch(`${apiCourses}/edit/${courseId}`, {
        method: 'PUT',
        body: formData
    });

    if (response.ok) {
        alert('Sửa khóa học thành công');
        fetchApiCourses(); // Làm mới danh sách khóa học sau khi sửa
    } else {
        console.error('Sửa khóa học không thành công');
        console.log(response);
        console.log(formData);
        console.log(courseId);

    }
};


// Thêm một trình lắng nghe sự kiện cho sự kiện gửi form
// ... (mã hiện tại)

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();


    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').files[0];

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('image', image)

    console.log(formData)

    const currentURL = window.location.href;
    if (currentURL.includes('addProduct')) {

        createCourse(formData);
        
    } else if (currentURL.includes('editProduct')) {
        console.log('hâ')
        editCourse(courseId, formData);

    }
});



