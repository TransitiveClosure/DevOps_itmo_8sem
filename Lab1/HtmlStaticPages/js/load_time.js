(function () {
    window.addEventListener("load", function(){
        const pageEnd = performance.mark('pageEnd')
        const loadTime = pageEnd.startTime / 1000
        const number = document.getElementById("load_time__number")
        number.textContent = Number(loadTime).toFixed(4)   
        number.style.color = "red"
    })
  })();    