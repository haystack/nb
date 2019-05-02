function isNumberKey(event, allowDecimal) {
  let keyCode = event.which ? event.which : event.keyCode
  if (keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
    if (allowDecimal && keyCode === 46) { return true }
    event.preventDefault()
  }
  return true
}

export {
  isNumberKey
}
