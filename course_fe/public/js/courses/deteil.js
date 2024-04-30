const apiCourse = "http://localhost:5500/courses";
let courses;
let matchingCourse
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let courseId
const fetchApiCourses = async () => {
    try {
        const response = await fetch(apiCourse);
        courses = await response.json();

        findMatchingCourse();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
    }
};

const findMatchingCourse = () => {
    courseId = document.getElementById('courseId').value;
    console.log("ID khóa học:", courseId);


    matchingCourse = courses.find((course) => course._id === courseId);
    console.log("Khóa học phù hợp:", matchingCourse);

    document.querySelector(".deteil-name").innerHTML = matchingCourse.name
    document.querySelector(".deteil-description").innerHTML = matchingCourse.description
    document.querySelector(".deteil-img").src = `/uploads/${matchingCourse.image}`
};

fetchApiCourses();


// cart
const addToCart = () => {
    const item = {
        name: matchingCourse.name,
        price: matchingCourse.price,
        image: matchingCourse.image,
        id: courseId
    };
    console.log(item);

    const isItemInCart = cartItems.find(cartItem => cartItem.name === matchingCourse.name);
 
    if (!isItemInCart) {
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
 
        alert('Đã thêm sản phẩm vào giỏ hàng:', item);
       
    } else {
        alert('Sản phẩm đã tồn tại trong giỏ hàng:', item);
  
    }
}

