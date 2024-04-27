const about= document.getElementById('about');
const about_section= document.querySelector('.about_section_details');

about.addEventListener('mouseover', ()=>{
    about_section.style.display = 'block'
    console.log(about_section)
})

about.addEventListener('mouseout', ()=>{
    about_section.style.display = 'none'
    console.log(about_section)
})


const contact= document.getElementById('contact');
const contact_section= document.querySelector('.contact_section_details');

contact.addEventListener('mouseover', ()=>{
    contact_section.style.display = 'block'

})

contact.addEventListener('mouseout', ()=>{
    contact_section.style.display = 'none'

})