import http from "http"
const server = http.createServer()

server.on("request", (req, res) => {
    let i = 0
    function write() {
        while (!res.writableEnded && i < 100000 && !res.writableNeedDrain) {
            res.write(`${i}\n`)
            i++
            if (i === 99999) {
                res.end()
            }
        }
    }
    write()

    res.on("drain", () => {
        console.log(i, "drained");
        console.log(res.writableNeedDrain);
        write()
    })
    res.on("finish", () => {
        console.log("finished");
    })
    res.on("close", () => {
        console.log("close")
    })
})

server.listen(3000, () => console.log("listening"))