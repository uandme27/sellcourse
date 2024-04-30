const apiUrl = "http://localhost:5500/courses";

async function getdata() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const courses = await response.json();

        let paid = "";
        let free = "";

        courses.forEach(course => {
            if (course.price > 0) {

                paid += `
                <div class="col-sm-6 col-lg-3">
                <div class="card mt-4">
                    <a href="/courses/${course.slug}">
                        <img src="/uploads/${course.image}" class="card-img-top" alt="...">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${course.name}</h5>
                        <p class="card-text">${course.description}</p>
                        <p class="card-price">$${course.price}</p>
                        <a href="/courses/deteil/${course._id}" class="btn btn-primary btn-course">Xem khóa học</a>
                    </div>
                </div>
            </div>
                `;
            } else {
                free += `
                    <div class="col-sm-6 col-lg-3">
                        <div class="card mt-4">
                            <a href="/courses/${course.slug}">
                                <img src="/uploads/${course.image}" class="card-img-top" alt="...">
                            </a>
                            <div class="card-body">
                                <h5 class="card-title">${course.name}</h5>
                                <p class="card-text">${course.description}</p>

                                <a href="/courses/${course.slug}" class="btn btn-primary btn-course">Xem khóa học</a>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        document.querySelector('.paid').innerHTML = paid;
        document.querySelector('.free').innerHTML = free;

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

getdata();
