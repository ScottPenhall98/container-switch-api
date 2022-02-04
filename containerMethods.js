import * as child from 'child_process';

const getData = async (req, res, next) => {
    let error = false;
    let message = await new Promise((resolve, reject) => {
        child.exec('ls -l aaa', (err, stdout, stderr) => {
            if (err) {
                error = true;
                resolve(err)
            }
            resolve(stdout)
        })
    })
    return res.status(error ? 404: 200).json({
        message : message
    })
}

export default {
    getData
};