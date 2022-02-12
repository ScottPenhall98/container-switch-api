import * as child from 'child_process';

const status = async () => {
    return new Promise((resolve, reject) => {
        child.exec(`docker inspect ${process.env.CONTAINER_NAME} | grep State -A 12`, (err, stdout, stderr) => {
            if (err) {
                resolve(JSON.parse(`{"Successful": false, "Error": "${err}"}`));
                return
            }
            let data = stdout.split(',')
            data.pop()
            resolve(JSON.parse(`{"Successful": true, ${data.join(',')}}`))
        })
    })
}

const checkStatus = async (req, res, next) => {
    await status().then(message => {
        res.status(200).json({
            message: message
        })
    });

}

const startContainer = async (req, res, next) => {
    await status().then( async status => {
        if (status.Successful) {
            if (!status.State.Running) {
                let message = await new Promise((resolve, reject) => {
                    child.exec(`docker start ${process.env.CONTAINER_NAME}`, (err, stdout, stderr) => {
                        if (err) {
                            resolve(err)
                        }
                        resolve('Container started')
                    })
                })

                return res.status(200).json({
                    message: message
                })
            }
            return res.status(204).json({
                message: 'Container is already running'
            })
        }
        return res.status(204).json({
            message: 'Cannot retrieve container status'
        })
    })
}


const stopContainer = async (req, res, next) => {
    await status().then( async status => {
        if (status.Successful) {
            if (status.State.Running) {
                let message = await new Promise((resolve, reject) => {
                    child.exec(`docker stop ${process.env.CONTAINER_NAME}`, (err, stdout, stderr) => {
                        if (err) {
                            resolve(err)
                        }
                        resolve('Container stopped')
                    })
                })

                return res.status(200).json({
                    message: message
                })
            }
            return res.status(204).json({
                message: 'Container has already stopped'
            })
        }
        return res.status(204).json({
            message: 'Cannot retrieve container status'
        })
    })
}

export default {
    checkStatus,
    startContainer,
    stopContainer
};