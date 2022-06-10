const submitBtn = document.querySelector('.submit')
submitBtn.addEventListener('click', () => {
    fetch('upload')
    .then(res => {if (res.ok){return res.json()}})
    .then(window.location.reload())
})

const thumbUp = document.getElementsByClassName("fa-thumbs-up");
const thumbDown = document.getElementsByClassName("fa-thumbs-down");
const trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
  console.log('top')
      element.addEventListener('click', function(){
        console.log('event')
        const img = this.parentNode.parentNode.childNodes[1].src
        const name = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'img': img,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const img = this.parentNode.parentNode.childNodes[1].src
        const name = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages/down', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'img': img,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
          console.log(thumbUp)
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
      const name = this.parentNode.parentNode.childNodes[3].innerText
      const img = this.parentNode.parentNode.childNodes[1].getAttribute('src')
      fetch('messages', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'img':img,
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});