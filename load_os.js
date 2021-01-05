
elemDatetime = document.getElementById('os-datetime')
function osDateNow() {
    let date = new Date()
    let day = date.toLocaleString('default', { weekday: "short" }).slice(0, -1)
    let month = date.toLocaleString('default', { month: 'short' }).slice(0, -1)
    let dayNum = date.getDate()
    let mins = date.toLocaleString('default', { minute: '2-digit' })
    let hours = date.toLocaleString('default', { hour: '2-digit' })
    let finalstr = `${day}, ${month} ${dayNum} - ${hours}:${mins}`
    elemDatetime.innerHTML = finalstr
    setTimeout(() => {osDateNow()}, 1000)
}
osDateNow()