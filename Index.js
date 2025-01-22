// Simulated user database with roles (for demonstration purposes)
const users = [
    { username: "admin", password: "admin123", role: "admin" }, // Admin user
    { username: "user", password: "password", role: "user" } // Regular user
];

// Function to handle user sign-in
function signIn(username, password) {
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Store login status and role in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role); // Store user role
        // Redirect to main page
        window.location.href = 'index.html';
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// Function to check login status and control visibility
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    if (isLoggedIn === "true") {
        if (role === "admin") {
            // Show upload button if user is admin
            document.getElementById('uploadBtn').style.display = 'block';
        }
        document.getElementById('signOutBtn').style.display = 'block';
    } else {
        document.getElementById('signOutBtn').style.display = 'none';
    }
}

// Function to sign out
function signOut() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    window.location.href = 'sign-in.html';
}

// Function to display uploaded products
function displayProducts() {
    const productsList = document.getElementById('products');
    productsList.innerHTML = ''; // Clear existing products

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const role = localStorage.getItem("role");

    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <p class="product-name">${product.name}</p>
                <p class="product-description">${product.description}</p>
                ${role === "admin" ? `<button onclick="deleteProduct(${index})" class="delete-btn">Delete</button>` : ''}
            </div>
        `;
        productsList.appendChild(li);
    });
}

// Function to upload product (only admin can see this)
function uploadProduct(event) {
    event.preventDefault();

    const role = localStorage.getItem("role");
    if (role !== "admin") {
        alert("Only admins can upload products.");
        return;
    }

    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').files[0];

    if (!productImage) {
        alert("Please upload an image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageSrc = e.target.result;

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name: productName, description: productDescription, image: imageSrc });
        localStorage.setItem('products', JSON.stringify(products));

        document.getElementById('uploadForm').reset();
        closeUploadModal();

        displayProducts();
    };

    reader.readAsDataURL(productImage);
}

// Function to delete a product (only admin can see this)
function deleteProduct(index) {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
        alert("Only admins can delete products.");
        return;
    }

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Show and hide the upload modal (admin only)
function showUploadModal() {
    const role = localStorage.getItem("role");
    if (role === "admin") {
        document.getElementById('uploadModal').style.display = 'block';
    } else {
        alert("Only admins can upload products.");
    }
}

function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

// Event listener for sign-in form
document.getElementById('signInForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    signIn(username, password);
});

// Check login status on page load and display products
window.onload = function() {
    checkLoginStatus();
    displayProducts();
};





const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
    {
        id : 1,
        title : "Fairly Used Ipad",
        price : 400,
        colors : [
            {
                code : "grey",
                img : "assets/ipad.png",
        }
        ]
    },
    {
        id : 2,
        title : "Laptop Power Bank",
        price : 350,
        colors : [
            {
                code : "black",
                img : "assets/lap.png",
        }
        ]
    },
    {
        id : 3,
        title : "Mp3",
        price : 100,
        colors : [
            {
                code : "gray",
                img : "assets/jbl.png",
        }
        ]
    },
    {
        id : 4,
        title : "Headset",
        price : 200,
        colors : [
            {
                code : "blue",
                img : "assets/set.png",
        }
        ]
    },
    {
        id : 5,
        title : "Super Power Bank",
        price : 100,
        colors : [
            {
                code : "black",
                img : "assets/bank.png",
        }
        ]
    }
];

let choosenProducts = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductTitle = document.querySelector(".productTitle");

menuItems.forEach((item, index) => {
    item.addEventListener("click", () =>{
        // FOR SLIDER IMAGE
        wrapper.style.transform = `translateX(${-100 * index}vw)`;

        // FOR CHOOSEN PRODUCT
        choosenProducts = products[index]

        // FOR CHOOSEN TEXT
        currentProductTitle.textContent = choosenProducts.title;

        // FOR CHOOSEN PRICE
        currentProductPrice.textContent = choosenProducts.price + "k";

        // FOR CHOOSEN IMAGE
        currentProductImg.src= choosenProducts.colors[0].img;

    })
})


const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", ()=>{
    payment.style.display = "flex";
});

close.addEventListener("click", ()=>{
    payment.style.display = "none";
});