offsetX = -160;
offsetY = 5;
tooltip = document.getElementById("tooltip");
document.addEventListener("click", (mouseEvent) =>{
    console.log(mouseEvent.relatedTarget);
    let x = mouseEvent.clientX + offsetX;
    let y = mouseEvent.clientY + offsetY;
    console.log(`left:${x} top:${y}`);
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
})