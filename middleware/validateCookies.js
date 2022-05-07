export default function(req, res, next) {
    console.log('---------------------')
    console.log('Start with: ', req.originalUrl)
    // do something
    next()
}