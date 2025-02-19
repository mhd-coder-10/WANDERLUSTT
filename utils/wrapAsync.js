
// 1st method of define   simple function
// const wrapAsync = function (fn) {
//     return function (req, res, next) {
//         fn(req, res, next).catch((err=>{next(err)}));
//     }
// }
// module.exports = wrapAsync;


// 2nd method of define  aro functio
// module.exports = (fn)=>{
//     return (req, res, next)=> {
//         fn(req, res, next).catch(next)
//     }
// }


// 3rd method
function  wrapAsync (fn) {
    return function (req, res, next) {
        fn (req, res, next).catch((err)=>{next(err)});
    }
}
module.exports = wrapAsync;
