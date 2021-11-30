export function generateGameCode() {
  const nums = new Set()
  while (nums.size !== 6) {
    nums.add(Math.floor(Math.random() * 9) + 1)
  }

  return Array.from(nums).join('')
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function slugIt(str) {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  let from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  let to = 'aaaaeeeeiiiioooouuuunc------'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return str
}
