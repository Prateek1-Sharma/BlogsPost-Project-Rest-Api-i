let blogCount=0;
const counter=document.querySelector("#counter");
function postBlog(event){
event.preventDefault();




//catching input elements
const imageUrl=document.querySelector("#image-url");
const imageTitle=document.querySelector("#image-title");
const imageDescription=document.querySelector("#image-description");

//creating a obj to store the details of input fields
let blogs = {
    
    url:imageUrl.value,
    title:imageTitle.value,
    description:imageDescription.value

}

axios.post("https://crudcrud.com/api/314ae8a5c24a4edea51427ba4948c311/blog",blogs)
.then(response => {
    console.log("blog data created:", response.data);
    getBlogs();
    blogCount++;
    counter.innerHTML=blogCount;
  })
.catch(error => {
    console.error("Error creating blog data:", error);

  });

//  showBlog(blogs)


}
window.addEventListener("DOMContentLoaded",()=>{

  getBlogs()
})
function getBlogs(){
  axios.get("https://crudcrud.com/api/314ae8a5c24a4edea51427ba4948c311/blog")
  .then(response => {
    const ul=document.querySelector("ul");
    ul.innerHTML="";
      console.log("blog data created:", response.data);
      for(let i=0;i<response.data.length;i++){
      showBlog(response.data[i])
  }
    
    })
  .catch(error => {
      console.error("Error creating blog data:", error);
    
    });
  }
function showBlog(blogs)
{
    const li=`<li><img src="${blogs.url}">-${blogs.title}-${blogs.description}
    <button type='button' class='del-btn' onclick="delBlog('${blogs._id}')">Delete</button>
    <button type='button'class='edit-btn' onclick="editBlog('${blogs._id}')">Edit</button></li>`;
    const ul=document.querySelector("ul");
    ul.innerHTML+=li;
}


function delBlog(deleteId){
    const ul=document.querySelector("ul");
    console.log("dele",deleteId);
    const li_to_del=event.target.parentElement;
    ul.removeChild(li_to_del); 
    axios.delete(`https://crudcrud.com/api/314ae8a5c24a4edea51427ba4948c311/blog/${deleteId}`)
    .then((response) => {
        console.log("Deleted data :", response.data);
        blogCount--;
        counter.innerHTML=blogCount;
      })
    .catch((error) => {
        console.error("Error creating blog data:", error);
      
      });
    }

function editBlog(deleteId){
  axios.get(`https://crudcrud.com/api/314ae8a5c24a4edea51427ba4948c311/blog/${deleteId}`)
    .then(response => {
        const blogData = response.data;
        // Populate input fields with existing blog data
        const imageUrl = document.querySelector("#image-url");
        const imageTitle = document.querySelector("#image-title");
        const imageDescription = document.querySelector("#image-description");
        
        imageUrl.value = blogData.url;
        imageTitle.value = blogData.title;
        imageDescription.value = blogData.description;

        // Now you can edit the data and submit the changes
        // (You need to implement the editing functionality separately)
    })
    .catch(error => {
        console.error("Error fetching blog data for editing:", error);
    });
    const ul=document.querySelector("ul");
    const li_to_del=event.target.parentElement;
    ul.removeChild(li_to_del); 
    axios.delete(`https://crudcrud.com/api/314ae8a5c24a4edea51427ba4948c311/blog/${deleteId}`)
    .then((response) => {
      console.log("blog data created:", response.data);
    
    })
  .catch((error) => {
      console.error("Error creating blog data:", error);
    
    });
      }