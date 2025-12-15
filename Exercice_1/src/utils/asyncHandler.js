exports.asyncHandler = (f) => {
    return(
        function (...args) {
            return new Promise ((resolve, reject)=>{
                try{
                    const result = f(...args)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            })
        }
    )

}