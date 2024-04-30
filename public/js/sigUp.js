const apiUsers = 'http://localhost:5500/users'
let users;



const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sig-up')


const container = document.getElementById('container-login');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signIn.addEventListener('click', () => {

    container.style.display = "block"
});
signUp.addEventListener('click', () => {

    container.style.display = "block"
});



const fetchApiUsers = async () => {
    const response = await fetch(apiUsers)
    users = await response.json()
    console.log(users)


}
fetchApiUsers()

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

document.getElementById('formSigup').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('nameUser').value;
    const password = document.getElementById('passwordUser').value;
    const email = document.getElementById('emailUser').value;

    const formSigup = {
        name,
        password,
        email
    }
    console.log(formSigup)
    createUser(formSigup)



});




const createUser = async (formSigup) => {
    try {
        await fetch(`${apiUsers}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formSigup)
        })
        alert('đăng ký thành công')
    } catch (error) {
        console.log(error)
        alert('đăng ký thất bại')

    }

}

const loginUser = async (formLogin) => {
    try {
        const response = await fetch(`${apiUsers}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formLogin)
        })

        alert('đăng nhập thành công')
        location.reload()
        const data = await response.json()


        setCookie('token', data.token)
        const userData = {
            name: data.user.name,
            email: data.user.email
        };
        setCookie('user', JSON.stringify(userData))


    } catch (error) {
        console.log(error)
        alert('đăng nhập thất bại')

    }

}



const login = document.getElementById('formSigin');

login.addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    const formLogin = {
        email,
        password
    }
    loginUser(formLogin)
});


document.querySelector('.close').addEventListener('click', () => {
    container.style.display = 'none'
})



const cookieUser = getCookie('user');
console.log(cookieUser)
if (cookieUser) {
    const user = JSON.parse(cookieUser);
    console.log(user)

    // Cập nhật giao diện với thông tin người dùng
    const avatarContainer = document.querySelector('.avatar');
    console.log(avatarContainer)


    avatarContainer.innerHTML = `
    <div class="dropdown topbar-head-dropdown ms-1 header-item" style=" margin-left: 380px;" >
                    <a href="/cart"><i style="font-size: 36px;" class="bx bx-shopping-bag fs-36"></i>
                       
                    </button></a>
                        
                  
                </div>
        <a href="#">
        <img style='width:40px; height:40px; border: 1px solid black; margin-left:24px' src="/images/avatars/placeholder.png" class="header_widgets_avatar" alt="">
    </a>
    <div uk-drop="mode: click;offset:5" class="header_dropdown profile_dropdown">
        <ul>
            <li>
                <a href="#" class="user">
                    <div class="user_avatar">
                        <img src="/images/avatars/avatar-2.jpg" alt="">
                    </div>
                    <div class="user_name">
                        <div>${user.name}</div>
                        <span>${user.email}</span>
                    </div>
                </a>
            </li>
            <li>
                <hr>
            </li>

            <li>
                <a href="#">
                    <ion-icon name="person-circle-outline" class="is-icon"></ion-icon>
                    My Account
                </a>
            </li>


            <li>
                <a href="#">
                    <ion-icon name="settings-outline" class="is-icon"></ion-icon>
                    Account Settings
                </a>
            </li>
            <li>
                <hr>
            </li>
           
            <li>
                <a href="#" class='logOut'>
                    <ion-icon name="log-out-outline" class="is-icon"></ion-icon>
                    Log Out
                </a>
            </li>
        </ul>
    </div>
        `;

}

const logOut = document.querySelector('.logOut')
logOut.addEventListener('click', () => {
    deleteCookie('user')
    deleteCookie('token')
    location.reload();
}
)



