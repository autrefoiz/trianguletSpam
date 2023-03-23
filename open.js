async function openCapsule(capsule) {
  const res = await fetch("https://triangulet.org/api/open", {
    method: "POST",
    credentials: "include",
    headers: {
      authorization: triangulet.tokenraw,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      capsule: capsule
    })
  })
  
  return await res.json()
  
}

const delay = parseInt(prompt("Delay (in ms). 1000 is strongly recommended, or you may get errors."))

const amount = parseInt(prompt(`Amount of packs to open - you can open up to ${triangulet.userdata.tokens / 20} color capsules.`))

let i = 0;
function main() {
  setTimeout(async () => {
    i++
    const res = await openCapsule("Color")
    if (res.rarity && res.trian) {
      triangulet.userdata.tokens -= 20
      console.log(`[${res.rarity.toUpperCase()}] ${res.trian} tok=${triangulet.userdata.tokens}`)
    }
    
    if (i < amount) {
      main()
    }
  }, delay)
}
  

main()
  
