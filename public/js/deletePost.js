function deletePost(id, authorID){
    axios.delete(`/api/posts/${id}`).then(data =>{
        if(data.status==200){
            location.replace(`/blog-log/${authorID}`)
        }else if(data.status == 404){
            location.replace(`/blog-log/:error=1`)
        }
    })
    console.log(id,authorID);
}



function openEdit(postId) {
    const editDelete = document.getElementById(`delete-edit-${postId}`);
    editDelete.classList.toggle('active');
}