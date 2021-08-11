const io = require( "socket.io" )();
const socketapi = {
    io: io
};

let global_section_connections = {}
let section_connections = {}
let dict = {}

// Add your socket.io logic here!
io.on('connection', function( socket ) {
  // socket.emit('id', socket.id) // send each client their socket id

  socket.on('joined', function(data) {
    let username = data.username
    let classId = data.classId
    let sectionId = data.sectionId
    if (sectionId && sectionId.length > 0) { // use the section_connections and sectionId
      if (!(sectionId in section_connections)) {
        section_connections[sectionId] = []
      }
      section_connections[sectionId].push(username)
      io.emit('connections', {classId: classId, sectionId: sectionId, connections: section_connections[sectionId]})
    } else if (classId && classId.length >0) { // use the global_section_connections and classId
      if (!(classId in global_section_connections)) {
        global_section_connections[classId] = []
      }
      global_section_connections[classId].push(username)
      io.emit('connections', {classId: classId, sectionId: sectionId, connections: global_section_connections[classId]})
    }
  })

  socket.on('left', function(data) {
    let username = data.username
    let classId = data.classId
    let sectionId = data.sectionId
    if (sectionId && sectionId.length > 0) { // use the section_connections and sectionId
      if (sectionId in section_connections) {
        let idx = section_connections[sectionId].indexOf(username)
        if (idx >= 0) {
          section_connections[sectionId].splice(idx, 1)
          io.emit('connections', {classId: classId, sectionId: sectionId, connections: section_connections[sectionId]})
        }
      }
     
    } else if (classId && classId.length > 0){ // use the global_section_connections and classId
      if (classId in global_section_connections) {
        let idx = global_section_connections[classId].indexOf(username)
        if (idx >= 0) {
          global_section_connections[classId].splice(idx, 1)
          io.emit('connections', {classId: classId, sectionId: sectionId, connections: section_connections[classId]})
        }
      }
    }
  })

  socket.on('thread-typing', function(data) { 
    if (data.threadId in dict) {
      dict[data.threadId].add(data.username)
    } else {
      dict[data.threadId] = new Set([data.username])
    }
    io.emit('thread-typing', {usersTyping: [...dict[data.threadId]], threadId: data.threadId})
  })

  socket.on('thread-stop-typing', function(data) { 
    if (data.threadId in dict) {
      dict[data.threadId].delete(data.username)
      if (dict[data.threadId].size == 0) {
        io.emit('thread-typing', {usersTyping: [...dict[data.threadId]], threadId: data.threadId})
      }
    }
  })

});

module.exports = socketapi;