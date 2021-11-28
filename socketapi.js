const io = require("socket.io")();
const crypto = require('crypto');

const socketapi = {
    io: io
};

let dict = {}

// Add your socket.io logic here!
io.on('connection', function (socket) {

    socket.on("disconnect", (d) => {
        console.log('disconnect');

        if (socket.sectionRoomId) {
            io.to(socket.sectionRoomId).emit('connections', { online: (io.sockets.adapter.rooms.get(socket.sectionRoomId)?.size || 0) + (io.sockets.adapter.rooms.get(socket.globalRoomId)?.size || 0) })
        }

        const classAllRooms = Array.from(io.sockets.adapter.rooms.keys()).filter(c => c.startsWith(socket.globalRoomId))
        io.to(socket.globalRoomId).emit('connections', { online: classAllRooms.reduce((acc, curr) => acc + io.sockets.adapter.rooms.get(curr).size, 0) })
    });

    socket.on("left", (data) => {
        console.log('left');
        console.log(data);
        const urlHash = crypto.createHash('md5').update(data.sourceURL).digest('hex');
        const globalRoomId = `${urlHash}:${data.classId}`
        const classSectionRooms = Array.from(io.sockets.adapter.rooms.keys()).filter(c => c.startsWith(`${globalRoomId}:`))

        if (data.sectionId && data.sectionId.length > 0) {
            const sectionRoomId = `${urlHash}:${data.classId}:${data.sectionId}`
            socket.sectionRoomId = null
            socket.leave(sectionRoomId)
            io.to(sectionRoomId).emit('connections', { online: (io.sockets.adapter.rooms.get(sectionRoomId)?.size || 0) + (io.sockets.adapter.rooms.get(globalRoomId)?.size || 0) })
        } else {
            socket.leave(globalRoomId)
            classSectionRooms.forEach(sectionRoomId => io.to(sectionRoomId).emit('connections', { online: (io.sockets.adapter.rooms.get(sectionRoomId)?.size || 0) + (io.sockets.adapter.rooms.get(globalRoomId)?.size || 0) }))
        }

        socket.globalRoomId = null
        const classAllRooms = Array.from(io.sockets.adapter.rooms.keys()).filter(c => c.startsWith(globalRoomId))
        io.to(globalRoomId).emit('connections', { online: classAllRooms.reduce((acc, curr) => acc + (io.sockets.adapter.rooms.get(curr)?.size || 0), 0) })

    });

    socket.on('joined', function (data) {
        console.log("\n******** SOCKETIO JOINED *********");
        console.log(data);
        const urlHash = crypto.createHash('md5').update(data.sourceURL).digest('hex');
        const globalRoomId = `${urlHash}:${data.classId}`
        const classSectionRooms = Array.from(io.sockets.adapter.rooms.keys()).filter(c => c.startsWith(`${globalRoomId}:`))

        if (data.sectionId && data.sectionId.length > 0) {
            const sectionRoomId = `${urlHash}:${data.classId}:${data.sectionId}`
            socket.sectionRoomId = sectionRoomId
            socket.join(sectionRoomId)
            io.to(sectionRoomId).emit('connections', { online: (io.sockets.adapter.rooms.get(sectionRoomId)?.size || 0) + (io.sockets.adapter.rooms.get(globalRoomId)?.size || 0) })
        } else {
            socket.join(globalRoomId)
            classSectionRooms.forEach(sectionRoomId => io.to(sectionRoomId).emit('connections', { online: (io.sockets.adapter.rooms.get(sectionRoomId)?.size || 0) + (io.sockets.adapter.rooms.get(globalRoomId)?.size || 0) }))
        }

        socket.globalRoomId = globalRoomId
        const classAllRooms = Array.from(io.sockets.adapter.rooms.keys()).filter(c => c.startsWith(globalRoomId))
        io.to(globalRoomId).emit('connections', { online: classAllRooms.reduce((acc, curr) => acc + (io.sockets.adapter.rooms.get(curr)?.size || 0), 0) })
    })

    socket.on('thread-typing', function (data) {
        if (data.threadId in dict) {
            dict[data.threadId].add(data.username)
        } else {
            dict[data.threadId] = new Set([data.username])
        }
        io.emit('thread-typing', { usersTyping: [...dict[data.threadId]], threadId: data.threadId })
    })

    socket.on('thread-stop-typing', function (data) {
        if (data.threadId in dict) {
            dict[data.threadId].delete(data.username)
            if (dict[data.threadId].size == 0) {
                io.emit('thread-typing', { usersTyping: [...dict[data.threadId]], threadId: data.threadId })
            }
        }
    })

});

module.exports = socketapi;