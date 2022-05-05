export default function(req, res, next) {
    console.log('Start from ', req.path)
    // do something
    next()
}