// get elements
const post_form = document.getElementById('post-add-form');
const msg = document.querySelector('.msg');
const all_posts = document.querySelector('.all-posts');


// get all posts
const getAllPosts = () => {
    let posts = readLsData('fb_post');
    let list = '';
    if(!posts){
        all_posts.innerHTML = `<h4 class="text-center">No Posts found</h4>`;
        return false
    }

    posts.reverse().map( (data, index) => {
        list += `
        <div class="post-timeline-area my-4">
                       <div class="card shadow">
                            <div class="card-body">
                                <div class="user-auth">
                                    <div class="user-info">
                                        <img src="${data.aPhoto}" alt="">
                                        <div class="details">
                                            <span>${data.aName}</span>
                                            <span>2 h. <i class="fas fa-earth-asia"></i></span>
                                        </div>
                                    </div>
                                    <div class="user-menu">
                                        <div class="user-btn">
                                            <div class="dropdown">
                                                <a class="dropdown-toggle" data-bs-toggle="dropdown"
                                                     href="#"><i class="fa-solid fa-ellipsis"></i></a>
                                                <ul class="dropdown-menu">
                                                  <li><a class="dropdown-item edit-post" href="#" post_id="${data.id}">Edit</a></li>
                                                  <li><a class="dropdown-item delet-post" href="#" post_id="${data.id}">Delete</a></li>
                                                </ul>
                                              </div>                
                                        </div>
                                        <div class="user-btn">
                                            <i class="fa-solid fa-x"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="user-content-area">
                                    <p>${data.pContent}</p>
                                    
                                    ${data.pPhoto ? '<img src="'+ data.pPhoto +'" alt="">': ''}
                                </div>
                            </div>
                        </div>
                    </div>
        `;
    })

    all_posts.innerHTML = list;
}

getAllPosts();

// post form submit 
post_form.onsubmit = (e) => {
    e.preventDefault()

    // get form data
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    const {aName, aPhoto, pContent, pPhoto} = data;

    // create a remdom id
    const randID = Math.floor(Math.random() * 100000 ) +'_'+ Date.now();

    // Validation
    if(!aName || !aPhoto || !pContent){
        msg.innerHTML = setAlert('All fields are required')
    }else{
        createLsData('fb_post', {...data, id : randID });
        e.target.reset();
        getAllPosts();
    }
};

all_posts.onclick = (e) => {
    e.preventDefault();

    // post delet
    if(e.target.classList.contains('delet-post')){

        // get post ID
        const postID = e.target.getAttribute('post_id');

        // get all posts
        const posts = readLsData('fb_post')

        // delet data array
        const deleted_data = posts.filter(all_post => all_post .id !== postID)
        
        // now update new data
        updateLsData('fb_post', deleted_data);

        getAllPosts()
    }
}