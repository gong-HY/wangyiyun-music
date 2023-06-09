const numFormat = num => {
  if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿'
  if (num >= 10000) return (num / 10000).toFixed(0) + '万'
  return num
}

export { numFormat }
