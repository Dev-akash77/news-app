let maindata = document.querySelector('.data_cont');
let search = document.querySelector('.search');
let input = document.querySelector('input');
let tech = document.querySelector('.technology');
let coding = document.querySelector('.coding');
let education = document.querySelector('.education');
let api = "https://newsapi.org/v2/everything?q=";
let key = "082da951d8a84e7c956411370691a377";

// Function to fetch and show news
async function shownews(query) {
    let response = await fetch(`${api}${query}&apiKey=${key}`);
    let data = await response.json();
    showNews(data.articles);
}

// Function to display news
function showNews(data) {
    maindata.innerHTML = ''; // Clear previous data
    data.forEach((article) => {
        if (!article.urlToImage) {
            return;
        }
        let date = new Date(article.publishedAt).toLocaleString('en-us', {
            timeZone: 'Asia/Jakarta'
        });
        let main_data = document.createElement('div');
        main_data.classList.add('data');
        main_data.innerHTML = `
        <div class="image_main">
            <img src="${article.urlToImage}" alt="news image">
        </div>
        <p class="headline_para">${article.title}</p>
        <p class="news_date">${article.source.name}: ${date}</p>
        <p class="news_article">${article.description}</p>
        <button class="preview">
                    <i class="fa-solid fa-eye"></i>
                    <a href="${article.url}" target="_blank">Preview</a>
                    </button>
        `;
        maindata.appendChild(main_data);
    });
}

let ca=null;
function navdata(id){
    shownews(id);
    let nav = document.querySelector(`.${id}`);
    if(ca!=null){
        ca.classList.remove('active');
    }
    ca =nav
    ca.classList.add('active')
}
// Event listeners for category buttons
tech.addEventListener('click', () => {
    navdata('technology');
});
coding.addEventListener('click', () => {
    navdata('coding');
});
education.addEventListener('click', () => {
    navdata('education');
});
function seacrhresult(id){
    if(input.value==''){
        alert('search box is empty !');
        return false
    }
    shownews(id);
    ca.classList.remove('active');
}

search.addEventListener('click', () => {
    seacrhresult(input.value);
});

// Initial news fetch for 'India'
shownews('India');
