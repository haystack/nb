const io = require("socket.io")()
const crypto = require('crypto')

const socketapi = { io: io }

let dict = {}
let socketUserMapping = {}

io.on('connection', function (socket) {
    socket.on('joined', data => handleOnJoin(socket, data))
    socket.on("disconnect", data => handleOnDisconnect(socket, data))
    socket.on("left", data => handleOnLeft(socket, data))
    socket.on('thread-typing', data => handleOnThreadTyping(socket, data))
    socket.on('thread-stop-typing', data => handleOnThreadStopTyping(socket, data))
})

function handleOnJoin(socket, data) {
    console.log("\n******** SOCKETIO JOINED *********")
    console.log(data)

    socketUserMapping[socket.id] = data

    const urlHash = crypto.createHash('md5').update(data.sourceURL).digest('hex')
    const globalRoomId = `${urlHash}:${data.classId}`
    const classSectionRooms = Array.from(io.sockets.adapter.rooms.keys()).filter(c => c.startsWith(`${globalRoomId}:`))

    console.log(io.sockets.adapter.rooms.get(globalRoomId));
    if (data.sectionId && data.sectionId.length > 0) {
        const sectionRoomId = `${urlHash}:${data.classId}:${data.sectionId}`
        socket.sectionRoomId = sectionRoomId
        socket.join(sectionRoomId)
        io.to(sectionRoomId).emit('connections', { online: (io.sockets.adapter.rooms.get(sectionRoomId)?.size || 0) + (io.sockets.adapter.rooms.get(globalRoomId)?.size || 0), users: fetchOnlineUsers([globalRoomId, sectionRoomId]) })
    } else {
        socket.join(globalRoomId)
        classSectionRooms.forEach(sectionRoomId => io.to(sectionRoomId).emit('connections', { online: (io.sockets.adapter.rooms.get(sectionRoomId)?.size || 0) + (io.sockets.adapter.rooms.get(globalRoomId)?.size || 0), users: fetchOnlineUsers([globalRoomId, sectionRoomId]) }))
    }

    socket.globalRoomId = globalRoomId
    const classAllRooms = Array.from(io.sockets.adapter.rooms.keys()).filter(c => c.startsWith(globalRoomId))
    io.to(globalRoomId).emit('connections', { online: classAllRooms.reduce((acc, curr) => acc + (io.sockets.adapter.rooms.get(curr)?.size || 0), 0), users: fetchOnlineUsers(classAllRooms) })
}

function handleOnDisconnect(socket, data) {
    console.log('disconnect')
    delete socketUserMapping[socket.id]

    if (socket.sectionRoomId) {
        io.to(socket.sectionRoomId).emit('connections', { online: (io.sockets.adapter.rooms.get(socket.sectionRoomId)?.size || 0) + (io.sockets.adapter.rooms.get(socket.globalRoomId)?.size || 0), users: fetchOnlineUsers([globalRoomId, sectionRoomId]) })
    }

    const classAllRooms = Array.from(io.sockets.adapter.rooms.keys()).filter(c => c.startsWith(socket.globalRoomId))
    io.to(socket.globalRoomId).emit('connections', { online: classAllRooms.reduce((acc, curr) => acc + io.sockets.adapter.rooms.get(curr).size, 0), users: fetchOnlineUsers(classAllRooms) })
}

function handleOnLeft(socket, data) {
    console.log('left')
    console.log(data)
    delete socketUserMapping[socket.id]
    const urlHash = crypto.createHash('md5').update(data.sourceURL).digest('hex')
    const globalRoomId = `${urlHash}:${data.classId}`
    const classSectionRooms = Array.from(io.sockets.adapter.rooms.keys()).filter(c => c.startsWith(`${globalRoomId}:`))

    if (data.sectionId && data.sectionId.length > 0) {
        const sectionRoomId = `${urlHash}:${data.classId}:${data.sectionId}`
        socket.sectionRoomId = null
        socket.leave(sectionRoomId)
        io.to(sectionRoomId).emit('connections', { online: (io.sockets.adapter.rooms.get(sectionRoomId)?.size || 0) + (io.sockets.adapter.rooms.get(globalRoomId)?.size || 0), users: fetchOnlineUsers([globalRoomId, sectionRoomId]) })
    } else {
        socket.leave(globalRoomId)
        classSectionRooms.forEach(sectionRoomId => io.to(sectionRoomId).emit('connections', { online: (io.sockets.adapter.rooms.get(sectionRoomId)?.size || 0) + (io.sockets.adapter.rooms.get(globalRoomId)?.size || 0), users: fetchOnlineUsers([globalRoomId, sectionRoomId]) }))
    }

    socket.globalRoomId = null
    const classAllRooms = Array.from(io.sockets.adapter.rooms.keys()).filter(c => c.startsWith(globalRoomId))
    io.to(globalRoomId).emit('connections', { online: classAllRooms.reduce((acc, curr) => acc + (io.sockets.adapter.rooms.get(curr)?.size || 0), 0), users: fetchOnlineUsers(classAllRooms) })
}

function handleOnThreadTyping(socket, data) {
    if (data.threadId in dict) {
        dict[data.threadId].add(data.username)
    } else {
        dict[data.threadId] = new Set([data.username])
    }
    io.emit('thread-typing', { usersTyping: [...dict[data.threadId]], threadId: data.threadId })
}

function handleOnThreadStopTyping(socket, data) {
    if (data.threadId in dict) {
        dict[data.threadId].delete(data.username)
        if (dict[data.threadId].size == 0) {
            io.emit('thread-typing', { usersTyping: [...dict[data.threadId]], threadId: data.threadId })
        }
    }
}

function fetchOnlineUsers(socketIds) {
    let users = {}
    users.students = []
    users.instructors = []
    users.ids = []

    socketIds.forEach(socketId => {
        Array.from(io.sockets.adapter.rooms.get(socketId)).forEach(connection => {
            if (!users.ids.includes(socketUserMapping[connection].id)) {
                users.ids.push(socketUserMapping[connection].id)
                if (socketUserMapping[connection].role.toLowerCase() === 'instructor') {
                    users.instructors.push(socketUserMapping[connection])
                } else {
                    users.students.push(socketUserMapping[connection])
                }
            }
        })
    })

    return users
}

module.exports = socketapi