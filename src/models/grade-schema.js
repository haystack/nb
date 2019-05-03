// criteria types: "COMMENTS", "HASHTAGS", "WORDS", "CHARS", "CUSTOM"

class CustomCriterion {
  constructor(id, label) {
    this.id = id
    this.label = label
    this.filters = {
      HASHTAGS: 0,
      WORDS: 0,
      CHARS: 0
    }
  }
  // E.g. Only count COMMENTS with at least *20* WORDS and *2* HASHTAGS each.
  // => this.type = COMMENTS, this.filters = { WORDS: 20, HASHTAGS: 2 }

  getFilter(type) {
    if (this.filters.hasOwnProperty(type)) {
      return this.filters[type]
    }
    console.log(`Invalid filter type: ${type}`)
  }

  setFilter(value, type) {
    if (!this.filters.hasOwnProperty(type)) {
      console.log(`Invalid filter type: ${type}`)
      return
    }
    let filter = value ? value : 0 // defaults to 0
    if (typeof filter === "string") {
      filter = parseInt(filter)
    }
    filter = Math.max(Math.ceil(filter), 0) // must be positive int
    this.filters[type] = filter
  }
}

class Grade {
  constructor(id, label, points) {
    this.id = id
    this.setLabel(label)
    this.setPoints(points)

    this.totalComments = 0 // min *total* number of comments
    this.totalHashtags = 0 // min *total* number of hashtags
    this.totalWords = 0 // min *total* number of words
    this.totalChars = 0 // min *total* number of chars
    this.customCriteria = {} // { CustomCriterion.id : threshold value (int) }
  }

  setLabel(label) {
    // label: label set by user, e.g. “Very Good”, “Fair”. Defaults to ""
    this.label = label ? label : ""
  }

  setPoints(points) {
    // points: points given to students satisfying all criteria. Defaults to 0
    let value = points ? points : 0
    if (typeof value === "string") {
      value = parseFloat(value)
    }
    this.points = Math.max(value, 0)
  }

  setThreshold(value, type, id) { // id is only needed if type is "CUSTOM"
    let threshold = value ? value : 0 // defaults to 0
    if (typeof threshold === "string") {
      threshold= parseInt(threshold)
    }
    threshold = Math.max(Math.ceil(threshold), 0) // must be positive int
    switch (type) {
      case "COMMENTS":
        this.totalComments = threshold
        break
      case "HASHTAGS":
        this.totalHashtags = threshold
        break
      case "WORDS":
        this.totalWords = threshold
        break
      case "CHARS":
        this.totalChars = threshold
        break
      case "CUSTOM":
        this.customCriteria[id] = threshold
        break
      default:
        console.log(`Invalid threshold type: ${type}`)
    }
  }

  getThreshold(type, id) { // id is only needed if type is "CUSTOM"
    switch (type) {
      case "COMMENTS":
        return this.totalComments
      case "HASHTAGS":
        return this.totalHashtags
      case "WORDS":
        return this.totalWords
      case "CHARS":
        return this.totalChars
      case "CUSTOM":
        if (this.customCriteria.hasOwnProperty(id)) {
          return this.customCriteria[id]
        } else {
          return 0
        }
      default:
        console.log(`Invalid threshold type: ${type}`)
    }
  }
}

export {
  CustomCriterion,
  Grade
}
