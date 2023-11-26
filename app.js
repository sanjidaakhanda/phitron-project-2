const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/videos/categories`;
  
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
};

const setCategory = async () => {
    const data = await loadCategories();
  
    const menu = document.getElementById("category-menu");

    data.forEach((category) => {
        const li = document.createElement("li");
       
        li.innerHTML = `
        <button class=" btn btn-outline-danger m-3 " onclick="allCategories('${category.category_id}')">
        ${category.category}
    </button> 
        `;
        menu.appendChild(li);
    });
};



// Call setCategory to populate the menu
setCategory();


const allCategories = async(category_id)=>{
    const url =`https://openapi.programming-hero.com/api/videos/category/${category_id}`
    const res = await fetch(url)
    const data = await res.json()
     displayCategories(data.data)
    
    
    };


    const displayCategories = (categories) => {
        const categoriesContainer = document.getElementById("category-field");
        categoriesContainer.innerHTML = ``;
    
        categories.forEach((category) => {
            const categoriesDiv = document.createElement("div");
            categoriesDiv.classList.add('card');
            categoriesDiv.innerHTML = `
            <div style="position: relative;">
                <img src="${category.thumbnail}" alt="${category.title}" class="img-fluid  ">
                <p class="card-text bg-dark text-light p-1" style="position: absolute; bottom: 0; right: 0; margin: 10px; border-radius:10px;">${formatTime(category.others.posted_date)}</p>
                  </div>
                <div class="row g-0 mt-3">
                <div class="col-md-4">
                <img src="${category.authors[0].profile_picture}" alt="${category.title}" class="img-fluid rounded-circle rounded-circle w-50 h-50 ">
                </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${category.title}</h5>
                    <p class="card-text ">${category.authors[0].profile_name}</p>
                    <p class="card-text">${category.others.views} Views</p>
                   
                </div>
            </div>
        </div

        `
            
           
            categoriesContainer.appendChild(categoriesDiv);
        });
    }


    //formatted time
const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}hrs ${mins} minutes ago`;
  };

  
        allCategories(1001);

    