const typingText=document.querySelector('.typing-text');


function randomParagraph(){

    let randText=Math.floor(Math.random()*paragraphs.length)

    console.log(paragraphs[randText])
}

randomParagraph();