function sendComment(e) {
    e.preventDefault();
    const commentText = document.querySelector('#comment_text').value;
    const authorId = document.querySelector('#comment_author').value;
    const postId = document.querySelector('#comment_post').value;
    if (commentText.length >= 0) {
        axios.post('/api/comment', { text: commentText, authorId, postId }).then(data=>{
            if(data.data){
                location.reload()
            }
        })

    }
}   
