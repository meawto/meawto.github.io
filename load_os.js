var elemDatetime = document.getElementById('os-datetime')
function InitialFunctions() {    

    this.osDateNow = function() {
        let date = new Date()
        let day = date.toLocaleString('default', { weekday: "short" }).slice(0, -1)
        let month = date.toLocaleString('default', { month: 'short' }).slice(0, -1)
        let dayNum = date.getDate()
        let mins = date.toLocaleString('default', { minute: '2-digit' })
        if (mins.length < 2) { mins = 0 + mins }
        let hours = date.toLocaleString('default', { hour: '2-digit' })
        let finalstr = `${day}, ${month} ${dayNum}⠀⠀${hours}:${mins}`
        if ((finalstr != elemDatetime.innerHTML)) {
            elemDatetime.innerHTML = finalstr
        }
    }   
}

let NOTOol = new InitialFunctions()
setInterval(NOTOol.osDateNow, 1000)

$(window).load(function() {
    $("#on-load").css("opacity", "0")
    $(".os-grid").css("animation", "gridOnLoad 2s forwards")
    setTimeout(() => {$("#on-load").css("display", "none")}, 1500)
})